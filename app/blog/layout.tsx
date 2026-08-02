import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Insights',
  description: 'Explore actionable insights, strategic guides, and industry trends on Google Ads, Meta Ads, SEO, CRO, and custom Shopify development by Rizwan Saeed.',
  keywords: [
    'Digital Marketing Blog',
    'Shopify Development Tutorials',
    'Google Ads Strategy',
    'Meta Ads Guide',
    'E-Commerce Scaling',
    'SEO Best Practices',
    'Conversion Rate Optimization',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rizwansaddique.site/blog',
    title: 'Blog & Insights | Rizwan Saeed',
    description: 'Explore actionable insights, strategic guides, and industry trends on Google Ads, Meta Ads, SEO, CRO, and custom Shopify development by Rizwan Saeed.',
    siteName: 'Rizwan Saeed Portfolio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Rizwan Saeed Blog & Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Insights | Rizwan Saeed',
    description: 'Explore actionable insights, strategic guides, and industry trends on Google Ads, Meta Ads, SEO, CRO, and custom Shopify development by Rizwan Saeed.',
    creator: '@rizwansaeed',
    images: ['https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200'],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
