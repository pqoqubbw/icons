import { type MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [{ url: 'https://lucide-animated.com', lastModified: new Date() }];
}
