import React from 'react';
import { Card, CardActions, CardTitle } from '@/components/card';
import { importIcons } from '@/lib/icon-import';
import Link from 'next/link';
import { LINK } from '@/constants';

export default async function Home() {
  const icons = await importIcons();

  return (
    <div className="font-mono flex items-center justify-center sm:mt-16 mt-8">
      <div className="container">
        <h1 className="sm:text-3xl text-2xl mt-3 text-balance">
          beautifully crafted animated icons
        </h1>
        <p className="sm:text-sm text-xs sm:mt-4 mt-2 text-muted-foreground max-w-lg text-pretty">
          an open-source collection of smooth animated icons for your projects.
          feel free to use them, share your feedback, and let&apos;s make this
          library awesome together.
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
        <div className="grid sm:my-20 my-10 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] auto-rows-[minmax(150px,auto)] gap-3">
          {icons.map(({ Icon, ...icon }) => (
            <Card key={icon.title}>
              <Icon />
              <CardTitle>{icon.title}</CardTitle>
              <CardActions {...icon} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
