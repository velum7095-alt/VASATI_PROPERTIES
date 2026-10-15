import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Verify the admin session cookie signature using Web Crypto API (Edge-compatible).
 * Mirrors the HMAC-SHA256 scheme in src/lib/auth.ts but uses SubtleCrypto
 * instead of node:crypto, which is unavailable in the Next.js Edge Runtime.
 */
async function isValidAdminSession(token: string): Promise<boolean> {
  if (!token || !token.includes('.')) return false;

  const dotIdx = token.lastIndexOf('.');
  const b64 = token.slice(0, dotIdx);
  const signature = token.slice(dotIdx + 1);

  // 1. Decode and check expiry first (cheap — no crypto needed)
  try {
    const raw = atob(b64.replace(/-/g, '+').replace(/_/g, '/'));
    const session = JSON.parse(raw) as { exp?: number };
    const now = Math.floor(Date.now() / 1000);
    if (!session.exp || session.exp < now) return false;
  } catch {
    return false;
  }

  // 2. HMAC-SHA256 signature verification (constant-time via SubtleCrypto)
  try {
    const secret = process.env.ADMIN_SESSION_SECRET ?? 'dpdp_bangalore_admin_session_secret_change_in_prod';
    const encoder = new TextEncoder();

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    );

    // Decode base64url signature to bytes
    const sigBytes = Uint8Array.from(
      atob(signature.replace(/-/g, '+').replace(/_/g, '/')),
      (c) => c.charCodeAt(0),
    );

    // crypto.subtle.verify is constant-time — no timing attack surface
    return await crypto.subtle.verify('HMAC', cryptoKey, sigBytes, encoder.encode(b64));
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('admin_session')?.value;

  // 1. Admin Authentication Route Guard
  // Protect /admin routes (except /admin/login) and /api/admin/* (except auth endpoints)
  const isAdminPage = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');
  const isAdminApi =
    pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth');

  if (isAdminPage || isAdminApi) {
    // Verify the full HMAC signature — not just cookie presence
    const valid = sessionCookie ? await isValidAdminSession(sessionCookie) : false;

    if (!valid) {
      if (isAdminPage) {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
  }

  // If user is already authenticated and visits /admin/login, redirect to /admin
  if (pathname === '/admin/login' && sessionCookie) {
    const valid = await isValidAdminSession(sessionCookie);
    if (valid) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // 2. Security Headers Injection
  const response = NextResponse.next();

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  );
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');

  // Content-Security-Policy
  // - script-src: self + Cloudflare Turnstile (challenges.cloudflare.com)
  //   Next.js dev HMR requires unsafe-eval; locked out in production.
  // - style-src: self + unsafe-inline (Next.js injects critical CSS inline)
  // - font-src: self (next/font downloads and serves fonts from self at build time)
  // - frame-src: Cloudflare Turnstile renders in an iframe
  // - frame-ancestors: none (replaces X-Frame-Options for CSP-capable browsers)
  const isDev = process.env.NODE_ENV !== 'production';
  const scriptSrc = isDev
    ? `'self' 'unsafe-eval' https://challenges.cloudflare.com`
    : `'self' https://challenges.cloudflare.com`;

  const csp = [
    `default-src 'self'`,
    `script-src ${scriptSrc}`,
    `style-src 'self' 'unsafe-inline'`,
    `font-src 'self' data:`,
    `img-src 'self' data: blob: https:`,
    `connect-src 'self'`,
    `frame-src https://challenges.cloudflare.com`,
    `frame-ancestors 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `upgrade-insecure-requests`,
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, logos
     */
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

