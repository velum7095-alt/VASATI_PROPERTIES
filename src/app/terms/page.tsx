import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  AlertTriangle,
  Calendar,
  Building,
  Scale,
  FileCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Karnataka RERA & IT Act 2000 Compliant',
  description:
    'Terms of Service and legal notice governing Bangalore residential property discovery and advisory services.',
};

export default function TermsAndConditionsPage() {
  const lastUpdated = 'March 15, 2026';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Statutory Legal Disclaimer Banner */}
        <div className="p-4 sm:p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3.5 text-xs text-amber-900 leading-relaxed shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold text-amber-950 block">
              DRAFT TERMS NOTICE — MANDATORY LEGAL REVIEW REQUIRED BEFORE LAUNCH
            </strong>
            <p>
              These Terms and Conditions are a preliminary draft prepared for adherence to the{' '}
              <strong>Information Technology Act, 2000</strong>, the{' '}
              <strong>Real Estate (Regulation and Development) Act, 2016 (RERA)</strong>, and{' '}
              <strong>Karnataka RERA Rules, 2017</strong>. They must be formally vetted by a qualified Indian advocate prior to production launch.
            </p>
          </div>
        </div>

        {/* Header Section */}
        <div className="space-y-2 border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-800">
            <Scale className="w-4 h-4 text-slate-700" />
            <span>Legal Agreement & Conditions of Use</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Terms & Conditions
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Effective Date: {lastUpdated}
            </span>
            <span>•</span>
            <span>Jurisdiction: Courts at Bangalore, Karnataka, India</span>
          </div>
        </div>

        {/* Content Body */}
        <article className="prose prose-slate max-w-none space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Section 1: Introduction & Scope */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">1</span>
              Platform Scope & Territorial Limitation
            </h2>
            <p>
              This digital platform is owned and operated by <strong>[BUSINESS_NAME_PLACEHOLDER]</strong>, holding Karnataka RERA Real Estate Agency Registration No.{' '}
              <span className="font-mono bg-slate-100 px-2 py-0.5 rounded font-bold">[AGENCY_KRERA_REG_NO_PLACEHOLDER]</span>.
            </p>
            <p>
              The platform operates strictly and exclusively within the jurisdiction of{' '}
              <strong>Bangalore Urban and Bangalore Rural Districts (Karnataka, India)</strong>, facilitating information, advisory services, and site visit coordination for verified RERA-approved residential inventory.
            </p>
          </section>

          {/* Section 2: Karnataka RERA Compliance Mandate */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">2</span>
              Karnataka RERA Compliance Mandate
            </h2>
            <p>
              In accordance with Section 10 of the Real Estate (Regulation and Development) Act, 2016:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>Every residential property published on this platform displays a valid <strong>Karnataka RERA Registration Number</strong> (e.g., <code>PRM/KA/RERA/...</code>). No property is published without verified registration.</li>
              <li>Listing information, specifications, and amenities are sourced directly from verified developer disclosures filed with the Karnataka Real Estate Regulatory Authority.</li>
              <li>Prospective purchasers are strongly encouraged to independently verify project filings on the official Karnataka RERA portal:{' '}
                <a
                  href="https://rera.karnataka.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 font-bold underline"
                >
                  rera.karnataka.gov.in
                </a>.
              </li>
            </ul>
          </section>

          {/* Section 3: Eligibility & Age Restriction */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">3</span>
              Eligibility (Age 18+)
            </h2>
            <p>
              By accessing this website, submitting an enquiry, or requesting an inspection, you represent and warrant that you are at least <strong>18 years of age</strong> and are legally competent to enter into a binding contract under the Indian Contract Act, 1872. If you are under 18, you may not use this platform or submit any personal information.
            </p>
          </section>

          {/* Section 4: Lead Routing & Communications */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">4</span>
              Communication & TRAI DND Compliance
            </h2>
            <p>
              When you submit a contact enquiry, book a site visit, or initiate a WhatsApp chat:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>You expressly authorize our verified Bangalore property advisory desk to contact you via telephone call, SMS, or WhatsApp solely regarding your specified property enquiry.</li>
              <li>We respect the Telecom Commercial Communications Customer Preference Regulations, 2018 (TRAI DND Regulations). We do not engage in automated voice robocalls or unsolicited marketing broadcasts.</li>
              <li>You may revoke communication authorization at any time by replying &quot;STOP&quot; on WhatsApp or by contacting our advisory desk directly.</li>
            </ul>
          </section>

          {/* Section 5: Intellectual Property & Permitted Use */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">5</span>
              Intellectual Property & Prohibited Activities
            </h2>
            <p>
              All software code, database architecture, design systems, curated guides, and editorial content are the exclusive intellectual property of [BUSINESS_NAME_PLACEHOLDER].
            </p>
            <p>You agree NOT to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>Use web scrapers, bots, automated crawlers, or data-mining utilities to extract listings or pricing sheets.</li>
              <li>Submit false, misleading, or impersonated contact details.</li>
              <li>Attempt to circumvent security headers, rate limits, or access controls.</li>
            </ul>
          </section>

          {/* Section 6: Disclaimers & Limitation of Liability */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">6</span>
              Advisory Nature & Limitation of Liability
            </h2>
            <p>
              While we make all reasonable efforts to ensure verified data accuracy from developer filings:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>The information provided on this platform does not constitute a formal offer of sale, legal advice, or financial underwriting.</li>
              <li>Square foot areas, floor plans, and delivery timelines are subject to change by developers within authorized RERA sanction parameters.</li>
              <li>To the fullest extent permitted under Indian law, [BUSINESS_NAME_PLACEHOLDER] shall not be liable for any indirect, incidental, or consequential damages resulting from property purchase decisions made without independent legal title inspection.</li>
            </ul>
          </section>

          {/* Section 7: Governing Law & Jurisdiction */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">7</span>
              Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms and any dispute arising out of or related to this website shall be governed by and construed in accordance with the substantive laws of India, including the <strong>Information Technology Act, 2000</strong> and the <strong>RERA Act, 2016</strong>.
            </p>
            <p>
              The competent courts situated in <strong>Bangalore, Karnataka, India</strong> shall have exclusive territorial jurisdiction over all matters arising hereunder.
            </p>
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

