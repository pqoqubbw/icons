'use client';

import { useOpenPanel } from '@openpanel/nextjs';
import { ExternalLinkIcon } from 'lucide-react';

import { ANALYTIC_EVENT } from './analytics';

const CommentAnimationsDevLinkClient = () => {
  const op = useOpenPanel();

  return (
    <a
      onClick={() => op.track(ANALYTIC_EVENT.COMMENT_ANIMATION_DEV_LINK)}
      href="https://animations.dev/"
      target="_blank"
      rel="external"
      tabIndex={0}
      className="hover:decoration-primary hover:text-primary focus-visible:outline-primary focus-visible:text-primary inline-block underline underline-offset-3 transition-[decoration-color,color] duration-100 focus-within:outline-offset-0 focus-visible:outline-1"
    >
      animations.dev
    </a>
  );
};

const CommentButtonClient = () => {
  const op = useOpenPanel();

  return (
    <a
      onClick={() => op.track(ANALYTIC_EVENT.COMMENT_BUTTON_CLICK)}
      href="https://animations.dev/"
      target="_blank"
      rel="external"
      tabIndex={0}
      className="bg-primary focus-visible:outline-primary supports-[corner-shape:squircle]:corner-squircle flex w-fit cursor-pointer items-center justify-center gap-1 rounded-[8px] px-[12px] py-[4px] font-sans text-sm text-white transition-[background-color] duration-100 hover:bg-[color-mix(in_oklab,var(--color-primary),black_10%)] focus-visible:outline-1 focus-visible:outline-offset-1 supports-[corner-shape:squircle]:rounded-[12px] max-[445px]:w-full"
    >
      Take the course
      <ExternalLinkIcon className="size-3" strokeWidth={2.5} />
    </a>
  );
};

export { CommentAnimationsDevLinkClient, CommentButtonClient };
