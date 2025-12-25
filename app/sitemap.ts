import { type MetadataRoute } from 'next';

import { SITE } from '@/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [{ url: SITE.URL, lastModified: new Date() }];
}
