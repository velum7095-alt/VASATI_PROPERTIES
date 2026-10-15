'use client';

import React, { useState } from 'react';
import ConsentNoticeBox from './ConsentNoticeBox';
import {
  ConsentLanguage,
  CURRENT_CONSENT_VERSION,
  getVerbatimConsentText,
} from '@/lib/consent-notices';
import {
  Calendar,
  Clock,
  X,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  AlertCircle,
  MapPin,
} from 'lucide-react';

interface BookSiteVisitModalProps {
  propertyTitle: string;
  propertyAddress: string;
  kreraRegNo: string;
  propertyId?: string;
  triggerLabel?: string;
  triggerClassName?: string;
  triggerIcon?: React.ReactNode;
}

export default function BookSiteVisitModal({
  propertyTitle,
  propertyAddress,
  kreraRegNo,
  propertyId,
  triggerLabel,
  triggerClassName,
  triggerIcon,
}: BookSiteVisitModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 01:00 PM (Morning Slot)');

  // Consent State
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentLang, setConsentLang] = useState<ConsentLanguage>('en');
  const [consentText, setConsentText] = useState(
    getVerbatimConsentText('siteVisit', 'en', propertyTitle)
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successReceipt, setSuccessReceipt] = useState<{
    referenceId: string;
    maskedPhone: string;
  } | null>(null);

  // Tomorrow as minimum date for booking
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

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

  const handleOpen = () => {
    setIsOpen(true);
    setSuccessReceipt(null);
    setFormError(null);
    setFieldErrors({});
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const errors: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errors.name = 'Please enter your full name';
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (!visitDate) {
      errors.visitDate = 'Please select your preferred site inspection date';
    }
    if (!consentChecked) {
      errors.consent = 'Please authorize contact to schedule your site visit.';
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
        preferredDate: visitDate,
        propertyId,
        propertyTitle,
        message: `Requested Site Visit Slot: ${timeSlot} on date: ${visitDate}. Project K-RERA: ${kreraRegNo}`,
        leadType: 'SITE_VISIT',
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
        throw new Error(data.message || 'Booking submission failed');
      }

      setSuccessReceipt({
        referenceId: data.referenceId,
        maskedPhone: data.maskedPhone,
      });
    } catch (err) {
      setFormError((err as Error).message || 'Unable to book site visit.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={
          triggerClassName ||
          'w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white transition shadow-sm'
        }
      >
        {triggerIcon !== undefined ? (
          triggerIcon
        ) : (
          <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
        )}
        <span>{triggerLabel || 'Book Verified Site Visit'}</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>K-RERA: {kreraRegNo}</span>
                </div>
                <h3 className="text-lg font-extrabold text-white">Schedule Site Inspection</h3>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{propertyTitle} • {propertyAddress}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-4">
              {successReceipt ? (
                <div className="space-y-4 text-center py-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Site Visit Appointment Booked!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Your site visit request has been recorded. An on-site coordinator will reach out to confirm gate pass and parking access.
                  </p>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Booking Reference:</span>
                      <span className="font-mono font-bold text-slate-900">
                        {successReceipt.referenceId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contact Number:</span>
                      <span className="font-bold text-slate-900">{successReceipt.maskedPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Requested Date & Slot:</span>
                      <span className="font-bold text-emerald-800">
                        {visitDate} ({timeSlot.split(' ')[0]} {timeSlot.split(' ')[1]})
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Need to reschedule? Simply reply to our coordinator&apos;s call or WhatsApp.
                  </p>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      disabled={isSubmitting}
                    />
                    {fieldErrors.name && (
                      <p className="text-[11px] text-rose-600 font-semibold mt-1">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number <span className="text-rose-600">*</span>
                    </label>
                    <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">
                      <span className="inline-flex items-center px-3 bg-slate-50 text-slate-600 font-bold text-xs border-r border-slate-200">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="flex-1 px-3 py-2.5 text-xs sm:text-sm focus:outline-none"
                        disabled={isSubmitting}
                      />
                    </div>
                    {fieldErrors.phone && (
                      <p className="text-[11px] text-rose-600 font-semibold mt-1">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Date & Slot Picker */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Inspection Date <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="date"
                        min={minDateStr}
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        disabled={isSubmitting}
                      />
                      {fieldErrors.visitDate && (
                        <p className="text-[11px] text-rose-600 font-semibold mt-1">
                          {fieldErrors.visitDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Preferred Time Slot
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        disabled={isSubmitting}
                      >
                        <option value="10:00 AM - 01:00 PM (Morning Slot)">
                          Morning (10 AM - 1 PM)
                        </option>
                        <option value="02:00 PM - 05:00 PM (Afternoon Slot)">
                          Afternoon (2 PM - 5 PM)
                        </option>
                        <option value="05:00 PM - 07:00 PM (Evening Sunset Slot)">
                          Evening (5 PM - 7 PM)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Optional Email */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700">Email for Calendar Invite</label>
                      <span className="text-[10px] text-slate-400">Optional</span>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. vikram@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Site Visit Consent */}
                  <ConsentNoticeBox
                    type="siteVisit"
                    propertyTitle={propertyTitle}
                    checked={consentChecked}
                    onChange={handleConsentChange}
                    error={fieldErrors.consent}
                  />

                  {formError && (
                    <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Confirming Appointment...</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4" />
                          <span>Confirm Site Visit Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

