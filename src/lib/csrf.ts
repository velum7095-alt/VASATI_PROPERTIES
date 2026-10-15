import { NextRequest, NextResponse } from 'next/server';

/**
 * CSRF protection via Origin-header check (double-origin pattern).
 *
 * How it works:
 *   Browsers always send the Origin header on cross-site POST/PUT/DELETE/PATCH requests.
 *   We compare it against the server's own expected origin.
 *   A legitimate same-site fetch from the admin UI will always pass.
 *   A cross-site attacker's form/fetch cannot spoof the Origin header.
 *
 * When to use:
 *   Call this at the top of every mutating admin route (POST/PUT/PATCH/DELETE)
 *   that is protected by cookie-based authentication. Exempt: auth endpoints
 *   (login, logout, verify-2fa) — CSRF on a login endpoint has no security value.
 *
 * Returns null if the request passes, or a 403 NextResponse to return immediately.
 */
export function checkCsrfOrigin(request: NextRequest): NextResponse | null {
  // Allow server-to-server calls (e.g., cron, internal tools) that omit Origin.
  // They cannot carry the admin session cookie anyway because SameSite=Lax.
  const origin = request.headers.get('origin');
  if (!origin) return null;

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000');

  if (!appUrl) {
    // Can't verify without a known origin. Fail closed in production.
    return NextResponse.json(
      { success: false, message: 'CSRF: NEXT_PUBLIC_APP_URL not configured' },
      { status: 500 },
    );
  }

  let expectedOrigin: string;
  try {
    expectedOrigin = new URL(appUrl).origin; // e.g. "https://vasati.in"
  } catch {
    return NextResponse.json(
      { success: false, message: 'CSRF: NEXT_PUBLIC_APP_URL is malformed' },
      { status: 500 },
    );
  }

  if (origin !== expectedOrigin) {
    return NextResponse.json(
      { success: false, message: 'Forbidden: cross-origin request rejected' },
      { status: 403 },
    );
  }

  return null; // origin matches — request is safe to proceed
}
