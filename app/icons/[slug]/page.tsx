import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';

import { CliBlock } from '@/components/cli-block';
import { LINK, SITE } from '@/constants';
import { ICON_LIST } from '@/icons';
import { kebabToPascalCase } from '@/lib/kebab-to-pascal';
import { BreadcrumbJsonLd } from '@/seo/json-ld';
import { baseMetadata } from '@/seo/metadata';
import { IconCard } from './icon-card';
import { SimilarIcons } from './similar-icons';

type Props = {
  params: Promise<{ slug: string }>;
};

const getIconBySlug = (slug: string) => {
  return ICON_LIST.find((icon) => icon.name === slug);
};

export const generateStaticParams = () => {
  return ICON_LIST.map((icon) => ({
    slug: icon.name,
  }));
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const icon = getIconBySlug(slug);

  if (!icon) {
    return {
      title: 'Icon Not Found',
    };
  }

  const pascalName = kebabToPascalCase(slug);
  const title = `${pascalName} - Animated React Icon`;
  const description = `Free animated ${icon.name} icon for React. Smooth Motion-powered animation, copy-paste ready. Keywords: ${icon.keywords.slice(0, 5).join(', ')}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/icons/${slug}`,
    },
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${pascalName} | ${SITE.NAME}`,
      description,
      url: `${SITE.URL}/icons/${slug}`,
      type: 'website',
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${pascalName} | ${SITE.NAME}`,
      description,
    },
    keywords: [
      ...icon.keywords,
      'animated icon',
      'react icon',
      'motion icon',
      `${icon.name} animation`,
      `${icon.name} react`,
    ],
  };
};

const IconJsonLd = ({ icon }: { icon: (typeof ICON_LIST)[number] }) => {
  const pascalName = kebabToPascalCase(icon.name);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: pascalName,
    description: `Animated ${icon.name} icon component for React`,
    codeRepository: LINK.GITHUB,
    programmingLanguage: ['TypeScript', 'React'],
    license: LINK.LICENSE,
    isPartOf: {
      '@type': 'SoftwareSourceCode',
      name: SITE.NAME,
      url: SITE.URL,
    },
    keywords: icon.keywords.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

const IconPage = async ({ params }: Props) => {
  const { slug } = await params;
  const icon = getIconBySlug(slug);

  if (!icon) {
    notFound();
  }

  const pascalName = kebabToPascalCase(slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE.URL },
          { name: 'Icons', url: `${SITE.URL}/icons` },
          { name: pascalName, url: `${SITE.URL}/icons/${slug}` },
        ]}
      />
      <IconJsonLd icon={icon} />

      <section className="mx-auto mt-12 flex w-full max-w-[1292px] flex-col items-start px-4 min-[880px]:my-[60px]">
        <Link
          href="/"
          className="text-secondary hover:text-primary focus-visible:outline-primary mb-8 flex items-center gap-2 font-sans text-sm transition-[color] duration-100 focus-visible:outline-1 focus-visible:outline-offset-2"
        >
          <ArrowLeftIcon className="size-4" />
          Back to all icons
        </Link>

        <div className="flex w-full flex-col gap-6 min-[880px]:flex-row min-[880px]:items-center">
          <IconCard icon={icon} />

          <div className="flex h-full flex-col gap-1">
            <h1 className="font-sans text-[28px] min-[640px]:text-[36px]">
              {pascalName}
            </h1>
            <p className="text-secondary font-mono text-sm">
              Animated {icon.name.replace(/-/g, ' ')} icon for React
            </p>
            <CliBlock
              staticIconName={slug}
              className="mt-7 hidden px-0 min-[880px]:flex"
            />
          </div>
        </div>

        <CliBlock
          staticIconName={slug}
          className="mt-8 flex px-0 min-[880px]:hidden"
        />

        <div className="mt-12">
          <h2 className="mb-3 font-sans text-xl">Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {icon.keywords.map((keyword, index) => (
              <span
                key={`${keyword}-${index}`}
                className="text-secondary supports-[corner-shape:squircle]:corner-squircle rounded-[12px] bg-neutral-200 px-3 py-1 font-mono text-sm supports-[corner-shape:squircle]:rounded-[20px] dark:bg-[#262626]"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <SimilarIcons currentIcon={icon} />
      </section>
    </>
  );
};

export default IconPage;
