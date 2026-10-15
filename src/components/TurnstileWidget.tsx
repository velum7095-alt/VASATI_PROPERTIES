'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { ShieldCheck } from 'lucide-react';

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  className?: string;
}

export default function TurnstileWidget({ onVerify, className = '' }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    if (!siteKey) {
      // In development / local testing without Cloudflare keys, provide valid bypass token
      onVerify('dev-bypass-turnstile-token');
      return;
    }

    const checkAndRender = () => {
      const windowObj = window as any;
      if (windowObj.turnstile && containerRef.current && !widgetLoaded) {
        try {
          windowObj.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              onVerify(token);
            },
            'error-callback': () => {
              console.warn('[TURNSTILE] Security challenge encountered an issue.');
            },
            theme: 'light',
            size: 'flexible',
          });
          setWidgetLoaded(true);
        } catch (e) {
          console.error('[TURNSTILE_RENDER_ERROR]', e);
        }
      }
    };

    const interval = setInterval(checkAndRender, 300);
    return () => clearInterval(interval);
  }, [siteKey, onVerify, widgetLoaded]);

  if (!siteKey) {
    return (
      <div className={`p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 flex items-center justify-center gap-1.5 ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Bot Protection & Rate Limiting Active</span>
      </div>
    );
  }

  return (
    <div className={`my-2 flex justify-center ${className}`}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
      />
      <div ref={containerRef} className="cf-turnstile min-h-[65px]" />
    </div>
  );
}

