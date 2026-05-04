import type { Metadata } from "next";

import { LINK, SITE } from "@/constants";

type CreateMetadataOptions = {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  noIndex?: boolean;
};

const createMetadata = (options: CreateMetadataOptions = {}): Metadata => {
  const {
    title,
    description = SITE.DESCRIPTION.SHORT,
    canonical,
    ogTitle,
    ogDescription,
    noIndex = false,
  } = options;

  const markdownHref = canonical
    ? `${canonical === "/" ? "/index" : canonical}.md`
    : undefined;

  return {
    ...(title && { title }),
    description,
    ...(canonical && {
      alternates: {
        canonical,
        ...(markdownHref && {
          types: {
            "text/markdown": markdownHref,
          },
        }),
      },
    }),
    openGraph: {
      title: ogTitle || title || SITE.NAME,
      description: ogDescription || description,
      url: canonical ? `${SITE.URL}${canonical}` : SITE.URL,
      type: "website",
    },
    twitter: {
      title: ogTitle || title || SITE.NAME,
      description: ogDescription || description,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
};

const baseMetadata: Metadata = {
  metadataBase: new URL(SITE.URL),
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/index.md",
    },
  },
  openGraph: {
    title: SITE.NAME,
    description: SITE.DESCRIPTION.SHORT,
    siteName: SITE.NAME,
    type: "website",
    locale: "en_US",
    url: SITE.URL,
    images: [
      {
        url: SITE.OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE.NAME} - Animated React Icons Library`,
      },
    ],
  },
  applicationName: SITE.NAME,
  appleWebApp: {
    title: SITE.NAME,
    statusBarStyle: "default",
    capable: true,
  },
  title: {
    default: `${SITE.NAME} | Free Animated React Icons Library`,
    template: `%s | ${SITE.NAME}`,
  },
  description: SITE.DESCRIPTION.LONG,
  keywords: [...SITE.KEYWORDS],
  authors: [{ name: SITE.AUTHOR.NAME, url: LINK.TWITTER }],
  creator: SITE.AUTHOR.NAME,
  publisher: SITE.AUTHOR.NAME,
  twitter: {
    card: "summary_large_image",
    title: `${SITE.NAME} | Free Animated React Icons`,
    description: SITE.DESCRIPTION.SHORT,
    creator: SITE.AUTHOR.TWITTER,
    site: SITE.AUTHOR.TWITTER,
    images: [
      {
        url: SITE.OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE.NAME} - Animated React Icons Library`,
      },
    ],
  },
  category: "technology",
};

export { baseMetadata, createMetadata };
