import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import {
  signSessionToken,
  recordAdminAuditLog,
  generateTwoFactorAuth,
} from '@/lib/auth';
import { checkRateLimit, RATE_LIMIT_PRESETS } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide email and password' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = (forwardedFor || '127.0.0.1').split(',')[0].trim();

    // Brute-force rate limiting: Max 5 attempts per 15 mins
    const rateCheck = checkRateLimit(clientIp, 'ADMIN_LOGIN', RATE_LIMIT_PRESETS.ADMIN_LOGIN);
    if (!rateCheck.allowed) {
      await recordAdminAuditLog({
        adminId: 'UNKNOWN',
        adminEmail: cleanEmail,
        action: 'ADMIN_LOGIN_RATE_LIMITED',
        resource: 'AUTH',
        metadata: `Exceeded max 5 login attempts. Locked for ${rateCheck.resetInSeconds}s`,
        clientIp,
      });

      return NextResponse.json(
        {
          success: false,
          message: `Too many login attempts. For security, please wait ${rateCheck.resetInSeconds} seconds before trying again.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateCheck.resetInSeconds),
          },
        }
      );
    }

    let user: any = null;

    try {
      user = await db.adminUser.findUnique({
        where: { email: cleanEmail },
      });
    } catch (err) {
      // Local dev fallback if DB container is not running
      const devAdminEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@example.com').toLowerCase();
      const devAdminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'ChangeMeInProduction#2026!';

      if (cleanEmail === devAdminEmail && password === devAdminPassword) {
        user = {
          id: 'dev-admin-id',
          email: devAdminEmail,
          name: 'Authorized Compliance & Operations Lead',
          role: 'ADMIN',
          twoFactorEnabled: false,
          twoFactorSecret: null,
          isActive: true,
        };
      }
    }

    if (!user) {
      await recordAdminAuditLog({
        adminId: 'UNKNOWN',
        adminEmail: cleanEmail,
        action: 'LOGIN_FAILED_UNKNOWN_USER',
        resource: 'AUTH',
        clientIp,
      });
      return NextResponse.json(
        { success: false, message: 'Invalid administrative credentials' },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, message: 'Administrative account is disabled' },
        { status: 403 }
      );
    }

    // Verify password if user has passwordHash
    if (user.passwordHash) {
      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) {
        await recordAdminAuditLog({
          adminId: user.id,
          adminEmail: user.email,
          action: 'LOGIN_FAILED_PASSWORD_MISMATCH',
          resource: 'AUTH',
          clientIp,
        });
        return NextResponse.json(
          { success: false, message: 'Invalid administrative credentials' },
          { status: 401 }
        );
      }
    }

    // Check 2FA Status
    if (user.twoFactorEnabled && user.twoFactorSecret) {
      // 2FA is active: Create short-lived temp token for 2FA challenge (5 mins)
      const tempToken = signSessionToken(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        },
        300
      );

      return NextResponse.json({
        success: true,
        requires2fa: true,
        tempToken,
        email: user.email,
        message: 'Password verified. Please enter the 6-digit TOTP code from your Authenticator app.',
      });
    } else {
      // First-time 2FA Setup Flow: Generate QR code on the fly
      const { secret, qrCodeDataUrl } = await generateTwoFactorAuth(user.email);

      const tempToken = signSessionToken(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        },
        600
      );

      return NextResponse.json({
        success: true,
        requires2faSetup: true,
        tempToken,
        email: user.email,
        secret,
        qrCode: qrCodeDataUrl,
        message:
          'Mandatory 2FA Setup: Scan this QR code with Google Authenticator or 1Password to activate 2FA.',
      });
    }
  } catch (error) {
    console.error('[ADMIN_LOGIN_ERROR]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}

