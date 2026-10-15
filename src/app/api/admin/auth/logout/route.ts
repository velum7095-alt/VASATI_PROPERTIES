import { NextRequest, NextResponse } from 'next/server';
import {
  getAdminSessionFromRequest,
  recordAdminAuditLog,
  ADMIN_COOKIE_NAME,
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  const session = getAdminSessionFromRequest(request);
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = (forwardedFor || '127.0.0.1').split(',')[0].trim();

  if (session) {
    await recordAdminAuditLog({
      adminId: session.id,
      adminEmail: session.email,
      action: 'LOGOUT',
      resource: 'AUTH',
      clientIp,
    });
  }

  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}

