const SITE = {
  NAME: "lucide-animated",
  URL: "https://lucide-animated.com",
  OG_IMAGE: "/og.png",
  AUTHOR: {
    NAME: "pqoqubbw",
    TWITTER: "@pqoqubbw",
  },
  DESCRIPTION: {
    LONG: "Free open-source library of 350+ beautifully crafted animated React icons. Built with Motion and Lucide. Copy-paste ready, MIT licensed, fully customizable SVG icons with smooth animations.",
    SHORT:
      "Free animated React icons library with 350+ smooth Motion-powered icons based on Lucide. MIT licensed, copy-paste ready.",
  },
  KEYWORDS: [
    "animated icons",
    "react icons",
    "motion icons",
    "lucide icons",
    "svg icons",
    "animated svg",
    "react components",
    "icon library",
    "open source icons",
    "framer motion icons",
    "animated react components",
    "free icons",
    "MIT license icons",
    "copy paste icons",
    "tailwind icons",
    "nextjs icons",
  ],
} as const;

const LINK = {
  TWITTER: "https://x.com/pqoqubbw",
  GITHUB: "https://github.com/pqoqubbw/icons",
  LUCIDE: "https://lucide.dev",
  MOTION: "https://motion.dev",
  LICENSE: "https://github.com/pqoqubbw/icons/blob/main/LICENSE",
} as const;

const PACKAGE_MANAGER = {
  PNPM: "pnpm",
  NPM: "npm",
  YARN: "yarn",
  BUN: "bun",
} as const;

const STORAGE_KEY = "selectedPackageManager";

export { LINK, PACKAGE_MANAGER, SITE, STORAGE_KEY };
