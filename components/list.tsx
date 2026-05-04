"use client";

import Fuse from "fuse.js";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import type { Icon } from "@/actions/get-icons";

import { Card, CardActions, CardTitle } from "@/components/card";
import { ICON_LIST } from "@/icons";
import { SearchInput } from "./search-input";

const INITIAL_VISIBLE = 18;
const CHUNK_SIZE = 50;

const ALL_ICONS: Icon[] = ICON_LIST.map(({ name, keywords }) => ({
  name,
  keywords,
}));
const ICON_MAP = new Map(ICON_LIST.map((item) => [item.name, item.icon]));

const IconItem = ({
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
    <Card
      animationRef={animationRef}
      className="[contain-intrinsic-size:auto_180px] [content-visibility:auto]"
      key={icon.name}
      onMouseEnter={() => animationRef.current?.startAnimation()}
      onMouseLeave={() => animationRef.current?.stopAnimation()}
    >
      <Icon
        className="flex items-center justify-center [&>svg]:size-10 [&>svg]:text-neutral-800 dark:[&>svg]:text-neutral-100"
        ref={animationRef}
      />
      <CardTitle>{icon.name}</CardTitle>
      <CardActions {...icon} />
    </Card>
  );
};

const IconsList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const deferredSearchValue = useDeferredValue(searchValue);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const fuse = useMemo(
    () =>
      new Fuse(ALL_ICONS, {
        keys: [
          { name: "name", weight: 3 },
          { name: "keywords", weight: 2 },
        ],
        threshold: 0.3,
        ignoreLocation: true,
        findAllMatches: true,
        isCaseSensitive: false,
        minMatchCharLength: 2,
      }),
    []
  );

  const trimmedSearch = deferredSearchValue.trim();
  const isSearching = trimmedSearch.length > 0;

  const filteredIcons = useMemo(() => {
    if (!isSearching) return ALL_ICONS;
    return fuse.search(trimmedSearch).map((result) => result.item);
  }, [fuse, isSearching, trimmedSearch]);

  const visibleIcons = isSearching
    ? filteredIcons
    : filteredIcons.slice(0, visibleCount);

  const hasMore = !isSearching && visibleCount < filteredIcons.length;

  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((current) =>
            Math.min(current + CHUNK_SIZE, filteredIcons.length)
          );
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, filteredIcons.length]);

  return (
    <div className="mb-20 w-full">
      <SearchInput
        searchOpen={searchOpen}
        searchValue={searchValue}
        setSearchOpen={setSearchOpen}
        setSearchValue={setSearchValue}
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[3px]">
        {visibleIcons.length === 0 && (
          <div className="col-span-full pt-10 text-center text-neutral-500 text-sm">
            No icons found
          </div>
        )}
        {visibleIcons.map((icon) => (
          <IconItem
            Icon={ICON_MAP.get(icon.name) ?? undefined}
            icon={icon}
            key={icon.name}
          />
        ))}
      </div>
      {hasMore && <div aria-hidden className="h-1 w-full" ref={sentinelRef} />}
    </div>
  );
};

export { IconsList };
