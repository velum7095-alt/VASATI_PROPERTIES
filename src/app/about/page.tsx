import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  Building,
  CheckCircle2,
  Lock,
  MapPin,
  Award,
  Users,
  Compass,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Bangalore Verified Residential Real Estate Advisory',
  description:
    'Bangalore-first property advisory built on verified Karnataka RERA compliance and India DPDP Act 2023 privacy safeguards.',
};

export default function AboutPage() {
  const agencyRera = process.env.NEXT_PUBLIC_AGENCY_KRERA_NO || 'PRM/KA/RERA/1251/[YEAR]/AG/[NUMBER_PLACEHOLDER]';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Bangalore Residential Advisory Standard</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Verified Karnataka RERA Properties. Zero Spam. Complete Privacy.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We are a Bangalore-focused real estate advisory platform founded to eliminate ambiguity in residential property buying. We combine verified developer disclosures with India&apos;s highest data privacy standards.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/listings"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm inline-flex items-center gap-2"
            >
              <span>Explore Verified Homes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold transition border border-slate-200"
            >
              <span>Connect with Advisors</span>
            </Link>
          </div>
        </div>

        {/* 3 Pillars of Integrity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-950">
              100% Karnataka RERA Mandate
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every single listing published on this platform displays an authentic Karnataka RERA registration number cross-checked against the official regulator database. We never publish unapproved developments.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-950">
              DPDP Act 2023 Compliant by Design
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Built in strict adherence to India&apos;s Digital Personal Data Protection Act. We collect only what is strictly necessary (name and phone), encrypt data at rest with AES-256-GCM, and enforce zero telemarketing spam.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-950">
              Bangalore Micro-Market Depth
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We specialize exclusively in Bangalore. Our corridor intelligence covers IT corridors, metro connectivity, social infrastructure, and pricing analytics across Whitefield, Sarjapur, Hebbal, and Electronic City.
            </p>
          </div>
        </div>

        {/* Regulatory Agency Registration Card */}
        <div className="bg-emerald-950 text-white p-6 sm:p-10 rounded-3xl shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-1">
                Official Regulatory Registration
              </span>
              <h2 className="text-xl font-bold text-white">
                Karnataka Real Estate Regulatory Authority (K-RERA)
              </h2>
            </div>
            <div className="font-mono text-xs bg-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-700 text-emerald-200">
              Agency No: {agencyRera}
            </div>
          </div>

          <p className="text-xs text-emerald-100 leading-relaxed max-w-3xl">
            In compliance with Section 9 of the Real Estate (Regulation and Development) Act, 2016, our agency operates as an authorized real estate facilitation partner. We facilitate direct developer relationships without markup or unauthorized third-party broker redirection.
          </p>
        </div>

        {/* Bangalore Corridors Covered */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              Bangalore Growth Corridors Under Coverage
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Curated verified luxury and premium homes across prime employment and social hubs:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              📍 Whitefield & ITPL Corridor
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              📍 Sarjapur Road & Carmelaram
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              📍 Hebbal & North Bangalore
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              📍 Electronic City Phase 1 & 2
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              📍 HSR Layout & Haralur
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              📍 Yelahanka & Thanisandra
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              📍 Devanahalli Aerotropolis
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              📍 Koramangala & Central
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

