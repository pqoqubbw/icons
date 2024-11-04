import React from 'react';
import Link from 'next/link';
import { LINK } from '@/constants';
import { getIcons } from '@/actions/get-icons';
import { IconsList } from '@/components/list';

export default async function Home() {
  const icons = await getIcons();

  return (
    <div className="font-mono flex items-center justify-center sm:mt-16 mt-8">
      <div className="container">
        <h1 className="sm:text-3xl text-2xl mt-3 text-balance">
          beautifully crafted animated icons
        </h1>
        <p className="sm:text-sm text-xs leading-relaxed sm:mt-4 mt-2 text-muted-foreground max-w-lg text-pretty">
          an open-source (
          <Link
            className="underline underline-offset-4 transition-colors duration-200 hover:text-foreground"
            target="_blank"
            href={`${LINK.GITHUB}/blob/main/LICENSE`}
          >
            MIT License
          </Link>
          ) collection of smooth animated icons for your projects. feel free to
          use them, share your feedback, and let&apos;s make this library
          awesome together.
        </p>
        <p className="text-muted-foreground sm:text-sm text-xs mt-4">
          built with{' '}
          <Link
            href={LINK.FRAMER_MOTION}
            className="inline-flex transition-colors duration-200 hover:border-foreground/30 items-center gap-1 rounded border bg-muted px-2 py-[2px] font-mono text-xs font-medium text-muted-foreground opacity-100"
          >
            <kbd>framer-motion</kbd>
          </Link>{' '}
          and{' '}
          <Link
            href={LINK.LUCIDE}
            className="inline-flex transition-colors duration-200 hover:border-foreground/30 items-center gap-1 rounded border bg-muted px-2 py-[2px] font-mono text-xs font-medium text-muted-foreground opacity-100"
          >
            <kbd>lucide</kbd>
          </Link>
        </p>
        <IconsList icons={icons} />
      </div>
    </div>
  );
}
