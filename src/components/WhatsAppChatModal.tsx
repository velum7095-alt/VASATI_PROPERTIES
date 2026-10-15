'use client';

import React, { useState } from 'react';
import ConsentNoticeBox from './ConsentNoticeBox';
import { cn } from '@/lib/utils';
import {
  ConsentLanguage,
  CURRENT_CONSENT_VERSION,
  getVerbatimConsentText,
} from '@/lib/consent-notices';
import {
  MessageCircle,
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface WhatsAppChatModalProps {
  propertyTitle?: string;
  kreraRegNo?: string;
  className?: string;
  buttonLabel?: string;
  buttonVariant?: 'primary' | 'outline' | 'floating' | 'icon';
}

export default function WhatsAppChatModal({
  propertyTitle,
  kreraRegNo,
  className = '',
  buttonLabel = 'Direct WhatsApp Chat',
  buttonVariant = 'primary',
}: WhatsAppChatModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentLang, setConsentLang] = useState<ConsentLanguage>('en');
  const [consentText, setConsentText] = useState(
    getVerbatimConsentText('whatsapp', 'en', propertyTitle)
  );
  const [hasOptedIn, setHasOptedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '916303420048';
  const queryMessage = propertyTitle
    ? `Hi, I am inquiring about ${propertyTitle} (K-RERA: ${kreraRegNo || 'Bangalore'}). Please share the brochure and verified pricing.`
    : `Hi, I would like to inquire about verified Bangalore residential properties.`;

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(queryMessage)}`;

  const handleConsentChange = (
    checked: boolean,
    text: string,
    lang: ConsentLanguage
  ) => {
    setConsentChecked(checked);
    setConsentText(text);
    setConsentLang(lang);
    if (checked) setError(null);
  };

  const handleProceed = async () => {
    if (!consentChecked) {
      setError('Please check the authorization box to start the chat.');
      return;
    }

    // Fire non-blocking consent logging in the background
    try {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'WhatsApp Visitor',
          phone: '9999999999', // placeholder for WhatsApp initiator before chat
          leadType: 'WHATSAPP_CLICK',
          propertyTitle: propertyTitle || 'Bangalore Real Estate Consultation',
          consent: true,
          consentLanguage: consentLang,
          consentVersion: CURRENT_CONSENT_VERSION,
          consentText,
          pageUrl: typeof window !== 'undefined' ? window.location.pathname : '/',
        }),
      }).catch(() => {
        // Non-blocking
      });
    } catch {
      // Continue anyway
    }

    setHasOptedIn(true);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const getButtonStyles = () => {
    if (buttonVariant === 'icon') {
      return '';
    }
    if (buttonVariant === 'floating') {
      return 'fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105';
    }
    if (buttonVariant === 'outline') {
      return 'w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs border border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition';
    }
    return 'w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition';
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(getButtonStyles(), className)}
        title={buttonLabel || 'Chat on WhatsApp'}
        aria-label={buttonLabel || 'Chat on WhatsApp'}
      >
        <MessageCircle className="w-4 h-4 shrink-0 text-current" />
        {buttonVariant !== 'icon' && <span className="font-bold">{buttonLabel}</span>}
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="p-5 bg-emerald-700 text-white flex items-start justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Bangalore Advisory</span>
                </div>
                <h3 className="text-base font-extrabold text-white">
                  WhatsApp Direct Inquiry
                </h3>
                <p className="text-xs text-emerald-100">
                  {propertyTitle || 'Bangalore Residential Advisory Desk'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-800 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Opt-in Notice & Spam Protection</span>
                </div>
                <p className="text-[11.5px] leading-relaxed text-slate-600">
                  By clicking below, you consent to open a direct WhatsApp chat with our official Bangalore advisory team. We adhere to TRAI DND regulations: we will never send unsolicited spam or marketing broadcasts. You can opt out at any time by replying &quot;STOP&quot;.
                </p>
              </div>

              {/* Statutory Consent Box */}
              <ConsentNoticeBox
                type="whatsapp"
                propertyTitle={propertyTitle}
                checked={consentChecked}
                onChange={handleConsentChange}
                error={error || undefined}
              />

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleProceed}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Proceed to WhatsApp Chat</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

