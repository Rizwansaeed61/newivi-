import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Pages & Resources',
  description: 'Specialized landing pages, tools, and digital resources designed and managed by Rizwan Saeed.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rizwansaddique.site/custom-pages',
    title: 'Custom Pages & Resources | Rizwan Saeed',
    description: 'Specialized landing pages, tools, and digital resources designed and managed by Rizwan Saeed.',
    siteName: 'Rizwan Saeed Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Pages & Resources | Rizwan Saeed',
    description: 'Specialized landing pages, tools, and digital resources designed and managed by Rizwan Saeed.',
    creator: '@rizwansaeed',
  },
};

export default function CustomPagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
