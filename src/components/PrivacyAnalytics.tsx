'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { getStoredConsent, CookiePreferences } from '@/lib/cookie-consent';

export default function PrivacyAnalytics() {
  const [canLoadAnalytics, setCanLoadAnalytics] = useState(false);

  useEffect(() => {
    // 1. Check Do Not Track (DNT) header in browser
    if (typeof window !== 'undefined' && navigator.doNotTrack === '1') {
      console.info('[PRIVACY_GUARD] Browser Do Not Track (DNT) signal detected. Analytics inhibited.');
      return;
    }

    // 2. Check stored consent
    const stored = getStoredConsent();
    if (stored?.analytics) {
      setCanLoadAnalytics(true);
    }

    // 3. Listen for consent updates
    const handleConsentChange = (e: Event) => {
      const customEvent = e as CustomEvent<CookiePreferences>;
      if (customEvent.detail?.analytics) {
        setCanLoadAnalytics(true);
      } else {
        setCanLoadAnalytics(false);
      }
    };

    window.addEventListener('dpdp-consent-updated', handleConsentChange);
    return () => {
      window.removeEventListener('dpdp-consent-updated', handleConsentChange);
    };
  }, []);

  if (!canLoadAnalytics) {
    // Privacy-by-design: Zero tracking scripts rendered in DOM before consent
    return null;
  }

  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL || 'https://analytics.umami.is/script.js';
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {/* 1. Self-hosted Umami Privacy-First Analytics */}
      {umamiId && (
        <Script
          strategy="afterInteractive"
          src={umamiUrl}
          data-website-id={umamiId}
          data-auto-track="true"
        />
      )}

      {/* 2. Self-hosted Plausible Analytics */}
      {plausibleDomain && (
        <Script
          strategy="afterInteractive"
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
        />
      )}

      {/* 3. Google Analytics with Mandatory DPDP Safeguards (IP Anonymisation, No Ad Signals) */}
      {gaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  anonymize_ip: true,
                  allow_google_signals: false,
                  allow_ad_personalization_signals: false,
                  restricted_data_processing: true
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}

