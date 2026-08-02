import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL of your website
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rizwansaddique.site';

  const routes = [
    '',
    '/blog',
    '/project',
    '/services',
    '/contact',
    '/custom-pages/services-detail',
    '/custom-pages/about-story',
    '/custom-pages/philosophy',
    '/custom-pages/faq-pricing',
    '/custom-pages/privacy-policy',
    '/custom-pages/terms-of-service',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
