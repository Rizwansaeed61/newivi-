import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies',
  description: 'Explore real-world case studies, custom Shopify e-commerce store developments, and high-ROI digital marketing performance campaigns by Rizwan Saeed.',
  keywords: [
    'Portfolio',
    'E-Commerce Case Studies',
    'Shopify Development Projects',
    'Google Ads Campaigns',
    'Meta Ads Portfolio',
    'UI/UX Case Studies',
    'Rizwan Saeed Work',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rizwansaeed.com/project',
    title: 'Portfolio & Case Studies | Rizwan Saeed',
    description: 'Explore real-world case studies, custom Shopify e-commerce store developments, and high-ROI digital marketing performance campaigns by Rizwan Saeed.',
    siteName: 'Rizwan Saeed Portfolio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Rizwan Saeed Portfolio & Case Studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio & Case Studies | Rizwan Saeed',
    description: 'Explore real-world case studies, custom Shopify e-commerce store developments, and high-ROI digital marketing performance campaigns by Rizwan Saeed.',
    creator: '@rizwansaeed',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'],
  },
};

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
