'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PropertyItem } from '@/lib/properties';
import { ShieldCheck, ChevronLeft, ChevronRight, PlayCircle, MessageCircle, MapPin } from 'lucide-react';

interface Props {
  slides: PropertyItem[];
}

export default function HeroCarousel({ slides }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  const active = slides[current];

  return (
    <div className="relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl text-white">
      {/* Background Banner Image with Gradient Overlay */}
      <div className="relative min-h-[500px] lg:min-h-[560px] flex items-center">
        <Image
          src={active.images[0] || 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80'}
          alt={active.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 transition-all duration-700 scale-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent"></div>

        {/* Content Box */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-16 max-w-2xl">
          {/* Builder & RERA Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/90 rounded-full border border-emerald-800">
              🏢 {active.developerName} · Verified Developer
            </span>
            <span className="px-2.5 py-1 text-[11px] font-mono text-slate-300 bg-slate-800/80 rounded-md border border-slate-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              K-RERA: {active.kreraRegNo}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            {active.title}
          </h2>

          {/* Locality & Specs */}
          <div className="flex items-center gap-2 text-sm text-slate-300 font-medium mb-2">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{active.address}</span>
          </div>
          <div className="text-sm font-semibold text-slate-200 mb-4">
            {active.bhk} BHK Luxury Residences · {active.areaSqft} sq ft Super Built-up
          </div>

          {/* Price Range & Launch Offer */}
          <div className="flex flex-wrap items-baseline gap-4 mb-4">
            <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">
              {active.priceLabel}
            </div>
            {active.heroOfferText && (
              <div className="text-xs font-bold text-amber-300 bg-amber-950/70 px-3 py-1 rounded-full border border-amber-800/60">
                ✦ {active.heroOfferText}
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/properties/${active.slug}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition"
            >
              View Property Dossier
            </Link>
            {active.videoUrl && (
              <a
                href={active.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition"
              >
                <PlayCircle className="w-4 h-4 text-emerald-400" />
                Video Walkthrough
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Nav Controls */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? 'w-8 bg-emerald-400' : 'bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

