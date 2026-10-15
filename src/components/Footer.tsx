import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-white/10 p-1 flex items-center justify-center border border-white/10">
                <Image
                  src="/logo.png"
                  alt="Vasati Properties Logo"
                  width={36}
                  height={36}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                VASATI<span className="text-blue-500">.</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Premier residential properties, luxury villas, and verified homes across Bengaluru’s top corridors.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="mailto:contact@vasatiproperties.com" className="hover:text-white transition">
                  contact@vasatiproperties.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>+91 6303420048</span>
              </div>
            </div>
          </div>

          {/* Col 2: Top Corridors */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Popular Locations
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/listings?locality=Whitefield" className="hover:text-white transition">
                  Whitefield & ITPL
                </Link>
              </li>
              <li>
                <Link href="/listings?locality=Sarjapur+Road" className="hover:text-white transition">
                  Sarjapur Road
                </Link>
              </li>
              <li>
                <Link href="/listings?locality=Hebbal" className="hover:text-white transition">
                  Hebbal & North Bangalore
                </Link>
              </li>
              <li>
                <Link href="/listings?locality=Electronic+City" className="hover:text-white transition">
                  Electronic City
                </Link>
              </li>
              <li>
                <Link href="/listings?locality=HSR+Layout" className="hover:text-white transition">
                  HSR Layout & Koramangala
                </Link>
              </li>
              <li>
                <Link href="/listings?locality=Devanahalli" className="hover:text-white transition">
                  Devanahalli & Airport Road
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/listings" className="hover:text-white transition">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Clean Copyright Line */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Vasati Properties. All rights reserved.</p>
          <p className="text-[11px] text-slate-400">100% Karnataka RERA Verified Listings</p>
        </div>
      </div>
    </footer>
  );
}
