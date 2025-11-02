import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { getIcons } from '@/actions/get-icons';
import { CliBlock } from '@/components/cli-block';
import { IconsList } from '@/components/list';
import { LINK } from '@/constants';

export default async function Home() {
  const icons = await getIcons();

  return (
    <div className="mt-8 flex items-center justify-center font-mono sm:mt-16">
      <div className="container">
        <Link
          href="/sponsorship"
          className="border-input bg-input/50 text-muted-foreground hover:text-foreground mt-3 flex w-fit items-center gap-2 rounded-2xl border px-4 py-1.5 text-xs leading-normal transition-colors duration-200 sm:hidden"
        >
          sponsorship here{' '}
          <ArrowUpRight
            className="mt-px size-3 shrink-0 leading-0"
            strokeWidth={2.5}
          />
        </Link>
        <a
          href="https://www.framer.com/marketplace/plugins/framericons/"
          target="_blank"
          className="border-input bg-input/50 text-muted-foreground hover:text-foreground mt-2 mb-4 flex w-fit items-center gap-2 rounded-2xl border px-4 py-1.5 text-xs leading-normal transition-colors duration-200"
        >
          <div className="w-2.5 shrink-0">
            <svg
              viewBox="0 0 256 384"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <path
                className="fill-foreground"
                d="M0 0h256v128H128L0 0Zm0 128h128l128 128H128v128L0 256V128Z"
              />
            </svg>
          </div>
          <p>Want to use icons in Framer?</p>
        </a>
        <h1 className="text-2xl text-balance sm:text-3xl">
          beautifully crafted animated icons
        </h1>
        <p className="text-muted-foreground mt-2 max-w-lg text-xs leading-relaxed text-pretty sm:mt-4 sm:text-sm">
          an open-source (
          <Link
            className="hover:text-foreground underline underline-offset-4 transition-colors duration-200"
            target="_blank"
            href={`${LINK.GITHUB}/blob/main/LICENSE`}
          >
            MIT License
          </Link>
          ) collection of smooth animated icons for your projects. feel free to
          use them, share your feedback, and let&apos;s make this library
          awesome together.
        </p>
        <p className="text-muted-foreground mt-4 text-xs sm:text-sm">
          built with{' '}
          <Link
            href={LINK.MOTION}
            className="hover:border-foreground/30 bg-muted text-muted-foreground inline-flex items-center gap-1 rounded border px-2 py-[2px] font-mono text-xs font-medium opacity-100 transition-colors duration-200"
          >
            <kbd>motion</kbd>
          </Link>{' '}
          and{' '}
          <Link
            href={LINK.LUCIDE}
            className="hover:border-foreground/30 bg-muted text-muted-foreground inline-flex items-center gap-1 rounded border px-2 py-[2px] font-mono text-xs font-medium opacity-100 transition-colors duration-200"
          >
            <kbd>lucide</kbd>
          </Link>
        </p>
        <CliBlock icons={icons} />
        <Suspense>
          <IconsList icons={icons} />
        </Suspense>
      </div>
    </div>
  );
}
