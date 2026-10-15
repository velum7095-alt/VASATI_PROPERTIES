import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import CookieBanner from '@/components/CookieBanner';
import PrivacyAnalytics from '@/components/PrivacyAnalytics';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bangalore Verified Real Estate | Karnataka RERA Registered',
  description: 'Verified residential properties across Bangalore tech corridors. 100% compliant with Karnataka RERA and DPDP Act 2023.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jakarta.className} min-h-screen bg-slate-50 text-slate-900 antialiased`}>
        <PrivacyAnalytics />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}

