import { getIcons } from "@/actions/get-icons";
import { LINK, SITE } from "@/constants";

const WebsiteJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.NAME,
    url: SITE.URL,
    description: SITE.DESCRIPTION.LONG,
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.URL}?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: ignore
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const SoftwareSourceCodeJsonLd = () => {
  const icons = getIcons();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: SITE.NAME,
    description: SITE.DESCRIPTION.LONG,
    url: SITE.URL,
    codeRepository: LINK.GITHUB,
    programmingLanguage: ["TypeScript", "React", "JavaScript"],
    runtimePlatform: "Node.js",
    license: LINK.LICENSE,
    author: {
      "@type": "Person",
      name: SITE.AUTHOR.NAME,
      url: LINK.TWITTER,
    },
    maintainer: {
      "@type": "Person",
      name: SITE.AUTHOR.NAME,
      url: LINK.TWITTER,
    },
    keywords: SITE.KEYWORDS,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    isAccessibleForFree: true,
    dateModified: new Date().toISOString().split("T")[0],
    numberOfItems: icons.length,
  };

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: ignore
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const OrganizationJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.NAME,
    url: SITE.URL,
    logo: `${SITE.URL}${SITE.OG_IMAGE}`,
    sameAs: [LINK.GITHUB, LINK.TWITTER],
    founder: {
      "@type": "Person",
      name: SITE.AUTHOR.NAME,
      url: LINK.TWITTER,
    },
  };

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: ignore
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const BreadcrumbJsonLd = ({
  items,
}: {
  items: { name: string; url: string }[];
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: ignore
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const FAQJsonLd = () => {
  const faqs = [
    {
      question: "What is lucide-animated?",
      answer: `${SITE.NAME} is a free, open-source library of 350+ beautifully crafted animated React icons. Built with Motion library and based on Lucide icons.`,
    },
    {
      question: "How do I install lucide-animated icons?",
      answer: `You can install icons using npx shadcn@latest add "${SITE.URL}/r/{icon-name}.json". Replace {icon-name} with the desired icon name in kebab-case.`,
    },
    {
      question: "Is lucide-animated free to use?",
      answer: `Yes! ${SITE.NAME} is completely free and open-source under the MIT license. You can use it for personal and commercial projects.`,
    },
    {
      question: "What technologies are used in lucide-animated?",
      answer:
        "lucide-animated icons are React components written in TypeScript. Animations are powered by Motion (formerly Framer Motion), and the icons are based on Lucide.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: ignore
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const JsonLdScripts = () => {
  return (
    <>
      <WebsiteJsonLd />
      <SoftwareSourceCodeJsonLd />
      <OrganizationJsonLd />
      <FAQJsonLd />
    </>
  );
};

export {
  JsonLdScripts,
  WebsiteJsonLd,
  SoftwareSourceCodeJsonLd,
  OrganizationJsonLd,
  BreadcrumbJsonLd,
  FAQJsonLd,
};
