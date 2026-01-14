"use client";

import Fuse from "fuse.js";
import { useDeferredValue, useMemo, useRef, useState, useCallback, memo } from "react";
import type { Icon } from "@/actions/get-icons";

import { Card, CardActions, CardTitle } from "@/components/card";
import { CategoryFilter, CATEGORIES } from "@/components/category-filter";
import { IconCustomizerModal } from "@/components/icon-customizer-modal";
import { ICON_LIST } from "@/icons";
import { SearchInput } from "./search-input";

type Props = {
  icons: Icon[];
};

const ICON_MAP = new Map(ICON_LIST.map((item) => [item.name, item.icon]));

const IconItem = memo(({
  icon,
  Icon,
  onCustomizeClick,
}: {
  icon: Icon;
  Icon: React.ElementType | undefined;
  onCustomizeClick: () => void;
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
      <CardActions {...icon} onCustomizeClick={onCustomizeClick} />
    </Card>
  );
});

IconItem.displayName = "IconItem";

const IconsList = ({ icons }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<{ name: string; component: React.ElementType } | null>(null);
  const deferredSearchValue = useDeferredValue(searchValue);

  const handleCustomizeClick = useCallback((iconName: string, IconComponent: React.ElementType) => {
    setSelectedIcon({ name: iconName, component: IconComponent });
    setCustomizerOpen(true);
  }, []);

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
    let result = icons;

    // Apply category filter
    if (selectedCategory !== "all") {
      const category = CATEGORIES.find((c) => c.id === selectedCategory);
      if (category) {
        result = result.filter((icon) =>
          icon.keywords.some((keyword) =>
            category.keywords.some((catKeyword) =>
              keyword.toLowerCase().includes(catKeyword.toLowerCase())
            )
          )
        );
      }
    }

    // Apply search filter
    if (deferredSearchValue.trim()) {
      const searchResults = fuse.search(deferredSearchValue);
      const searchedIcons = searchResults.map((r) => r.item);
      result = result.filter((icon) =>
        searchedIcons.some((si) => si.name === icon.name)
      );
    }

    return result;
  }, [icons, selectedCategory, deferredSearchValue, fuse]);

  return (
    <div className="mb-20 w-full">
      <div className="flex items-center justify-between px-4 pb-2">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categoryOpen={categoryOpen}
          setCategoryOpen={setCategoryOpen}
        />
        <SearchInput
          searchOpen={searchOpen}
          searchValue={searchValue}
          setSearchOpen={setSearchOpen}
          setSearchValue={setSearchValue}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[3px]">
        {filteredIcons.length === 0 && (
          <div className="col-span-full pt-10 text-center text-neutral-500 text-sm">
            No icons found
          </div>
        )}
        {filteredIcons.map((icon) => {
          const IconComponent = ICON_MAP.get(icon.name);
          return IconComponent ? (
            <IconItem
              Icon={IconComponent}
              icon={icon}
              key={icon.name}
              onCustomizeClick={() => handleCustomizeClick(icon.name, IconComponent)}
            />
          ) : null;
        })}
      </div>

      {selectedIcon && (
        <IconCustomizerModal
          isOpen={customizerOpen}
          onClose={() => setCustomizerOpen(false)}
          iconName={selectedIcon.name}
          IconComponent={selectedIcon.component}
        />
      )}
    </div>
  );
};

export { IconsList };
