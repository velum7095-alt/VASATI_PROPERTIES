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
      <head>
        {/* Suppress unhandled errors originating from external browser extensions (e.g. chrome-extension:// embed_script.js) from triggering Next.js dev overlay */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function isExtensionError(event) {
                  try {
                    var str = (event && (event.filename || (event.error && event.error.stack) || event.message || '')) + '';
                    var reason = event && event.reason;
                    var reasonStr = (reason && (reason.stack || reason.message || reason)) + '';
                    return (
                      str.indexOf('chrome-extension://') !== -1 ||
                      str.indexOf('moz-extension://') !== -1 ||
                      str.indexOf('embed_script.js') !== -1 ||
                      str.indexOf('load_embeds.js') !== -1 ||
                      reasonStr.indexOf('chrome-extension://') !== -1 ||
                      reasonStr.indexOf('moz-extension://') !== -1 ||
                      reasonStr.indexOf('embed_script.js') !== -1 ||
                      reasonStr.indexOf('load_embeds.js') !== -1
                    );
                  } catch (e) {
                    return false;
                  }
                }

                window.addEventListener('error', function(event) {
                  if (isExtensionError(event)) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                  }
                }, true);

                window.addEventListener('unhandledrejection', function(event) {
                  if (isExtensionError(event)) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                  }
                }, true);
              })();
            `,
          }}
        />
      </head>
      <body className={`${jakarta.className} min-h-screen bg-slate-50 text-slate-900 antialiased`}>
        <PrivacyAnalytics />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
