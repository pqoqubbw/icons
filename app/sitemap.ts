import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";

import { SITE } from "@/constants";
import { ICON_LIST } from "@/icons";

const buildSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  "use cache";
  cacheLife("days");

  const iconPages: MetadataRoute.Sitemap = ICON_LIST.map((icon) => ({
    url: `${SITE.URL}/icons/${icon.name}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE.URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.URL}/sponsorship`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...iconPages,
  ];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return await buildSitemap();
}
