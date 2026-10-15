'use client';

import React from 'react';
import Link from 'next/link';

interface ConsentNoticeBoxProps {
  type: 'enquiry' | 'siteVisit' | 'whatsapp';
  propertyTitle?: string;
  checked: boolean;
  onChange: (checked: boolean, verbatimText: string, lang: 'en', version: string) => void;
  error?: string;
}

export default function ConsentNoticeBox({
  type,
  propertyTitle,
  checked,
  onChange,
  error,
}: ConsentNoticeBoxProps) {
  const label =
    type === 'siteVisit'
      ? 'I agree to be contacted via Call or WhatsApp to coordinate my Bangalore property site visit.'
      : type === 'whatsapp'
      ? 'I agree to connect with the verified Bangalore property advisory desk via WhatsApp.'
      : 'I authorize Vasati Properties to contact me via Call or WhatsApp regarding this verified property.';

  return (
    <div className="pt-2">
      <label className="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked, label, 'en', 'v1.0')}
          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
        />
        <span className="text-xs text-slate-600 leading-snug">
          {label}{' '}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </span>
      </label>
      {error && (
        <p className="text-[11px] text-rose-600 font-semibold mt-1">{error}</p>
      )}
    </div>
  );
}
