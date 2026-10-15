import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieSettingsButton from '@/components/CookieSettingsButton';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  AlertTriangle,
  Calendar,
  Lock,
  BarChart3,
  Sliders,
  Settings,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie & Tracking Policy | DPDP Act 2023 Compliant',
  description:
    'Comprehensive explanation of cookie usage, categories, and consent mechanisms under India Digital Personal Data Protection Act, 2023.',
};

export default function CookiePolicyPage() {
  const lastUpdated = 'March 15, 2026';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Legal Disclaimer Banner */}
        <div className="p-4 sm:p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3.5 text-xs text-amber-900 leading-relaxed shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold text-amber-950 block">
              DRAFT POLICY NOTICE — MANDATORY LEGAL REVIEW REQUIRED BEFORE LAUNCH
            </strong>
            <p>
              This Cookie and Tracking Policy is a preliminary draft aligned with technical controls mandated by the{' '}
              <strong>Digital Personal Data Protection Act, 2023</strong> and the{' '}
              <strong>Information Technology Act, 2000</strong>. It must be formally certified by a qualified Indian advocate prior to production launch.
            </p>
          </div>
        </div>

        {/* Page Header */}
        <div className="space-y-2 border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Digital Personal Data Protection Act, 2023 Notice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Cookie & Tracking Technology Policy
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Effective Date: {lastUpdated}
            </span>
            <span>•</span>
            <span>Version: v1.0-2026-03</span>
          </div>
        </div>

        {/* Interactive Preferences Banner */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-xs text-slate-600">
            <strong className="text-sm font-bold text-slate-950 block">
              Manage Your Active Cookie Preferences
            </strong>
            <p>
              You can adjust or revoke your consent for optional cookies at any time with immediate effect.
            </p>
          </div>
          <div className="shrink-0">
            <CookieSettingsButton className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs" />
          </div>
        </div>

        {/* Content Body */}
        <article className="prose prose-slate max-w-none space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Section 1: What Are Cookies */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">1</span>
              What are Cookies & Tracking Technologies?
            </h2>
            <p>
              Cookies are small alphanumeric text files stored on your browser or device when you browse websites. They enable websites to recall user actions, maintain authenticated sessions, and measure page performance.
            </p>
            <p>
              Under the DPDP Act 2023, personal data gathered via telemetry or browser identifiers requires explicit, unbundled notice and affirmative consent before deployment, with the sole exception of strictly necessary security items.
            </p>
          </section>

          {/* Section 2: Categories of Cookies */}
          <section className="space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">2</span>
              Categories of Cookies Deployed on this Platform
            </h2>

            {/* Category A: Essential */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">A. Strictly Necessary & Security Cookies (Exempt from Opt-in)</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-200 text-slate-700 rounded">Always Active</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                These cookies are indispensable for website operations, CSRF protection, secure HTTPS routing, and saving your DPDP consent state. They do not store identifiable personal profiles.
              </p>
            </div>

            {/* Category B: Analytics */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">B. Privacy-First Analytics Cookies (Explicit Opt-In Only)</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">Opt-In Required</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We prefer self-hosted, cookieless metrics (such as Umami or Plausible). When analytics are activated with your consent, IP addresses are anonymized and no cross-site digital fingerprinting is executed.
              </p>
            </div>

            {/* Category C: Functional */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">C. Functional & Preference Cookies (Explicit Opt-In Only)</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">Opt-In Required</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                These cookies remember your locality selections (e.g., Whitefield or Hebbal), mortgage calculator preferences, and language selection (English/Kannada/Hindi).
              </p>
            </div>

            {/* Category D: Marketing */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">D. Marketing & Advertising Pixels (Default Disabled)</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-800 rounded">Default Disabled</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We do not sell user data. Third-party advertising pixels are inhibited unless you affirmatively select &quot;Accept All&quot; or enable them in custom settings.
              </p>
            </div>
          </section>

          {/* Section 3: Technical Cookie Inventory */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">3</span>
              Cookie Inventory & Retention Table
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-900 font-bold">
                  <tr>
                    <th className="p-3 border-b border-slate-200">Cookie Name</th>
                    <th className="p-3 border-b border-slate-200">Category</th>
                    <th className="p-3 border-b border-slate-200">Purpose</th>
                    <th className="p-3 border-b border-slate-200">Duration</th>
                    <th className="p-3 border-b border-slate-200">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-mono font-bold">dpdp_cookie_consent_v1</td>
                    <td className="p-3">Strictly Necessary</td>
                    <td className="p-3">Stores user opt-in / rejection preferences</td>
                    <td className="p-3">12 Months</td>
                    <td className="p-3">First Party</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold">__Host-session</td>
                    <td className="p-3">Strictly Necessary</td>
                    <td className="p-3">Secure authenticated session state for admin</td>
                    <td className="p-3">Session only</td>
                    <td className="p-3">First Party (Secure, HttpOnly)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold">_bl_filter_pref</td>
                    <td className="p-3">Functional</td>
                    <td className="p-3">Stores selected Bangalore locality filter</td>
                    <td className="p-3">30 Days</td>
                    <td className="p-3">First Party (Optional)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold">_ga / _ga_*</td>
                    <td className="p-3">Analytics</td>
                    <td className="p-3">Aggregated telemetry (Loaded ONLY after consent)</td>
                    <td className="p-3">12 Months</td>
                    <td className="p-3">Third Party (Google)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Browser Controls & Do Not Track */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">4</span>
              Browser Controls & Do Not Track (DNT) Compliance
            </h2>
            <p>
              In addition to our on-site consent manager:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>Our software automatically respects the browser <strong>Do Not Track (DNT: 1)</strong> and <strong>Global Privacy Control (GPC)</strong> signals. If detected, optional analytics are completely blocked.</li>
              <li>You can clear existing cookies or block third-party trackers entirely via your browser settings (Chrome, Firefox, Safari, Edge).</li>
            </ul>
          </section>
        </article>

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link href="/" className="text-xs font-bold text-emerald-700 hover:text-emerald-900 transition">
            ← Return to Bangalore Property Inventory
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

