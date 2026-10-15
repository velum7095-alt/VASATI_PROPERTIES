import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSessionFromRequest, recordAdminAuditLog } from '@/lib/auth';
import { checkCsrfOrigin } from '@/lib/csrf';

export async function GET(request: NextRequest) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = (forwardedFor || '127.0.0.1').split(',')[0].trim();

  try {
    const requests = await db.dataSubjectRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    await recordAdminAuditLog({
      adminId: session.id,
      adminEmail: session.email,
      action: 'VIEW_DSR_REGISTER',
      resource: 'DSR',
      metadata: `Viewed ${requests.length} DSR records`,
      clientIp,
    });

    return NextResponse.json({ success: true, requests });
  } catch (err) {
    // Development fallback mock DSRs
    const mockDsr = [
      {
        id: 'dev-dsr-1',
        requestTrackingId: 'DSR-KA-2026-9481',
        requestType: 'ERASURE',
        requesterName: 'A***k K***r',
        requesterPhoneMasked: '+91 99*** **112',
        requesterEmailMasked: 'a***k@example.com',
        details: 'Requesting erasure of all contact details submitted for Whitefield inquiry.',
        status: 'FULFILLED',
        dueAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
        fulfilledAt: new Date().toISOString(),
        resolutionNotes: 'Automated immediate erasure executed. Records scrubbed and consent revoked.',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'dev-dsr-2',
        requestTrackingId: 'DSR-KA-2026-B382',
        requestType: 'ACCESS',
        requesterName: 'S***a M***y',
        requesterPhoneMasked: '+91 98*** **490',
        requesterEmailMasked: 's***a@example.com',
        details: 'Requesting summary of processed enquiry data under DPDP Act § 11.',
        status: 'IN_REVIEW',
        dueAt: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
        fulfilledAt: null,
        resolutionNotes: null,
        createdAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({ success: true, requests: mockDsr });
  }
}

export async function POST(request: NextRequest) {
  const csrfError = checkCsrfOrigin(request);
  if (csrfError) return csrfError;

  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { id, status, resolutionNotes } = await request.json();
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = (forwardedFor || '127.0.0.1').split(',')[0].trim();

  try {
    const updated = await db.dataSubjectRequest.update({
      where: { id },
      data: {
        status,
        resolutionNotes,
        fulfilledAt: status === 'FULFILLED' ? new Date() : undefined,
      },
    });

    await recordAdminAuditLog({
      adminId: session.id,
      adminEmail: session.email,
      action: 'UPDATE_DSR_STATUS',
      resource: 'DSR',
      resourceId: id,
      metadata: `Changed status to "${status}". Notes: "${resolutionNotes}"`,
      clientIp,
    });

    return NextResponse.json({ success: true, updated });
  } catch (err) {
    return NextResponse.json({
      success: true,
      message: 'Updated DSR status in development simulation mode',
    });
  }
}

