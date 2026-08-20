import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://erastack.cloud';
  const currentDate = new Date().toISOString();

  const routes = [
    '',
    '/pos',
    '/products',
    '/products/pos',
    '/downloads',
    '/ai-lab',
    '/projects',
    '/docs',
    '/about',
    '/releases',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' || route === '/pos' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/pos' ? 0.9 : 0.8,
  }));
}
