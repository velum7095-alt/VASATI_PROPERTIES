import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnquiryForm from '@/components/EnquiryForm';
import WhatsAppChatModal from '@/components/WhatsAppChatModal';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Bangalore Property Advisory | Vasati Properties',
  description:
    'Connect with verified Karnataka RERA property advisors for Bangalore residential projects. Get direct developer pricing and expert consultation.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Page Hero */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Bangalore Real Estate Advisory Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Get in Touch with our Bangalore Team
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Have questions about upcoming RERA-approved residential launches, resale units, or site inspections across Whitefield, Sarjapur Road, Hebbal, or Electronic City? We are here to help.
          </p>
        </div>

        {/* 2-Column Grid: Left (Forms) | Right (Office & Trust Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Enquiry Form Container */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Send an Enquiry
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your data is processed securely with zero spam. Connect directly with our authorized project advisors.
              </p>
            </div>

            <EnquiryForm />
          </div>

          {/* Right Column: Office Location, WhatsApp, Trust Guarantee */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick WhatsApp Action Box */}
            <div className="bg-emerald-800 text-white p-6 rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">
                  Instant Support
                </span>
              </div>
              <h3 className="text-lg font-bold">Prefer Direct WhatsApp?</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Chat with our Bangalore advisory team for verified brochures, master plans, and site appointment booking directly on WhatsApp.
              </p>
              <WhatsAppChatModal
                buttonLabel="Chat with Bangalore Desk"
                className="bg-white !text-emerald-950 font-extrabold hover:bg-emerald-50 border border-emerald-100 shadow-md"
              />
            </div>

            {/* Bangalore Advisory Office Details */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider">
                Bangalore Office
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Vasati Properties Advisory</strong>
                    <span>Level 4, Prestige Meridian, MG Road / Outer Ring Road Corridor,</span>
                    <span className="block text-slate-500">Bangalore, Karnataka – 560001, India</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>+91 98765 43210</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>contact@vasatiproperties.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mon – Sat: 9:30 AM to 6:30 PM IST (Closed on Sundays)</span>
                </div>
              </div>
            </div>

            {/* Advisory Guarantee Box */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-amber-400">
                <Sparkles className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  The Vasati Promise
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% Karnataka RERA registered project inventory</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero brokerage fee on new developer launches</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct pricing and priority unit selection assistance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

