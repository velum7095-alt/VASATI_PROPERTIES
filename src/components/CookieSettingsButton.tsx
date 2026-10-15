'use client';

import React from 'react';
import { openCookieSettingsModal } from '@/lib/cookie-consent';
import { Settings } from 'lucide-react';

interface Props {
  className?: string;
}

export default function CookieSettingsButton({ className = '' }: Props) {
  return (
    <button
      type="button"
      onClick={() => openCookieSettingsModal()}
      className={`hover:text-emerald-400 transition inline-flex items-center gap-1.5 text-xs text-slate-400 text-left ${className}`}
    >
      <Settings className="w-3 h-3 text-emerald-400 shrink-0" />
      <span>Manage Cookie Preferences</span>
    </button>
  );
}

