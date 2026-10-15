'use client';

import React, { useState } from 'react';
import ConsentNoticeBox from './ConsentNoticeBox';
import {
  ConsentLanguage,
  CURRENT_CONSENT_VERSION,
  getVerbatimConsentText,
} from '@/lib/consent-notices';
import {
  ShieldCheck,
  Send,
  Loader2,
  CheckCircle2,
  Lock,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';

interface EnquiryFormProps {
  propertyId?: string;
  propertyTitle?: string;
  defaultLocality?: string;
  compact?: boolean;
}

export default function EnquiryForm({
  propertyId,
  propertyTitle,
  defaultLocality,
  compact = false,
}: EnquiryFormProps) {
  // Form State (Minimised fields only)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [locality, setLocality] = useState(defaultLocality || '');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');

  // Statutory Consent State
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentLang, setConsentLang] = useState<ConsentLanguage>('en');
  const [consentText, setConsentText] = useState(
    getVerbatimConsentText('enquiry', 'en', propertyTitle)
  );

  // Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    referenceId: string;
    maskedPhone: string;
    message: string;
  } | null>(null);

  const handleConsentChange = (
    checked: boolean,
    text: string,
    lang: ConsentLanguage
  ) => {
    setConsentChecked(checked);
    setConsentText(text);
    setConsentLang(lang);
    if (checked && fieldErrors.consent) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.consent;
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});

    // Client-side quick validation
    const errors: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errors.name = 'Please provide your name (at least 2 characters)';
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      errors.phone = 'Please provide a valid 10-digit Indian mobile number';
    }

    if (!consentChecked) {
      errors.consent = 'Please authorize contact to submit your enquiry.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        preferredLocality: locality.trim() || defaultLocality || undefined,
        preferredBudget: budget || undefined,
        propertyId: propertyId || undefined,
        propertyTitle: propertyTitle || undefined,
        message: message.trim() || undefined,
        leadType: 'GENERAL_ENQUIRY',
        consent: true,
        consentLanguage: consentLang,
        consentVersion: CURRENT_CONSENT_VERSION,
        consentText,
        pageUrl: typeof window !== 'undefined' ? window.location.pathname : '/',
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const mapped: Record<string, string> = {};
          for (const key of Object.keys(data.errors)) {
            mapped[key] = data.errors[key][0];
          }
          setFieldErrors(mapped);
        }
        throw new Error(data.message || 'Submission failed');
      }

      setSubmissionSuccess({
        referenceId: data.referenceId,
        maskedPhone: data.maskedPhone,
        message: data.message,
      });
    } catch (err) {
      setFormError((err as Error).message || 'Unable to submit enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setConsentChecked(false);
    setSubmissionSuccess(null);
    setFormError(null);
    setFieldErrors({});
  };

  if (submissionSuccess) {
    return (
      <div className="p-6 sm:p-8 bg-emerald-50/70 border border-emerald-200 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-emerald-950">
              Enquiry Received Securely
            </h3>
            <p className="text-xs text-emerald-800">
              Protected under the Digital Personal Data Protection Act, 2023
            </p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-emerald-100 space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-600">
            <span>Enquiry Reference:</span>
            <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
              {submissionSuccess.referenceId}
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Contact Masked Preview:</span>
            <span className="font-bold text-slate-900">{submissionSuccess.maskedPhone}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Scope of Purpose:</span>
            <span className="text-emerald-700 font-medium">
              {propertyTitle || 'Bangalore Real Estate Consultation'}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {submissionSuccess.message} Our Bangalore property advisors will reach out shortly with verified pricing, brochures, and floor plans.
        </p>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition pt-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Submit another property enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {propertyTitle && !compact && (
        <div className="p-3 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200">
          Enquiring about: <span className="text-slate-950 font-bold">{propertyTitle}</span>
        </div>
      )}

      {/* Name Input */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          Full Name <span className="text-rose-600">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Vikram Sharma"
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          disabled={isSubmitting}
        />
        {fieldErrors.name && (
          <p className="text-[11px] text-rose-600 font-semibold mt-1">{fieldErrors.name}</p>
        )}
      </div>

      {/* Phone Input with +91 Country Indicator */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          Mobile Number (India) <span className="text-rose-600">*</span>
        </label>
        <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 bg-white">
          <span className="inline-flex items-center px-3 bg-slate-50 text-slate-600 font-bold text-xs border-r border-slate-200">
            🇮🇳 +91
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="98765 43210"
            className="flex-1 px-3 py-2.5 text-xs sm:text-sm focus:outline-none bg-white"
            disabled={isSubmitting}
          />
        </div>
        {fieldErrors.phone && (
          <p className="text-[11px] text-rose-600 font-semibold mt-1">{fieldErrors.phone}</p>
        )}
      </div>

      {/* Optional Email (Minimisation Principle) */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-bold text-slate-700">Email Address</label>
          <span className="text-[10px] font-semibold text-slate-400">Optional</span>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. vikram@example.com"
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          disabled={isSubmitting}
        />
        {fieldErrors.email && (
          <p className="text-[11px] text-rose-600 font-semibold mt-1">{fieldErrors.email}</p>
        )}
      </div>

      {/* Optional Budget & Locality for general enquiries */}
      {!propertyId && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Preferred Locality
            </label>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              disabled={isSubmitting}
            >
              <option value="">Any Bangalore Corridor</option>
              <option value="Whitefield">Whitefield</option>
              <option value="Sarjapur Road">Sarjapur Road</option>
              <option value="Hebbal">Hebbal</option>
              <option value="Electronic City">Electronic City</option>
              <option value="HSR Layout">HSR Layout</option>
              <option value="Yelahanka">Yelahanka</option>
              <option value="Devanahalli">Devanahalli</option>
              <option value="Koramangala">Koramangala</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Budget Range
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              disabled={isSubmitting}
            >
              <option value="">Any Budget</option>
              <option value="Under 80L">Under ₹80 Lakhs</option>
              <option value="80L - 1.5 Cr">₹80 Lakhs – ₹1.5 Cr</option>
              <option value="1.5 Cr - 2.5 Cr">₹1.5 Cr – ₹2.5 Cr</option>
              <option value="2.5 Cr+">₹2.5 Cr and above</option>
            </select>
          </div>
        </div>
      )}

      {/* Message (Optional) */}
      {!compact && (
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-slate-700">Specific Requirements</label>
            <span className="text-[10px] font-semibold text-slate-400">Optional</span>
          </div>
          <textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. Looking for a higher floor unit with east-facing balcony..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            disabled={isSubmitting}
          />
        </div>
      )}

      {/* Mandatory Statutory Consent Box with Kannada / Hindi toggle */}
      <ConsentNoticeBox
        type="enquiry"
        propertyTitle={propertyTitle}
        checked={consentChecked}
        onChange={handleConsentChange}
        error={fieldErrors.consent}
      />

      {/* Error banner */}
      {formError && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* Submission CTA */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-md transition disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Enquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Verified Enquiry</span>
          </>
        )}
      </button>

      {/* Compliance Footer Assurance */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
        <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Strictly confidential enquiry. Zero spam calls.</span>
      </div>
    </form>
  );
}

