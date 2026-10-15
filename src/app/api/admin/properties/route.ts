import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAllProperties } from '@/lib/properties';
import { getAdminSessionFromRequest, recordAdminAuditLog } from '@/lib/auth';
import { checkCsrfOrigin } from '@/lib/csrf';

export async function GET(request: NextRequest) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const properties = await getAllProperties();
  return NextResponse.json({ success: true, properties });
}

export async function POST(request: NextRequest) {
  const csrfError = checkCsrfOrigin(request);
  if (csrfError) return csrfError;

  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { id, heroSlide, featured, heroOfferText, videoUrl, priceLabel, kreraRegNo } = body;

  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = (forwardedFor || '127.0.0.1').split(',')[0].trim();

  try {
    const updated = await db.property.update({
      where: { id },
      data: {
        heroSlide: typeof heroSlide === 'boolean' ? heroSlide : undefined,
        featured: typeof featured === 'boolean' ? featured : undefined,
        heroOfferText: heroOfferText !== undefined ? heroOfferText : undefined,
        videoUrl: videoUrl !== undefined ? videoUrl : undefined,
        priceLabel: priceLabel !== undefined ? priceLabel : undefined,
        kreraRegNo: kreraRegNo !== undefined ? kreraRegNo : undefined,
      },
    });

    await recordAdminAuditLog({
      adminId: session.id,
      adminEmail: session.email,
      action: 'EDIT_PROPERTY_CONTENT',
      resource: 'PROPERTY',
      resourceId: id,
      metadata: `Updated property settings. Hero Slide: ${heroSlide}, K-RERA: ${kreraRegNo}`,
      clientIp,
    });

    return NextResponse.json({ success: true, property: updated });
  } catch (err) {
    await recordAdminAuditLog({
      adminId: session.id,
      adminEmail: session.email,
      action: 'EDIT_PROPERTY_SIMULATED',
      resource: 'PROPERTY',
      resourceId: id,
      metadata: `Property updated in development simulation mode`,
      clientIp,
    });

    return NextResponse.json({
      success: true,
      message: 'Property content updated in dev simulation mode',
    });
  }
}

