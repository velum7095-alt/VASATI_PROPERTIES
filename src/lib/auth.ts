import crypto from 'node:crypto';
import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import { db } from './db';
import { hashIp } from './crypto';
import { NextRequest } from 'next/server';

export interface AdminSession {
  id: string;
  email: string;
  role: string;
  name: string;
  iat: number;
  exp: number;
}

export const ADMIN_COOKIE_NAME = 'admin_session';

function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || 'dpdp_bangalore_admin_session_secret_change_in_prod';
}

/**
 * Sign session data into a secure HMAC-SHA256 token
 */
export function signSessionToken(payload: Omit<AdminSession, 'iat' | 'exp'>, maxAgeSeconds = 28800): string {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + maxAgeSeconds; // 8 hours default
  const session: AdminSession = { ...payload, iat, exp };
  const json = JSON.stringify(session);
  const b64 = Buffer.from(json).toString('base64url');
  const hmac = crypto
    .createHmac('sha256', getSessionSecret())
    .update(b64)
    .digest('base64url');
  return `${b64}.${hmac}`;
}

/**
 * Verify and parse HMAC-SHA256 session token
 */
export function verifySessionToken(token: string): AdminSession | null {
  if (!token || !token.includes('.')) return null;
  const [b64, signature] = token.split('.');
  const expectedHmac = crypto
    .createHmac('sha256', getSessionSecret())
    .update(b64)
    .digest('base64url');

  // Constant-time comparison — prevents timing attacks on the HMAC signature
  const sigBuf = Buffer.from(signature, 'base64url');
  const expectedBuf = Buffer.from(expectedHmac, 'base64url');
  const signatureValid =
    sigBuf.length === expectedBuf.length &&
    crypto.timingSafeEqual(sigBuf, expectedBuf);

  if (!signatureValid) {
    return null; // Tampered token
  }

  try {
    const raw = Buffer.from(b64, 'base64url').toString('utf8');
    const session = JSON.parse(raw) as AdminSession;
    const now = Math.floor(Date.now() / 1000);
    if (session.exp < now) {
      return null; // Expired
    }
    return session;
  } catch {
    return null;
  }
}

/**
 * Extract verified admin session from incoming NextRequest cookies
 */
export function getAdminSessionFromRequest(request: NextRequest): AdminSession | null {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME);
  if (!cookie?.value) return null;
  return verifySessionToken(cookie.value);
}

/**
 * Immutable Audit Logger for Admin Actions (DPDP Act 2023 & IT Act 2000)
 * Records who accessed what, resource ID, action, and salted IP hash.
 */
export async function recordAdminAuditLog({
  adminId,
  adminEmail,
  action,
  resource,
  resourceId,
  metadata,
  clientIp,
}: {
  adminId: string;
  adminEmail: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: string;
  clientIp?: string;
}) {
  const ipHash = hashIp(clientIp || '127.0.0.1');
  try {
    await db.adminAuditLog.create({
      data: {
        adminId,
        adminEmail,
        action,
        resource,
        resourceId: resourceId || null,
        metadata: metadata || null,
        ipHash,
      },
    });
  } catch (err) {
    console.warn('[AUDIT_LOG_FALLBACK] Database unavailable for audit logging:', (err as Error).message);
  }
}

/**
 * Generate 2FA TOTP Secret and QR Code for Authenticator App
 */
export async function generateTwoFactorAuth(email: string) {
  const secret = authenticator.generateSecret(); // Base32 secret
  const appName = 'Bangalore RERA Portal';
  const otpauthUrl = authenticator.keyuri(email, appName, secret);
  const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl);
  return { secret, qrCodeDataUrl, otpauthUrl };
}

/**
 * Verify 6-digit TOTP token against Base32 secret
 */
export function verifyTwoFactorToken(token: string, secret: string): boolean {
  if (!token || !secret) return false;
  return authenticator.check(token.trim(), secret.trim());
}

