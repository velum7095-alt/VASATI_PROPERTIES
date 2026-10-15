'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CookiePreferences,
  DEFAULT_PREFERENCES,
  getStoredConsent,
  saveStoredConsent,
  CURRENT_COOKIE_POLICY_VERSION,
} from '@/lib/cookie-consent';
import {
  ShieldCheck,
  Settings,
  X,
  Check,
  Lock,
  BarChart3,
  Sliders,
  ExternalLink,
} from 'lucide-react';

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Preference Toggles for Customisation Modal
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [functionalEnabled, setFunctionalEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = getStoredConsent();
    if (!existing) {
      // Show banner after brief delay
      const timer = setTimeout(() => setShowBanner(true), 600);
      return () => clearTimeout(timer);
    } else {
      setAnalyticsEnabled(existing.analytics);
      setFunctionalEnabled(existing.functional);
      setMarketingEnabled(existing.marketing);
    }

    // Listen for global open requests (e.g. from footer link or privacy policy)
    const handleOpenSettings = () => {
      const current = getStoredConsent();
      if (current) {
        setAnalyticsEnabled(current.analytics);
        setFunctionalEnabled(current.functional);
        setMarketingEnabled(current.marketing);
      }
      setShowModal(true);
    };

    window.addEventListener('dpdp-open-cookie-settings', handleOpenSettings);
    return () => {
      window.removeEventListener('dpdp-open-cookie-settings', handleOpenSettings);
    };
  }, []);

  const handleAcceptAll = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
      status: 'all',
      version: CURRENT_COOKIE_POLICY_VERSION,
      timestamp: new Date().toISOString(),
    };
    saveStoredConsent(prefs);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleRejectNonEssential = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
      status: 'rejected',
      version: CURRENT_COOKIE_POLICY_VERSION,
      timestamp: new Date().toISOString(),
    };
    saveStoredConsent(prefs);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleSaveCustom = () => {
    const isAll = analyticsEnabled && functionalEnabled && marketingEnabled;
    const isNone = !analyticsEnabled && !functionalEnabled && !marketingEnabled;

    const prefs: CookiePreferences = {
      essential: true,
      analytics: analyticsEnabled,
      functional: functionalEnabled,
      marketing: marketingEnabled,
      status: isAll ? 'all' : isNone ? 'rejected' : 'custom',
      version: CURRENT_COOKIE_POLICY_VERSION,
      timestamp: new Date().toISOString(),
    };
    saveStoredConsent(prefs);
    setShowBanner(false);
    setShowModal(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* 1. Persistent Bottom-Left Trigger Pill (Easy withdrawal as required by DPDP Act) */}
      {!showBanner && !showModal && (
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="fixed bottom-4 left-4 z-40 flex items-center gap-2 px-3 py-1.5 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-950 text-xs font-bold rounded-full shadow-md border border-slate-200/80 backdrop-blur-md transition group"
          title="Manage cookie & privacy preferences"
        >
          <span className="text-sm">🍪</span>
          <span className="hidden sm:inline">Cookie Settings</span>
        </button>
      )}

      {/* 2. Main Consent Banner (First-time visitors) */}
      {showBanner && (
        <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Cookie & Privacy Notice</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Privacy by Design</span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-slate-950">
                  Your Privacy & Cookie Choices Matter
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We use cookies to ensure website functionality and enhance your property browsing experience. Non-essential analytics cookies are loaded only with your consent. We never sell personal data to third-party ad brokers.
                </p>

                <div className="text-[11px] text-slate-500 pt-0.5">
                  Learn more in our{' '}
                  <Link href="/cookies" className="text-emerald-700 font-bold underline">
                    Cookie Policy
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-emerald-700 font-bold underline">
                    Privacy Policy
                  </Link>.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 min-w-[200px]">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-full px-5 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition text-center"
                >
                  Accept All
                </button>

                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="w-full px-5 py-3 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white transition text-center"
                >
                  Reject Non-Essential
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="w-full px-4 py-2 rounded-xl font-bold text-xs text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition text-center inline-flex items-center justify-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Customize Preferences</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Customise Modal (Detailed Category Toggles) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  Consent Management
                </div>
                <h3 className="text-lg font-extrabold text-white">
                  Customize Cookie & Tracking Preferences
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Category Toggles */}
            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
              {/* Category 1: Essential */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h4 className="text-sm font-bold text-slate-900">
                      Strictly Necessary & Security Cookies
                    </h4>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-200 text-slate-700 rounded">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Essential for page navigation, session management, CSRF defense, and saving your preferences. Cannot be turned off.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <div className="w-10 h-6 bg-emerald-600 rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-80">
                    <div className="w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                </div>
              </div>

              {/* Category 2: Analytics */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h4 className="text-sm font-bold text-slate-900">
                      Privacy-Friendly Performance Analytics
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Helps us aggregate page views and popular Bangalore corridor searches without storing personal identities, IP addresses, or cross-site tracking cookies.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <button
                    type="button"
                    onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                    className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                      analyticsEnabled ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full shadow transform transition" />
                  </button>
                </div>
              </div>

              {/* Category 3: Functional */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h4 className="text-sm font-bold text-slate-900">
                      Functional & Preference Settings
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Retains your filtered budget preferences, selected Bangalore localities, and interactive map widgets across visits.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <button
                    type="button"
                    onClick={() => setFunctionalEnabled(!functionalEnabled)}
                    className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                      functionalEnabled ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full shadow transform transition" />
                  </button>
                </div>
              </div>

              {/* Category 4: Marketing & Advertising */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h4 className="text-sm font-bold text-slate-900">
                      Marketing & Advertising Pixels
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Disabled by default. We do not sell user data. When enabled, this allows personalized real estate recommendations on partner channels.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <button
                    type="button"
                    onClick={() => setMarketingEnabled(!marketingEnabled)}
                    className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                      marketingEnabled ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full shadow transform transition" />
                  </button>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <strong>Statutory Right to Withdraw:</strong> You can return to this screen at any time by clicking the &quot;Cookie Settings&quot; button in the footer or bottom-left corner of the website.
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-200 transition text-center"
              >
                Reject All Non-Essential
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold border border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition text-center"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition text-center"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

