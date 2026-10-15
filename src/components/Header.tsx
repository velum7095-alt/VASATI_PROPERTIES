'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, ShieldCheck, MapPin, ChevronDown, Sparkles, Building, PhoneCall } from 'lucide-react';
import { BANGALORE_LOCALITIES } from '@/lib/properties';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Buy', href: '/listings?purpose=buy' },
  { name: 'Rent', href: '/listings?purpose=rent' },
  { name: 'Commercial', href: '/listings?type=Commercial' },
  { name: 'Plots', href: '/listings?type=Plot' },
];

function HeaderNavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const typeParam = searchParams?.get('type')?.toLowerCase();
  const purposeParam = searchParams?.get('purpose')?.toLowerCase();

  return (
    <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-slate-50 border border-slate-200/80 shadow-inner">
      {NAV_ITEMS.map((item) => {
        let isActive = false;
        if (item.name === 'Home') {
          isActive = pathname === '/';
        } else if (item.name === 'Rent') {
          isActive = pathname === '/listings' && purposeParam === 'rent';
        } else if (item.name === 'Commercial') {
          isActive = pathname === '/listings' && typeParam === 'commercial';
        } else if (item.name === 'Plots') {
          isActive = pathname === '/listings' && typeParam === 'plot';
        } else if (item.name === 'Buy') {
          isActive =
            pathname === '/listings' &&
            purposeParam !== 'rent' &&
            typeParam !== 'commercial' &&
            typeParam !== 'plot';
        }

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`${
              isActive
                ? "text-white font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 font-medium"
            } text-xs transition-colors px-3.5 py-1.5 rounded-lg relative cursor-pointer flex items-center gap-1.5`}
          >
            <span className="relative z-10">{item.name}</span>
            {isActive && (
              <motion.span
                layoutId="header-pill-tab"
                transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-lg shadow-sm"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-[0_1px_4px_0_rgba(0,106,194,0.08)]">
      {/* Top Utility Notice Bar (99acres subtle trust line) */}
      <div className="bg-slate-900 text-white text-[11px] font-medium py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Karnataka RERA Verified
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-300">Bangalore Exclusive Real Estate Advisory</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-300">Direct Developer Pricing</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a href="tel:+919876543210" className="hover:text-white transition">
              Advisory: +91 98765 43210
            </a>
            <span>|</span>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main 99acres-Style White Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & City Selector */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-sm border border-slate-200/80 group-hover:border-amber-400/60 group-hover:shadow-md transition">
                <Image
                  src="/logo.png"
                  alt="Vasati Properties Logo"
                  width={44}
                  height={44}
                  className="object-contain w-full h-full p-0.5"
                  priority
                />
              </div>
              <div className="leading-tight">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition">
                  VASATI<span className="text-blue-600">.</span>
                </span>
                <span className="hidden sm:inline-block ml-1.5 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Bangalore
                </span>
              </div>
            </Link>

            {/* 99acres City Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Bengaluru</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {cityDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setCityDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                    <span>Active Bengaluru Corridors</span>
                    <span className="text-emerald-600 font-mono text-[10px]">KA-RERA</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {BANGALORE_LOCALITIES.filter((l) => l !== 'All Localities').map((loc) => (
                      <Link
                        key={loc}
                        href={`/listings?locality=${encodeURIComponent(loc)}`}
                        onClick={() => setCityDropdownOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                      >
                        <span>{loc}</span>
                        <span className="text-[10px] text-slate-400">View →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center Navigation Links with Animated Chip Tabs */}
          <Suspense fallback={<div className="hidden lg:flex w-72 h-8 rounded-xl bg-slate-50 border border-slate-200/80 animate-pulse" />}>
            <HeaderNavLinks />
          </Suspense>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              <span>Contact Us</span>
            </Link>

            <Link
              href="/listings"
              className="inline-flex items-center justify-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg shadow-sm transition"
            >
              Explore Properties
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1 font-semibold text-sm text-slate-800">
            <Link
              href="/listings?purpose=buy"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-slate-50 hover:text-blue-600"
            >
              Buy Properties
            </Link>
            <Link
              href="/listings?purpose=rent"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-slate-50 hover:text-blue-600"
            >
              Rent Homes
            </Link>
            <Link
              href="/listings?type=Commercial"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-slate-50 hover:text-blue-600"
            >
              Commercial Properties
            </Link>
            <Link
              href="/listings?type=Plot"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-slate-50 hover:text-blue-600"
            >
              Plots / Land
            </Link>
            <Link
              href="/listings?type=Villa"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-slate-50 hover:text-blue-600"
            >
              Luxury Villas
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-slate-50"
            >
              Contact Bangalore Office
            </Link>
          </div>
          <div className="pt-2">
            <Link
              href="/listings"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center block py-2.5 text-xs font-bold text-white bg-blue-600 rounded-lg shadow-sm"
            >
              Search 100% RERA Verified Homes
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
