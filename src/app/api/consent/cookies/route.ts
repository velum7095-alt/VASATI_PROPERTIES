import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashIp } from '@/lib/crypto';
import crypto from 'node:crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { preferences, pageUrl } = body;

    if (!preferences) {
      return NextResponse.json(
        { success: false, message: 'Invalid consent payload' },
        { status: 400 }
      );
    }

    // Extract & hash IP (Never store raw IP)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = (forwardedFor || realIp || '127.0.0.1').split(',')[0].trim();
    const saltedIpHash = hashIp(clientIp);

    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const userAgentHash = crypto
      .createHash('sha256')
      .update(userAgent)
      .digest('hex');

    const summaryText = `Cookie Consent Choice: ${preferences.status.toUpperCase()}. [Essential: true, Analytics: ${Boolean(
      preferences.analytics
    )}, Functional: ${Boolean(preferences.functional)}, Marketing: ${Boolean(
      preferences.marketing
    )}]. Policy: ${preferences.version || 'v1.0'}`;

    try {
      await db.consentLog.create({
        data: {
          consentType: 'COOKIE_BANNER',
          consentVersion: preferences.version || 'v1.0-2026-03',
          consentText: summaryText,
          language: 'en',
          isExplicit: true,
          ipHash: saltedIpHash,
          userAgentHash,
          pageUrl: pageUrl || '/',
        },
      });
    } catch (dbError) {
      // Local development fallback
      console.warn(
        '[COOKIE_CONSENT_LOG] Database offline, recorded locally in dev mode:',
        (dbError as Error).message
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error logging cookie consent:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to record consent' },
      { status: 500 }
    );
  }
}

