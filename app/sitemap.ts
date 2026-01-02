import type { MetadataRoute } from "next";

import { SITE } from "@/constants";
import { ICON_LIST } from "@/icons";

// biome-ignore lint/suspicious/useAwait: ignore
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
}
