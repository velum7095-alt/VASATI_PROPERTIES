import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ListingsFilterGrid from '@/components/ListingsFilterGrid';
import { getAllProperties } from '@/lib/properties';
import { ShieldCheck, MapPin, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Properties for Sale in Bengaluru | 100% Karnataka RERA Verified | 99acres Style',
  description: 'Search verified apartments, luxury villas, and plots in Bengaluru with official Karnataka RERA registration numbers.',
};

interface Props {
  searchParams: {
    locality?: string;
    bhk?: string;
    budget?: string;
    type?: string;
    purpose?: string;
    q?: string;
    search?: string;
    status?: string;
  };
}

export default async function ListingsPage({ searchParams }: Props) {
  const properties = await getAllProperties();
  const defaultLocality = searchParams.locality || 'All Localities';
  const defaultBhk = searchParams.bhk || 'any';
  const defaultBudget = searchParams.budget || 'any';
  const defaultType = searchParams.type || 'any';
  const defaultPurpose = searchParams.purpose || 'any';
  const defaultSearch = searchParams.q || searchParams.search || '';
  const defaultStatus = searchParams.status || 'any';

  const getPageTitle = () => {
    let base = 'Properties for Sale';
    if (defaultPurpose === 'rent') base = 'Properties for Rent';
    else if (defaultType.toLowerCase() === 'commercial') base = 'Commercial Properties';
    else if (defaultType.toLowerCase() === 'plot') base = 'Residential Plots & Land';
    else if (defaultType.toLowerCase() === 'villa') base = 'Luxury Villas for Sale';

    if (defaultLocality !== 'All Localities') {
      return `${base} in ${defaultLocality}, Bengaluru`;
    }
    return `${base} in Bengaluru`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 99acres Style Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/listings" className="hover:text-blue-600">
            Bengaluru Properties
          </Link>
          {defaultPurpose === 'rent' && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-blue-600 font-semibold">Rent</span>
            </>
          )}
          {defaultType !== 'any' && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-blue-600 font-semibold">{defaultType}</span>
            </>
          )}
          {defaultLocality !== 'All Localities' && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-slate-800 font-bold">{defaultLocality}</span>
            </>
          )}
        </nav>

        {/* 99acres Clean Title Header Banner */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Verified Karnataka RERA Listings
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {getPageTitle()}
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Verified inventory with direct developer pricing, audited RERA filings, and privacy-protected inquiries across Bengaluru.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 text-xs">
            <div className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 font-bold">
              📍 Bengaluru Corridors Only
            </div>
            <div className="px-3 py-2 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% RERA Verified</span>
            </div>
          </div>
        </div>

        {/* Listings Filter Grid */}
        <ListingsFilterGrid
          key={`${defaultLocality}-${defaultBhk}-${defaultBudget}-${defaultType}-${defaultPurpose}-${defaultSearch}-${defaultStatus}`}
          initialProperties={properties}
          defaultLocality={defaultLocality}
          defaultBhk={defaultBhk}
          defaultBudget={defaultBudget}
          defaultType={defaultType}
          defaultPurpose={defaultPurpose}
          defaultSearch={defaultSearch}
          defaultStatus={defaultStatus}
        />
      </main>

      <Footer />
    </div>
  );
}
