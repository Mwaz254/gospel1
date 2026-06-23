import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: 'https://inhimdaily.org/sitemap.xml',
    host: 'https://inhimdaily.org',
  };
}
