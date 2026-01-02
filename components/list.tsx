"use client";

import Fuse from "fuse.js";
import { useDeferredValue, useMemo, useRef, useState } from "react";
import type { Icon } from "@/actions/get-icons";

import { Card, CardActions, CardTitle } from "@/components/card";
import { ICON_LIST } from "@/icons";
import { SearchInput } from "./search-input";

type Props = {
  icons: Icon[];
};

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

const IconsList = ({ icons }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const deferredSearchValue = useDeferredValue(searchValue);

  const fuse = useMemo(
    () =>
      new Fuse(icons, {
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
    [icons]
  );

  const filteredIcons = useMemo(() => {
    if (!deferredSearchValue.trim()) return icons;
    return fuse.search(deferredSearchValue).map((result) => result.item);
  }, [fuse, icons, deferredSearchValue]);

  return (
    <div className="mb-20 w-full">
      <SearchInput
        searchOpen={searchOpen}
        searchValue={searchValue}
        setSearchOpen={setSearchOpen}
        setSearchValue={setSearchValue}
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[3px]">
        {filteredIcons.length === 0 && (
          <div className="col-span-full pt-10 text-center text-neutral-500 text-sm">
            No icons found
          </div>
        )}
        {filteredIcons.map((icon) => (
          <IconItem
            Icon={ICON_MAP.get(icon.name) ?? undefined}
            icon={icon}
            key={icon.name}
          />
        ))}
      </div>
    </div>
  );
};

export { IconsList };
