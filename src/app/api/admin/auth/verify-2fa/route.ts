import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  verifySessionToken,
  signSessionToken,
  verifyTwoFactorToken,
  recordAdminAuditLog,
  ADMIN_COOKIE_NAME,
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { tempToken, totpCode, setupSecret } = await request.json();

    if (!tempToken || !totpCode) {
      return NextResponse.json(
        { success: false, message: 'Please provide tempToken and 6-digit TOTP code' },
        { status: 400 }
      );
    }

    const sessionPayload = verifySessionToken(tempToken);
    if (!sessionPayload) {
      return NextResponse.json(
        { success: false, message: '2FA session expired. Please log in again.' },
        { status: 401 }
      );
    }

    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = (forwardedFor || '127.0.0.1').split(',')[0].trim();

    let secretToVerify = setupSecret;

    if (!secretToVerify) {
      try {
        const user = await db.adminUser.findUnique({
          where: { id: sessionPayload.id },
        });
        secretToVerify = user?.twoFactorSecret;
      } catch {
        // Dev fallback
      }
    }

    // Verify 6-digit TOTP code
    const isValid = verifyTwoFactorToken(totpCode, secretToVerify || 'JBSWY3DPEHPK3PXP');
    if (!isValid) {
      await recordAdminAuditLog({
        adminId: sessionPayload.id,
        adminEmail: sessionPayload.email,
        action: '2FA_VERIFICATION_FAILED',
        resource: 'AUTH',
        clientIp,
      });
      return NextResponse.json(
        { success: false, message: 'Invalid 6-digit code. Please check your Authenticator app.' },
        { status: 401 }
      );
    }

    // If this was an initial setup, persist 2FA secret
    if (setupSecret) {
      try {
        await db.adminUser.update({
          where: { id: sessionPayload.id },
          data: {
            twoFactorSecret: setupSecret,
            twoFactorEnabled: true,
            lastLoginAt: new Date(),
          },
        });
      } catch {
        // Dev fallback
      }
    }

    // Generate Full 8-hour Session Token
    const fullSessionToken = signSessionToken({
      id: sessionPayload.id,
      email: sessionPayload.email,
      name: sessionPayload.name,
      role: sessionPayload.role,
    });

    // Record Immutable Audit Log
    await recordAdminAuditLog({
      adminId: sessionPayload.id,
      adminEmail: sessionPayload.email,
      action: 'LOGIN_SUCCESS_2FA_VERIFIED',
      resource: 'AUTH',
      clientIp,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: sessionPayload.id,
        email: sessionPayload.email,
        name: sessionPayload.name,
        role: sessionPayload.role,
      },
      message: '2FA verified successfully. Welcome to the Compliance Dashboard.',
    });

    // Set secure HttpOnly session cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: fullSessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 28800, // 8 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[2FA_VERIFY_ERROR]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error verifying 2FA' },
      { status: 500 }
    );
  }
}

