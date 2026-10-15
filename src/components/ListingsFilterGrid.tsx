'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PropertyItem, BANGALORE_LOCALITIES } from '@/lib/properties';
import { ShieldCheck, MapPin, BedDouble, Calendar, ArrowUpDown, RotateCcw, Heart, Share2, CheckCircle2, PhoneCall, Sparkles } from 'lucide-react';
import BookSiteVisitModal from './BookSiteVisitModal';
import WhatsAppChatModal from './WhatsAppChatModal';

interface Props {
  initialProperties: PropertyItem[];
  defaultLocality?: string;
  defaultBhk?: string;
  defaultBudget?: string;
  defaultType?: string;
  defaultPurpose?: string;
  defaultSearch?: string;
  defaultStatus?: string;
}

export default function ListingsFilterGrid({
  initialProperties,
  defaultLocality = 'All Localities',
  defaultBhk = 'any',
  defaultBudget = 'any',
  defaultType = 'any',
  defaultPurpose = 'any',
  defaultSearch = '',
  defaultStatus = 'any',
}: Props) {
  const [selectedLocality, setSelectedLocality] = useState<string>(defaultLocality);
  const [selectedBhk, setSelectedBhk] = useState<string>(defaultBhk);
  const [selectedBudget, setSelectedBudget] = useState<string>(defaultBudget);
  const [selectedType, setSelectedType] = useState<string>(defaultType);
  const [selectedPurpose, setSelectedPurpose] = useState<string>(defaultPurpose);
  const [selectedStatus, setSelectedStatus] = useState<string>(defaultStatus);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>(defaultSearch);
  const [savedProperties, setSavedProperties] = useState<Record<string, boolean>>({});

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSavedProperties((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProperties = useMemo(() => {
    return initialProperties
      .filter((p) => {
        // Purpose filter (Buy vs Rent)
        if (selectedPurpose !== 'any') {
          const itemPurpose = p.purpose || 'buy';
          if (itemPurpose.toLowerCase() !== selectedPurpose.toLowerCase()) {
            return false;
          }
        }
        // Locality filter
        if (selectedLocality !== 'All Localities' && !p.locality.toLowerCase().includes(selectedLocality.toLowerCase())) {
          return false;
        }
        // BHK filter (only applicable for residential with bhk > 0)
        if (selectedBhk !== 'any') {
          const bhkNum = parseInt(selectedBhk, 10);
          if (bhkNum >= 4 ? p.bhk < 4 : p.bhk !== bhkNum) return false;
        }
        // Budget filter (in Lakhs)
        if (selectedBudget !== 'any') {
          const maxBudget = parseFloat(selectedBudget);
          if (p.price > maxBudget) return false;
        }
        // Property Type
        if (selectedType !== 'any' && p.propertyType.toLowerCase() !== selectedType.toLowerCase()) {
          return false;
        }
        // Status filter (e.g. New Launch, Ready to Move)
        if (selectedStatus !== 'any' && !p.status.toLowerCase().includes(selectedStatus.toLowerCase())) {
          return false;
        }
        // Text Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            p.title.toLowerCase().includes(q) ||
            p.locality.toLowerCase().includes(q) ||
            p.developerName.toLowerCase().includes(q) ||
            p.propertyType.toLowerCase().includes(q) ||
            (p.purpose && p.purpose.toLowerCase().includes(q)) ||
            p.kreraRegNo.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [initialProperties, selectedLocality, selectedBhk, selectedBudget, selectedType, selectedPurpose, selectedStatus, sortBy, searchQuery]);

  const resetFilters = () => {
    setSelectedLocality('All Localities');
    setSelectedBhk('any');
    setSelectedBudget('any');
    setSelectedType('any');
    setSelectedPurpose('any');
    setSelectedStatus('any');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="space-y-6">
      {/* 99acres-Style Filter Control Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {/* Quick Purpose & Category Switcher Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 border-b border-slate-100 scrollbar-none">
          <button
            type="button"
            onClick={() => { setSelectedPurpose('any'); setSelectedType('any'); }}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-lg whitespace-nowrap transition ${
              selectedPurpose === 'any' && selectedType === 'any'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Bangalore
          </button>
          <button
            type="button"
            onClick={() => { setSelectedPurpose('buy'); if (selectedType === 'Commercial' || selectedType === 'Plot') setSelectedType('any'); }}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-lg whitespace-nowrap transition ${
              selectedPurpose === 'buy' && selectedType !== 'Commercial' && selectedType !== 'Plot'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Buy Homes
          </button>
          <button
            type="button"
            onClick={() => { setSelectedPurpose('rent'); if (selectedType === 'Commercial' || selectedType === 'Plot') setSelectedType('any'); }}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-lg whitespace-nowrap transition ${
              selectedPurpose === 'rent'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Rent
          </button>
          <button
            type="button"
            onClick={() => { setSelectedType('Commercial'); setSelectedPurpose('any'); }}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-lg whitespace-nowrap transition ${
              selectedType.toLowerCase() === 'commercial'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Commercial
          </button>
          <button
            type="button"
            onClick={() => { setSelectedType('Plot'); setSelectedPurpose('any'); }}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-lg whitespace-nowrap transition ${
              selectedType.toLowerCase() === 'plot'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Plots / Land
          </button>
        </div>

        {/* Locality Quick Chips (Scrollable Corridor Pills) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Select Bengaluru Corridor:
            </span>
            <span className="text-[11px] text-blue-600 font-bold hidden sm:inline-block">
              {BANGALORE_LOCALITIES.length - 1} Micro-Markets Available
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {BANGALORE_LOCALITIES.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocality(loc)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full border whitespace-nowrap transition ${
                  selectedLocality === loc
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {loc === 'All Localities' ? 'All Bangalore' : loc}
              </button>
            ))}
          </div>
        </div>

        {/* Segmented Inputs Row (99acres Filter Strip) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-3 border-t border-slate-100">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              Search Project / Builder
            </label>
            <input
              type="text"
              placeholder="E.g. Sobha, Godrej, Prestige..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white font-medium"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              Bedrooms (BHK)
            </label>
            <select
              value={selectedBhk}
              onChange={(e) => setSelectedBhk(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold text-slate-800"
            >
              <option value="any">Any BHK</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4+ BHK Luxury</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              Max Budget
            </label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold text-slate-800"
            >
              <option value="any">Any Budget</option>
              <option value="80">Under ₹80 Lakh</option>
              <option value="120">Under ₹1.20 Cr</option>
              <option value="200">Under ₹2.00 Cr</option>
              <option value="350">Under ₹3.50 Cr</option>
              <option value="500">Under ₹5.00 Cr</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              Property Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold text-slate-800"
            >
              <option value="any">All Property Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Luxury Villa</option>
              <option value="Commercial">Commercial Office / Retail</option>
              <option value="Plot">Plots / Land</option>
              <option value="Penthouse">Penthouse</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold text-slate-800"
            >
              <option value="featured">Featured / Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Counter & Reset */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm font-bold text-slate-800">
          Showing <span className="text-blue-600 font-extrabold">{filteredProperties.length}</span> verified properties in Bengaluru
          {selectedPurpose === 'rent' && <span className="text-indigo-600 font-extrabold"> · For Rent</span>}
          {selectedPurpose === 'buy' && <span className="text-emerald-700 font-extrabold"> · For Sale</span>}
          {selectedType !== 'any' && <span className="text-blue-600 font-bold"> · {selectedType === 'Villa' ? 'Villas' : selectedType}</span>}
          {selectedStatus !== 'any' && <span className="text-emerald-600 font-bold"> · {selectedStatus}</span>}
          {selectedLocality !== 'All Localities' && <span className="text-slate-500"> ({selectedLocality})</span>}
        </p>
        {(selectedLocality !== 'All Localities' || selectedBhk !== 'any' || selectedBudget !== 'any' || searchQuery || selectedType !== 'any' || selectedPurpose !== 'any' || selectedStatus !== 'any') && (
          <button
            onClick={resetFilters}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        )}
      </div>

      {/* 99acres Clean Property Card Grid */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-slate-300">
          <div className="text-4xl mb-3">🏠</div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No Bangalore properties match your filters</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
            Try expanding your budget, selecting another corridor (e.g. Whitefield or Sarjapur Road), or resetting your criteria.
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((p) => {
            const approxEmiLakh = Math.round(p.price * 867.8);
            const isSaved = savedProperties[p.id] || false;

            return (
              <article
                key={p.id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col h-full"
              >
                {/* Property Card Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={p.images[0] || 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=78'}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    {p.purpose === 'rent' ? (
                      <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white bg-indigo-600 rounded-md shadow-sm">
                        For Rent
                      </span>
                    ) : p.propertyType === 'Commercial' ? (
                      <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white bg-amber-600 rounded-md shadow-sm">
                        Commercial
                      </span>
                    ) : p.propertyType === 'Plot' ? (
                      <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white bg-emerald-700 rounded-md shadow-sm">
                        Plot / Land
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-900 bg-white/95 backdrop-blur-md rounded-md shadow-sm">
                        {p.status}
                      </span>
                    )}
                    {p.featured && (
                      <span className="px-2.5 py-1 text-[10px] font-bold text-white bg-blue-600 rounded-md shadow-sm">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  {/* Top Right Save Button */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                    <button
                      onClick={(e) => toggleSave(p.id, e)}
                      className={`p-2 rounded-full backdrop-blur-md transition ${
                        isSaved ? 'bg-red-500 text-white' : 'bg-slate-900/60 text-white hover:bg-slate-900'
                      }`}
                      title={isSaved ? 'Saved to Favorites' : 'Save Property'}
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  {/* Bottom Image Overlay Strip */}
                  <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-white text-xs">
                    <span className="font-bold flex items-center gap-1.5 drop-shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      {p.locality}
                    </span>
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3 h-3" />
                      RERA Verified
                    </span>
                  </div>
                </div>

                {/* Card Body Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  {/* Pricing & Sub-label Header */}
                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <div className="text-2xl font-black text-slate-950 tracking-tight">
                      {p.priceLabel}
                    </div>
                    <div className="text-[11px] text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-md">
                      {p.purpose === 'rent'
                        ? 'Deposit: 3-5 Mo'
                        : `EMI ≈ ₹${(approxEmiLakh / 1000).toFixed(1)}k/mo`}
                    </div>
                  </div>

                  {/* Project Title & Developer */}
                  <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 min-h-[2.5rem] leading-snug mb-1">
                    {p.title}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium mb-3">
                    By <span className="font-semibold text-slate-700">{p.developerName}</span>
                  </div>

                  {/* Specs Chips Row */}
                  <div className="grid grid-cols-3 divide-x divide-slate-200/80 bg-slate-50 rounded-xl border border-slate-100 text-center py-2 px-1 mb-3">
                    <div className="px-1">
                      <div className="text-[9.5px] uppercase font-bold tracking-wider text-slate-400">Layout</div>
                      <div className="text-xs font-bold text-slate-800">
                        {p.propertyType === 'Commercial' ? 'Commercial' : p.propertyType === 'Plot' ? 'Plot' : `${p.bhk} BHK`}
                      </div>
                    </div>
                    <div className="px-1">
                      <div className="text-[9.5px] uppercase font-bold tracking-wider text-slate-400">Super Area</div>
                      <div className="text-xs font-bold text-slate-800">{p.areaSqft.toLocaleString('en-IN')} sqft</div>
                    </div>
                    <div className="px-1">
                      <div className="text-[9.5px] uppercase font-bold tracking-wider text-slate-400">Possession</div>
                      <div className="text-xs font-bold text-slate-800 truncate" title={p.possession}>
                        {p.possession.toLowerCase().includes('ready')
                          ? 'Ready to Move'
                          : (p.possession.match(/\((.*?)\)/)?.[1] || p.possession)}
                      </div>
                    </div>
                  </div>

                  {/* Key Highlights / USPs */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-[10.5px] font-medium text-slate-600 bg-slate-100/90 border border-slate-200/60 px-2 py-0.5 rounded-md flex items-center gap-1"
                      >
                        <span className="text-emerald-600 font-bold">✓</span> {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Mandatory Karnataka RERA Code */}
                  <div className="text-[10.5px] text-slate-600 mb-3 bg-emerald-50/70 border border-emerald-100 px-2.5 py-1 rounded-lg flex items-center justify-between">
                    <span className="font-bold text-emerald-800 text-[10px] uppercase tracking-wider">KA-RERA</span>
                    <span className="font-mono text-emerald-950 font-semibold text-[10px] truncate max-w-[200px]" title={p.kreraRegNo}>
                      {p.kreraRegNo}
                    </span>
                  </div>

                  {/* Action Toolbar */}
                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      href={`/properties/${p.slug}`}
                      className="flex-1 py-2.5 px-3 text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl transition text-center shadow-xs"
                    >
                      View Details
                    </Link>

                    <BookSiteVisitModal
                      propertyTitle={p.title}
                      propertyAddress={p.address}
                      kreraRegNo={p.kreraRegNo}
                      propertyId={p.id}
                      triggerLabel="Book Visit"
                      triggerClassName="flex-1 py-2.5 px-3 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 whitespace-nowrap"
                    />

                    <WhatsAppChatModal
                      propertyTitle={p.title}
                      kreraRegNo={p.kreraRegNo}
                      buttonVariant="icon"
                      buttonLabel="Chat on WhatsApp"
                      className="w-10 h-10 shrink-0 rounded-xl border border-emerald-500 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white transition flex items-center justify-center shadow-xs"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
