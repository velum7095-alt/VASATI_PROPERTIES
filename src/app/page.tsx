import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchHero99 from '@/components/SearchHero99';
import HeroCarousel from '@/components/HeroCarousel';
import ListingsFilterGrid from '@/components/ListingsFilterGrid';
import { getAllProperties, getHeroSlides } from '@/lib/properties';
import { ShieldCheck, MapPin, Building, Lock, Sparkles, CheckCircle2, ArrowRight, IndianRupee, Layers, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  const [properties, slides] = await Promise.all([
    getAllProperties(),
    getHeroSlides(),
  ]);

  const under80Count = properties.filter((p) => p.price < 80).length;
  const mid80to150Count = properties.filter((p) => p.price >= 80 && p.price <= 150).length;
  const prime150to300Count = properties.filter((p) => p.price > 150 && p.price <= 300).length;
  const luxury300PlusCount = properties.filter((p) => p.price > 300).length;

  const budgetCategories = [
    {
      title: 'Under ₹80 Lakh',
      desc: 'Affordable & compact 1-2 BHK apartments in high-growth corridors.',
      tag: 'Starter Homes',
      budget: '80',
      icon: '🏡',
      count: under80Count > 0 ? `${under80Count} Project${under80Count === 1 ? '' : 's'}` : 'Browse Collection',
    },
    {
      title: '₹80 Lakh - ₹1.50 Cr',
      desc: 'Prime 2 & 3 BHK flats near Whitefield, Sarjapur & Electronic City IT hubs.',
      tag: 'Tech Corridor Favorites',
      budget: '150',
      icon: '🏢',
      count: mid80to150Count > 0 ? `${mid80to150Count} Project${mid80to150Count === 1 ? '' : 's'}` : 'Browse Collection',
    },
    {
      title: '₹1.50 Cr - ₹3.00 Cr',
      desc: 'Premium gated communities with 80% open greens & luxury clubhouses.',
      tag: 'Executive Living',
      budget: '300',
      icon: '✨',
      count: prime150to300Count > 0 ? `${prime150to300Count} Project${prime150to300Count === 1 ? '' : 's'}` : 'Browse Collection',
    },
    {
      title: '₹3.00 Cr & Above',
      desc: 'Ultra-luxury penthouses and independent villas in North & East Bangalore.',
      tag: 'Luxury & Villas',
      budget: '500',
      icon: '🏰',
      count: luxury300PlusCount > 0 ? `${luxury300PlusCount} Project${luxury300PlusCount === 1 ? '' : 's'}` : 'Browse Collection',
    },
  ];

  const corridorCards = [
    {
      name: 'East Bengaluru (IT Corridor)',
      localities: 'Whitefield, Marathahalli, Varthur, Panathur',
      desc: 'Home to ITPL, Outer Ring Road tech hubs, and Purple Line Metro extension.',
      slug: 'Whitefield',
      highlight: 'High Rental Yield · Ready Metro',
    },
    {
      name: 'South Bengaluru (Residential Belt)',
      localities: 'Sarjapur Road, Electronic City, HSR, Koramangala',
      desc: 'Vibrant corridor with top international schools and direct Wipro / Infosys campus access.',
      slug: 'Sarjapur+Road',
      highlight: 'Top Schools · Direct ORR Access',
    },
    {
      name: 'North Bengaluru (Airport Corridor)',
      localities: 'Hebbal, Yelahanka, Jakkur, Devanahalli',
      desc: 'Rapidly appreciating belt along Bellary Road with proximity to KIADB Aerospace SEZ.',
      slug: 'Hebbal',
      highlight: 'Express Airport Route · SEZ Hub',
    },
    {
      name: 'South-West (Green Corridor)',
      localities: 'Kanakapura Road, Bannerghatta, JP Nagar',
      desc: 'Serene green belt with Green Line Metro connectivity, NICE Road access, and scenic living.',
      slug: 'Kanakapura+Road',
      highlight: 'Metro Connected · Green Living',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 space-y-12 sm:space-y-16 py-6 sm:py-8">
        {/* 1. 99acres Signature Hero Search */}
        <SearchHero99 />

        {/* 2. 99acres Trust & Regulatory Strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">100% Karnataka RERA</div>
                <div className="text-xs text-slate-500">Zero unverified listings · Official KA-RERA numbers</div>
              </div>
            </div>

            <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Bangalore Exclusive</div>
                <div className="text-xs text-slate-500">Hyper-focused on Bengaluru tech employment belts</div>
              </div>
            </div>

            <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">DPDP Act 2023 Protected</div>
                <div className="text-xs text-slate-500">AES-256 encrypted leads · No broker spam calls</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Featured Builder Showcase (Hero Carousel) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Curated High-Rise & Villa Developments
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Featured Projects in Bengaluru
              </h2>
            </div>
            <Link
              href="/listings"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              View All Featured →
            </Link>
          </div>
          <HeroCarousel slides={slides} />
        </section>

        {/* 4. Explore by Budget (99acres signature category cards) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Personalized Budget Filters
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Explore Bangalore Homes by Budget
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Find verified options tailored to your purchase plan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {budgetCategories.map((cat) => (
              <Link
                key={cat.title}
                href={`/listings?budget=${cat.budget}`}
                className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {cat.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>{cat.count}</span>
                  <span className="group-hover:translate-x-1 transition-transform">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Main Verified Listings Grid */}
        <section id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Live Inventory
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Verified Bengaluru Properties
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Filter by IT corridor, budget, BHK layout, or property type.
              </p>
            </div>
          </div>

          <ListingsFilterGrid initialProperties={properties} />
        </section>

        {/* 6. Top Bengaluru Corridors (Micro-Market Guide) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Micro-Market Geography
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Top Bengaluru Real Estate Corridors
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Detailed connectivity, infrastructure, and investment trends across Karnataka&apos;s capital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {corridorCards.map((c) => (
              <div
                key={c.name}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-slate-900">{c.name}</h3>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {c.highlight}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-blue-600 mb-2">
                    {c.localities}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {c.desc}
                  </p>
                </div>
                <Link
                  href={`/listings?locality=${c.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 pt-3 border-t border-slate-100"
                >
                  <span>Explore Corridor Properties</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Why Vasati — 99acres Trust Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 rounded-full border border-emerald-800">
                Verified Real Estate Advisory
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Zero Spam Calls. 100% RERA Verified. Complete Privacy.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Traditional portals often share your phone number with dozens of telemarketers. At Vasati, we protect your contact details, never sell data to third-party ad brokers, and connect you exclusively with verified project advisors.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/listings"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Explore Verified Properties
                </Link>
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
                >
                  Read Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
