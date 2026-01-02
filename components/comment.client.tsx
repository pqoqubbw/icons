"use client";

import { useOpenPanel } from "@openpanel/nextjs";
import { ExternalLinkIcon } from "lucide-react";

import { ANALYTIC_EVENT } from "./analytics";

const CommentAnimationsDevLinkClient = () => {
  const op = useOpenPanel();

  return (
    <a
      className="inline-block underline underline-offset-3 transition-[decoration-color,color] duration-100 focus-within:outline-offset-0 hover:text-primary hover:decoration-primary focus-visible:text-primary focus-visible:outline-1 focus-visible:outline-primary"
      href="https://animations.dev/"
      onClick={() => op.track(ANALYTIC_EVENT.COMMENT_ANIMATION_DEV_LINK)}
      rel="noopener external"
      tabIndex={0}
      target="_blank"
    >
      animations.dev
    </a>
  );
};

const CommentButtonClient = () => {
  const op = useOpenPanel();

  return (
    <a
      className="supports-[corner-shape:squircle]:corner-squircle flex w-fit cursor-pointer items-center justify-center gap-1 rounded-[8px] bg-primary px-[12px] py-[4px] font-sans text-sm text-white transition-[background-color] duration-100 hover:bg-[color-mix(in_oklab,var(--color-primary),black_10%)] focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-1 supports-[corner-shape:squircle]:rounded-[12px] max-[445px]:w-full"
      href="https://animations.dev/"
      onClick={() => op.track(ANALYTIC_EVENT.COMMENT_BUTTON_CLICK)}
      rel="noopener external"
      tabIndex={0}
      target="_blank"
    >
      Take the course
      <ExternalLinkIcon className="size-3" strokeWidth={2.5} />
    </a>
  );
};

export { CommentAnimationsDevLinkClient, CommentButtonClient };
