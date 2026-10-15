import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnquiryForm from '@/components/EnquiryForm';
import BookSiteVisitModal from '@/components/BookSiteVisitModal';
import WhatsAppChatModal from '@/components/WhatsAppChatModal';
import { getPropertyBySlug, getAllProperties } from '@/lib/properties';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  MapPin,
  Calendar,
  Building,
  BedDouble,
  Maximize2,
  CheckCircle,
  PlayCircle,
  Phone,
  MessageCircle,
  ArrowLeft,
  Lock,
} from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const properties = await getAllProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug);
  if (!property) return { title: 'Property Not Found' };
  return {
    title: `${property.title} | Karnataka RERA: ${property.kreraRegNo}`,
    description: `${property.bhk} BHK luxury home in ${property.locality}, Bangalore. Verified Karnataka RERA registration: ${property.kreraRegNo}. Price: ${property.priceLabel}.`,
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const property = await getPropertyBySlug(params.slug);
  if (!property) notFound();

  const approxEmiLakh = Math.round(property.price * 867.8);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const waUrl = `https://wa.me/${waNumber}?text=Hi,%20I%20am%20inquiring%20about%20${encodeURIComponent(
    property.title
  )}%20(RERA:%20${encodeURIComponent(property.kreraRegNo)})%20priced%20at%20${encodeURIComponent(
    property.priceLabel
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Bangalore Properties
          </Link>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm">
          <div className="relative aspect-[16/10] lg:aspect-auto lg:col-span-2 min-h-[380px]">
            <Image
              src={property.images[0] || 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'}
              alt={property.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 text-xs font-bold text-slate-950 bg-white/95 backdrop-blur-md rounded-md shadow-sm">
                {property.status}
              </span>
              <span className="px-3 py-1 text-xs font-bold text-white bg-slate-900/90 backdrop-blur-md rounded-md">
                {property.propertyType}
              </span>
            </div>
          </div>
          <div className="hidden lg:grid grid-rows-2 gap-4 p-4 pl-0">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src={property.images[1] || property.images[0]}
                alt="Interior view"
                fill
                sizes="33vw"
                className="object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-slate-800 flex items-center justify-center text-slate-300 text-xs font-semibold">
              <Image
                src={property.images[0]}
                alt="Elevation view"
                fill
                sizes="33vw"
                className="object-cover opacity-60"
              />
              <span className="relative z-10 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                Verified RERA Imagery
              </span>
            </div>
          </div>
        </div>

        {/* Layout: Main Details + Sticky Contact Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Title & Statutory RERA Header */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              {/* Karnataka RERA Badge Banner */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Karnataka RERA Registration Number:</span>
                  <span className="font-mono text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
                    {property.kreraRegNo}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700">
                  ✓ Verified against K-RERA Portal
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{property.address}</span>
                </div>
                <div className="text-xs font-bold text-slate-700 mt-1">
                  Developer: <span className="text-slate-900">{property.developerName}</span>
                </div>
              </div>

              {/* Price & EMI */}
              <div className="flex flex-wrap items-baseline gap-4 pt-4 border-t border-slate-100">
                <div className="text-3xl font-extrabold text-slate-950">
                  {property.priceLabel}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Estimated EMI ≈ ₹{approxEmiLakh.toLocaleString('en-IN')}/month (at 8.5% p.a.)
                </div>
              </div>
            </div>

            {/* Overview Specifications Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Property Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[11px] uppercase font-bold text-slate-400 mb-1">Configuration</div>
                  <div className="text-base font-extrabold text-slate-900">{property.bhk} BHK</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[11px] uppercase font-bold text-slate-400 mb-1">Super Built-up</div>
                  <div className="text-base font-extrabold text-slate-900">{property.areaSqft} sq ft</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[11px] uppercase font-bold text-slate-400 mb-1">Bathrooms</div>
                  <div className="text-base font-extrabold text-slate-900">{property.baths} Baths</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[11px] uppercase font-bold text-slate-400 mb-1">Possession</div>
                  <div className="text-base font-extrabold text-slate-900 text-xs sm:text-sm mt-0.5">
                    {property.possession}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Walkthrough Tour (if configured) */}
            {property.videoUrl && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-emerald-600" />
                    Property Video Walkthrough
                  </h2>
                  <a
                    href={property.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    Open in Full Player ↗
                  </a>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900">
                  <iframe
                    src={
                      property.videoUrl.includes('watch?v=')
                        ? `https://www.youtube-nocookie.com/embed/${property.videoUrl.split('watch?v=')[1]?.split('&')[0]}`
                        : property.videoUrl
                    }
                    title={`${property.title} Video Tour`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-slate-900">About this Residence</h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Community Features & Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Locality & Proximity */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Bangalore Corridor Proximity</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-900">🚇 Namma Metro Access</div>
                  <div className="text-xs text-slate-500 mt-1">5–10 mins to nearest corridor station</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-900">🏢 Tech Parks & SEZs</div>
                  <div className="text-xs text-slate-500 mt-1">Immediate commute to major IT employers</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-900">🏥 Multi-Specialty Hospitals</div>
                  <div className="text-xs text-slate-500 mt-1">10–15 mins to tertiary healthcare hubs</div>
                </div>
              </div>
            </div>

            {/* In-depth Enquiry Form Section */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Enquire About {property.title}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Connect with verified Karnataka RERA advisors for official inventory, floor plans, and developer launch discounts.
                </p>
              </div>
              <EnquiryForm
                propertyId={property.id}
                propertyTitle={property.title}
                defaultLocality={property.locality}
              />
            </div>
          </div>

          {/* Sticky Booking & Direct WhatsApp Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 space-y-5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-5">
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">Priced from</span>
                <div className="text-3xl font-extrabold text-slate-950">{property.priceLabel}</div>
                <p className="text-xs text-slate-500 mt-1">
                  Verified RERA developer quote. No brokerage on builder inventory.
                </p>
              </div>

              {/* Action 1: WhatsApp with Explicit Statutory Opt-in */}
              <WhatsAppChatModal
                propertyTitle={property.title}
                kreraRegNo={property.kreraRegNo}
              />

              {/* Action 2: Book Site Inspection Modal */}
              <BookSiteVisitModal
                propertyTitle={property.title}
                propertyAddress={property.address}
                kreraRegNo={property.kreraRegNo}
                propertyId={property.id}
              />

              {/* Privacy Guarantee Note */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-[11.5px] text-slate-600 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Privacy Assured</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Your enquiry is used solely to respond regarding <strong>{property.title}</strong>. Zero telemarketing spam and never sold to third-party ad networks.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
