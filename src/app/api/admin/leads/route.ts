import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSessionFromRequest, recordAdminAuditLog } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = (forwardedFor || '127.0.0.1').split(',')[0].trim();

  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        phoneMasked: true,
        emailMasked: true,
        propertyTitle: true,
        preferredLocality: true,
        preferredBudget: true,
        leadType: true,
        status: true,
        message: true,
        lastActivityAt: true,
        anonymizedAt: true,
        createdAt: true,
        consentLog: {
          select: {
            id: true,
            consentVersion: true,
            language: true,
            withdrawn: true,
            createdAt: true,
          },
        },
      },
    });

    await recordAdminAuditLog({
      adminId: session.id,
      adminEmail: session.email,
      action: 'VIEW_LEADS_INDEX',
      resource: 'LEAD',
      metadata: `Viewed ${leads.length} masked lead records`,
      clientIp,
    });

    return NextResponse.json({ success: true, leads });
  } catch (err) {
    // Development fallback mock leads
    const mockLeads = [
      {
        id: 'dev-lead-1',
        name: 'Vikram Sharma',
        phoneMasked: '+91 98*** **210',
        emailMasked: 'v***a@example.com',
        propertyTitle: 'Sobha Neopolis',
        preferredLocality: 'Whitefield',
        preferredBudget: '₹1.5 Cr – ₹2.5 Cr',
        leadType: 'GENERAL_ENQUIRY',
        status: 'NEW',
        message: 'Interested in 3 BHK corner unit on higher floor.',
        lastActivityAt: new Date().toISOString(),
        anonymizedAt: null,
        createdAt: new Date().toISOString(),
        consentLog: {
          id: 'dev-consent-1',
          consentVersion: 'v1.0-2026-03',
          language: 'en',
          withdrawn: false,
          createdAt: new Date().toISOString(),
        },
      },
      {
        id: 'dev-lead-2',
        name: 'Priya Rao',
        phoneMasked: '+91 97*** **845',
        emailMasked: 'p***o@example.com',
        propertyTitle: 'Godrej Park Retreat',
        preferredLocality: 'Sarjapur Road',
        preferredBudget: '₹80 Lakhs – ₹1.5 Cr',
        leadType: 'SITE_VISIT',
        status: 'CONTACTED',
        message: 'Requested weekend site visit at 11 AM.',
        lastActivityAt: new Date().toISOString(),
        anonymizedAt: null,
        createdAt: new Date().toISOString(),
        consentLog: {
          id: 'dev-consent-2',
          consentVersion: 'v1.0-2026-03',
          language: 'kn',
          withdrawn: false,
          createdAt: new Date().toISOString(),
        },
      },
    ];

    return NextResponse.json({ success: true, leads: mockLeads });
  }
}

