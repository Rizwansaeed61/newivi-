import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: {
    default: 'Luxury Agency & CMS Showcase',
    template: '%s | Luxury Agency'
  },
  description: 'Enterprise agency portfolio with high-performance client showcases and admin management CMS',
  keywords: ['Luxury Agency', 'Digital Agency', 'Portfolio', 'CMS', 'Web Design'],
  authors: [{ name: 'Agency Name' }],
  creator: 'Agency Name',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Luxury Agency & CMS Showcase',
    description: 'Enterprise agency portfolio with high-performance client showcases and admin management CMS',
    siteName: 'Luxury Agency',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Agency & CMS Showcase',
    description: 'Enterprise agency portfolio with high-performance client showcases and admin management CMS',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaOrgJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Luxury Agency',
    url: siteUrl,
    description: 'Enterprise agency portfolio with high-performance client showcases and admin management CMS.',
    image: `${siteUrl}/og-image.jpg`,
    sameAs: [
      'https://twitter.com/yourprofile',
      'https://linkedin.com/in/yourprofile'
    ]
  };

  return (
    <html lang="en">
      <head>
        <Script id="schema-org" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(schemaOrgJSONLD)}
        </Script>
      </head>
      <body className="bg-[#0B0907] text-[#F9F7F2] antialiased selection:bg-[#E59500] selection:text-[#15120E]">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
