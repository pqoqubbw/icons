"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import type { Icon } from "@/actions/get-icons";

import { Card, CardTitle } from "@/components/card";
import { ICON_LIST } from "@/icons";

type Props = {
  currentIcon: Icon;
};

const ICON_MAP = new Map(ICON_LIST.map((item) => [item.name, item.icon]));

const SimilarIconItem = ({
  icon,
  Icon,
}: {
  icon: Icon;
  Icon: React.ElementType | undefined;
}) => {
  const animationRef = useRef<{
    startAnimation: () => void;
    stopAnimation: () => void;
  }>(null);

  if (!Icon) {
    return null;
  }

  return (
    <Link
      className="focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-2"
      href={`/icons/${icon.name}`}
    >
      <Card
        animationRef={animationRef}
        className="pb-[50px]"
        onMouseEnter={() => animationRef.current?.startAnimation()}
        onMouseLeave={() => animationRef.current?.stopAnimation()}
      >
        <Icon
          className="flex items-center justify-center [&>svg]:size-10 [&>svg]:text-neutral-800 dark:[&>svg]:text-neutral-100"
          ref={animationRef}
        />
        <CardTitle>{icon.name}</CardTitle>
      </Card>
    </Link>
  );
};

const SimilarIcons = ({ currentIcon }: Props) => {
  const similarIcons = useMemo(() => {
    const currentKeywords = new Set(currentIcon.keywords);

    const scored = ICON_LIST.filter((icon) => icon.name !== currentIcon.name)
      .map((icon) => {
        const sharedKeywords = icon.keywords.filter((kw) =>
          currentKeywords.has(kw)
        ).length;
        return { icon, score: sharedKeywords };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    return scored.map((item) => item.icon);
  }, [currentIcon]);

  if (similarIcons.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 w-full">
      <h2 className="mb-4 font-sans text-xl">Similar Icons</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[3px]">
        {similarIcons.map((icon) => (
          <SimilarIconItem
            Icon={ICON_MAP.get(icon.name) ?? undefined}
            icon={icon}
            key={icon.name}
          />
        ))}
      </div>
    </div>
  );
};

export { SimilarIcons };
