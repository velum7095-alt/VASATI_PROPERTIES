'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, Building2, IndianRupee, BedDouble, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { BANGALORE_LOCALITIES } from '@/lib/properties';

type TabType = 'buy' | 'new-projects' | 'rent' | 'plots' | 'commercial';

const HERO_TABS: { id: TabType; label: string; badge?: string }[] = [
  { id: 'buy', label: 'Buy' },
  { id: 'new-projects', label: 'New Projects', badge: 'RERA' },
  { id: 'rent', label: 'Rent' },
  { id: 'plots', label: 'Plots / Land' },
  { id: 'commercial', label: 'Commercial' },
];

export default function SearchHero99() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('buy');
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState('any');
  const [budget, setBudget] = useState('any');
  const [bhk, setBhk] = useState('any');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const popularCorridors = [
    'Whitefield',
    'Sarjapur Road',
    'Electronic City',
    'Hebbal',
    'Yelahanka',
    'Koramangala',
    'HSR Layout',
    'Devanahalli',
    'Kanakapura Road',
  ];

  const filteredLocalities = BANGALORE_LOCALITIES.filter(
    (l) => l !== 'All Localities' && l.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSearchLocation('');
    setBudget('any');
    setBhk('any');
    if (tab === 'plots') {
      setPropertyType('Plot');
    } else if (tab === 'commercial') {
      setPropertyType('Commercial');
    } else {
      setPropertyType('any');
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation.trim()) {
      const trimmed = searchLocation.trim();
      const exactLoc = BANGALORE_LOCALITIES.find(
        (l) => l.toLowerCase() === trimmed.toLowerCase()
      );
      if (exactLoc && exactLoc !== 'All Localities') {
        params.set('locality', exactLoc);
      } else {
        params.set('q', trimmed);
      }
    }

    if (activeTab === 'rent') {
      params.set('purpose', 'rent');
    } else if (activeTab === 'buy') {
      params.set('purpose', 'buy');
    } else if (activeTab === 'new-projects') {
      params.set('status', 'New Launch');
    }

    if (activeTab === 'plots') {
      params.set('type', 'Plot');
    } else if (activeTab === 'commercial') {
      params.set('type', 'Commercial');
    } else if (propertyType !== 'any') {
      params.set('type', propertyType);
    }

    if (budget !== 'any') params.set('budget', budget);
    if (bhk !== 'any' && activeTab !== 'plots' && activeTab !== 'commercial') {
      params.set('bhk', bhk);
    }

    router.push(`/listings?${params.toString()}`);
  };

  const selectLocality = (loc: string) => {
    setSearchLocation(loc);
    setSuggestionsOpen(false);
    const params = new URLSearchParams({ locality: loc });

    if (activeTab === 'rent') {
      params.set('purpose', 'rent');
    } else if (activeTab === 'buy') {
      params.set('purpose', 'buy');
    } else if (activeTab === 'new-projects') {
      params.set('status', 'New Launch');
    }

    if (activeTab === 'plots') {
      params.set('type', 'Plot');
    } else if (activeTab === 'commercial') {
      params.set('type', 'Commercial');
    } else if (propertyType !== 'any') {
      params.set('type', propertyType);
    }

    if (budget !== 'any') params.set('budget', budget);
    if (bhk !== 'any' && activeTab !== 'plots' && activeTab !== 'commercial') {
      params.set('bhk', bhk);
    }

    router.push(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 shadow-2xl border border-slate-800">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>India&apos;s Most Trusted Bangalore Real Estate Portal · 100% Karnataka RERA</span>
        </div>

        {/* Main 99acres-Style Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Find Your Dream Home in <span className="text-blue-400">Bengaluru</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal">
            Search verified builder apartments, luxury villas, commercial spaces, and plots across Whitefield, Sarjapur, Hebbal, and Electronic City.
          </p>
        </div>

        {/* 99acres Iconic In-Page Floating Search Box */}
        <div className="pt-4 max-w-4xl mx-auto text-left">
          {/* Top Search Tabs (99acres signature tab bar) */}
          <div className="relative z-20 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 overflow-x-auto scrollbar-none" role="tablist" aria-label="Property Search Tabs">
            {HERO_TABS.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`hero-tab-${tab.id}`}
                  data-testid={`hero-tab-${tab.id}`}
                  data-active={isSelected}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleTabChange(tab.id);
                  }}
                  className={`px-4 sm:px-6 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap border-t-2 select-none ${
                    isSelected
                      ? 'bg-white text-blue-600 shadow-md border-blue-600 relative z-20 translate-y-[2px] font-black'
                      : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700/90 hover:text-white border-transparent relative z-10 backdrop-blur-sm'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="hidden sm:inline-block text-[10px] bg-emerald-500 text-white font-extrabold px-1.5 py-0.2 rounded">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Unified White Search Bar Container */}
          <div className="bg-white rounded-2xl shadow-2xl p-2.5 sm:p-3 text-slate-900 border border-slate-100 relative z-10">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-stretch gap-2">
              {/* Location Input with Autocomplete */}
              <div className="relative flex-1 min-w-[240px]">
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus-within:bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                  <div className="flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      Bengaluru Corridor / Project
                    </span>
                    <input
                      type="text"
                      placeholder={
                        activeTab === 'rent'
                          ? 'Search Koramangala, Indiranagar, Whitefield...'
                          : activeTab === 'commercial'
                          ? 'Search ORR, Whitefield, Bellandur, MG Road...'
                          : activeTab === 'plots'
                          ? 'Search Devanahalli, Yelahanka, Sarjapur...'
                          : 'Search Whitefield, Sarjapur, Sobha, Prestige...'
                      }
                      value={searchLocation}
                      onChange={(e) => {
                        setSearchLocation(e.target.value);
                        setSuggestionsOpen(true);
                      }}
                      onFocus={() => setSuggestionsOpen(true)}
                      className="w-full bg-transparent text-sm font-bold text-slate-900 placeholder-slate-400 outline-none"
                    />
                  </div>
                </div>

                {/* Suggestions Dropdown */}
                {suggestionsOpen && searchLocation.trim() && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-slate-200 max-h-56 overflow-y-auto z-50 py-1">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-slate-600 border-b border-slate-100">
                      Matching Bangalore Localities
                    </div>
                    {filteredLocalities.length > 0 ? (
                      filteredLocalities.map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => selectLocality(loc)}
                          className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between"
                        >
                          <span className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-blue-600" />
                            {loc}
                          </span>
                          <span className="text-[10px] text-slate-600 font-mono">Bengaluru</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-3.5 py-2 text-xs text-slate-600">
                        No exact match. Press Search to query all listings.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Property Type Dropdown */}
              <div className="min-w-[150px]">
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus-within:bg-white focus-within:border-blue-600 transition">
                  <Building2 className="w-4 h-4 text-slate-600 shrink-0" />
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {activeTab === 'commercial' ? 'Commercial Type' : activeTab === 'plots' ? 'Plot Type' : 'Property Type'}
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 outline-none cursor-pointer"
                    >
                      {activeTab === 'commercial' ? (
                        <>
                          <option value="Commercial">All Commercial</option>
                          <option value="Commercial">Grade-A Office Space</option>
                          <option value="Commercial">Retail Showroom / Shop</option>
                        </>
                      ) : activeTab === 'plots' ? (
                        <>
                          <option value="Plot">All Plotted Enclaves</option>
                          <option value="Plot">Gated Villa Plots</option>
                        </>
                      ) : activeTab === 'rent' ? (
                        <>
                          <option value="any">All Rental Homes</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Villa">Luxury Villa</option>
                        </>
                      ) : (
                        <>
                          <option value="any">All Residential</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Villa">Villa / Row House</option>
                          <option value="Penthouse">Penthouse</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* Budget Dropdown */}
              <div className="min-w-[150px]">
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus-within:bg-white focus-within:border-blue-600 transition">
                  <IndianRupee className="w-4 h-4 text-slate-600 shrink-0" />
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {activeTab === 'rent' ? 'Monthly Rent' : 'Budget'}
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 outline-none cursor-pointer"
                    >
                      {activeTab === 'rent' ? (
                        <>
                          <option value="any">Any Rent</option>
                          <option value="0.30">Under ₹30,000 / mo</option>
                          <option value="0.50">Under ₹50,000 / mo</option>
                          <option value="1.00">Under ₹1.0 Lakh / mo</option>
                          <option value="2.00">Under ₹2.0 Lakh / mo</option>
                        </>
                      ) : activeTab === 'plots' ? (
                        <>
                          <option value="any">Any Budget</option>
                          <option value="80">Under ₹80 Lakh</option>
                          <option value="120">Under ₹1.20 Cr</option>
                          <option value="200">Under ₹2.00 Cr</option>
                        </>
                      ) : (
                        <>
                          <option value="any">Any Budget</option>
                          <option value="80">Under ₹80 Lakh</option>
                          <option value="120">Under ₹1.20 Cr</option>
                          <option value="200">Under ₹2.00 Cr</option>
                          <option value="350">Under ₹3.50 Cr</option>
                          <option value="500">Under ₹5.00 Cr</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* BHK / Area Selector */}
              <div className="min-w-[130px]">
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus-within:bg-white focus-within:border-blue-600 transition">
                  {activeTab === 'plots' || activeTab === 'commercial' ? (
                    <Layers className="w-4 h-4 text-slate-600 shrink-0" />
                  ) : (
                    <BedDouble className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {activeTab === 'plots' ? 'Plot Area' : activeTab === 'commercial' ? 'Space' : 'BHK'}
                    </label>
                    <select
                      value={bhk}
                      onChange={(e) => setBhk(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 outline-none cursor-pointer"
                    >
                      {activeTab === 'plots' ? (
                        <>
                          <option value="any">Any Dimension</option>
                          <option value="any">1,200 sq ft (30x40)</option>
                          <option value="any">1,500 sq ft (30x50)</option>
                          <option value="any">2,400 sq ft (40x60)</option>
                        </>
                      ) : activeTab === 'commercial' ? (
                        <>
                          <option value="any">Any Area</option>
                          <option value="any">Up to 2,000 sq ft</option>
                          <option value="any">2,000 - 5,000 sq ft</option>
                          <option value="any">5,000+ sq ft</option>
                        </>
                      ) : (
                        <>
                          <option value="any">Any BHK</option>
                          <option value="1">1 BHK</option>
                          <option value="2">2 BHK</option>
                          <option value="3">3 BHK</option>
                          <option value="4">4+ BHK</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Search Button */}
              <button
                type="submit"
                id="hero-search-submit"
                data-testid="hero-search-submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>
                  {activeTab === 'rent'
                    ? 'Search Rentals'
                    : activeTab === 'commercial'
                    ? 'Search Commercial'
                    : activeTab === 'plots'
                    ? 'Search Plots'
                    : activeTab === 'new-projects'
                    ? 'Search Launches'
                    : 'Search Properties'}
                </span>
              </button>
            </form>
          </div>

          {/* Active Search Category Direct Link Bar */}
          <div className="mt-2.5 flex items-center justify-between text-xs px-2 flex-wrap gap-2">
            <Link
              id="hero-category-browse-link"
              href={
                activeTab === 'rent'
                  ? '/listings?purpose=rent'
                  : activeTab === 'commercial'
                  ? '/listings?type=Commercial'
                  : activeTab === 'plots'
                  ? '/listings?type=Plot'
                  : activeTab === 'new-projects'
                  ? '/listings?status=New+Launch'
                  : '/listings?purpose=buy'
              }
              className="text-blue-300 hover:text-white font-semibold flex items-center gap-1 transition"
            >
              <span>
                {activeTab === 'rent'
                  ? 'Browse all verified Rental Homes in Bengaluru →'
                  : activeTab === 'commercial'
                  ? 'Browse all Grade-A Commercial & Office Spaces in Bengaluru →'
                  : activeTab === 'plots'
                  ? 'Browse all Gated Plotted Enclaves in Bengaluru →'
                  : activeTab === 'new-projects'
                  ? 'Browse all Karnataka RERA Approved New Launches →'
                  : 'Browse all 50+ Verified Apartments & Villas in Bengaluru →'}
              </span>
            </Link>
          </div>

          {/* Popular Corridors Quick Filter Strip */}
          <div className="mt-3 flex items-center gap-2 flex-wrap text-xs text-slate-300 px-2">
            <span className="font-semibold text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              Popular in Bangalore:
            </span>
            {popularCorridors.map((corridor) => (
              <button
                key={corridor}
                type="button"
                onClick={() => selectLocality(corridor)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-blue-400/50 text-slate-200 hover:text-white transition cursor-pointer"
              >
                {corridor}
              </button>
            ))}
          </div>
        </div>

        {/* 99acres Trust Metrics Row */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-800/80">
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">100%</div>
            <div className="text-[11px] text-slate-400 font-medium">Karnataka RERA Approved</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">50+</div>
            <div className="text-[11px] text-slate-400 font-medium">Top Tier A Builders</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">₹0</div>
            <div className="text-[11px] text-slate-400 font-medium">Brokerage on New Homes</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">5,000+</div>
            <div className="text-[11px] text-slate-400 font-medium">Happy Bangalore Families</div>
          </div>
        </div>
      </div>
    </section>
  );
}
