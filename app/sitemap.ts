import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fakhridjamaris.my.id';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Note: Fragment URLs (#projects, #skills) are not recommended in sitemaps
    // Google treats them as the same page as the main URL
    // If you add separate pages in the future (e.g., /projects, /blog), add them here
  ];
}
