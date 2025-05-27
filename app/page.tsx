import React, { Suspense } from 'react';
import Link from 'next/link';
import { LINK } from '@/constants';
import { getIcons } from '@/actions/get-icons';
import { IconsList } from '@/components/list';
import { CliBlock } from '@/components/cli-block';
import { ArrowUpRight } from 'lucide-react';

export default async function Home() {
  const icons = await getIcons();

  return (
    <div className="font-mono flex items-center justify-center sm:mt-16 mt-8">
      <div className="container">
        <Link
          href="/sponsorship"
          className="text-xs mt-3 sm:hidden flex leading-normal items-center w-fit gap-2 border border-input rounded-2xl bg-input/50 px-4 py-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          sponsorship here{' '}
          <ArrowUpRight
            className="size-3 leading-0 mt-[1px] shrink-0"
            strokeWidth={2.5}
          />
        </Link>
        <a
          href="https://www.framer.com/marketplace/plugins/framericons/"
          target="_blank"
          className="text-xs mt-2 flex leading-normal items-center w-fit gap-2 border border-input rounded-2xl bg-input/50 px-4 mb-4 py-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
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
        <h1 className="sm:text-3xl text-2xl text-balance">
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
            href={LINK.MOTION}
            className="inline-flex transition-colors duration-200 hover:border-foreground/30 items-center gap-1 rounded border bg-muted px-2 py-[2px] font-mono text-xs font-medium text-muted-foreground opacity-100"
          >
            <kbd>motion</kbd>
          </Link>{' '}
          and{' '}
          <Link
            href={LINK.LUCIDE}
            className="inline-flex transition-colors duration-200 hover:border-foreground/30 items-center gap-1 rounded border bg-muted px-2 py-[2px] font-mono text-xs font-medium text-muted-foreground opacity-100"
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
