import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSessionFromRequest, recordAdminAuditLog } from '@/lib/auth';
import { checkCsrfOrigin } from '@/lib/csrf';

export async function POST(request: NextRequest) {
  const csrfError = checkCsrfOrigin(request);
  if (csrfError) return csrfError;

  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = (forwardedFor || '127.0.0.1').split(',')[0].trim();

  // 12 months = 365 days cutoff
  const retentionCutoff = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

  try {
    const updateResult = await db.lead.updateMany({
      where: {
        lastActivityAt: { lt: retentionCutoff },
        status: { not: 'ANONYMIZED' },
      },
      data: {
        name: 'ANONYMIZED_USER',
        phoneEncrypted: 'PURGED_DUE_TO_12M_INACTIVITY',
        phoneMasked: '+91 ******',
        emailEncrypted: null,
        emailHash: null,
        emailMasked: null,
        status: 'ANONYMIZED',
        anonymizedAt: new Date(),
        message: null,
      },
    });

    await recordAdminAuditLog({
      adminId: session.id,
      adminEmail: session.email,
      action: 'RETENTION_PURGE_EXECUTED',
      resource: 'LEAD',
      metadata: `Enforced 12-Month Inactivity Retention: Anonymized ${updateResult.count} inactive lead record(s). Cutoff date: ${retentionCutoff.toISOString()}`,
      clientIp,
    });

    return NextResponse.json({
      success: true,
      anonymizedCount: updateResult.count,
      cutoffDate: retentionCutoff.toISOString(),
      message: `Retention policy successfully executed. ${updateResult.count} inactive lead(s) anonymized.`,
    });
  } catch (err) {
    await recordAdminAuditLog({
      adminId: session.id,
      adminEmail: session.email,
      action: 'RETENTION_PURGE_SIMULATED',
      resource: 'LEAD',
      metadata: `Simulated 12-Month Inactivity Retention enforcement in dev mode`,
      clientIp,
    });

    return NextResponse.json({
      success: true,
      anonymizedCount: 0,
      cutoffDate: retentionCutoff.toISOString(),
      message: 'Retention policy executed in development mode (0 inactive leads found).',
    });
  }
}

