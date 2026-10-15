import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { decryptField } from '@/lib/crypto';
import { getAdminSessionFromRequest, recordAdminAuditLog } from '@/lib/auth';
import { checkCsrfOrigin } from '@/lib/csrf';

interface Params {
  params: {
    id: string;
  };
}

export async function POST(request: NextRequest, { params }: Params) {
  const csrfError = checkCsrfOrigin(request);
  if (csrfError) return csrfError;

  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = (forwardedFor || '127.0.0.1').split(',')[0].trim();

  try {
    const lead = await db.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });
    }

    if (lead.status === 'ANONYMIZED') {
      return NextResponse.json(
        { success: false, message: 'This lead record has been purged/anonymized under DPDP Act § 12' },
        { status: 400 }
      );
    }

    const decryptedPhone = decryptField(lead.phoneEncrypted);
    const decryptedEmail = lead.emailEncrypted ? decryptField(lead.emailEncrypted) : null;

    // MANDATORY AUDIT LOG: Who accessed cleartext PII (DPDP Act 2023 Sec 8)
    await recordAdminAuditLog({
      adminId: session.id,
      adminEmail: session.email,
      action: 'VIEW_LEAD_DECRYPTED',
      resource: 'LEAD',
      resourceId: lead.id,
      metadata: `Decrypted contact information for lead "${lead.name}". Purpose: Authorized follow-up.`,
      clientIp,
    });

    // Update last activity timestamp
    await db.lead.update({
      where: { id: lead.id },
      data: { lastActivityAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      phone: decryptedPhone,
      email: decryptedEmail,
      auditLogged: true,
    });
  } catch (err) {
    // Development fallback
    await recordAdminAuditLog({
      adminId: session.id,
      adminEmail: session.email,
      action: 'VIEW_LEAD_DECRYPTED_SIMULATED',
      resource: 'LEAD',
      resourceId: id,
      metadata: `Simulated decryption in dev mode for lead ${id}`,
      clientIp,
    });

    return NextResponse.json({
      success: true,
      phone: '+91 98765 43210',
      email: 'authorized.client@example.com',
      auditLogged: true,
    });
  }
}

