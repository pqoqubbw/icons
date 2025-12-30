'use client';

import type { Icon } from '@/actions/get-icons';
import { useDeferredValue, useMemo, useRef, useState } from 'react';
import Fuse from 'fuse.js';

import { Card, CardActions, CardTitle } from '@/components/card';
import { ICON_LIST } from '@/icons';
import { SearchInput } from './search-input';

type Props = {
  icons: Icon[];
};

const ICON_MAP = new Map(ICON_LIST.map((item) => [item.name, item.icon]));

const IconItem = ({ icon, Icon }: { icon: Icon; Icon: React.ElementType }) => {
  const animationRef = useRef<{
    startAnimation: () => void;
    stopAnimation: () => void;
  }>(null);

  return (
    <Card
      key={icon.name}
      animationRef={animationRef}
      onMouseEnter={() => animationRef.current?.startAnimation()}
      onMouseLeave={() => animationRef.current?.stopAnimation()}
      className="[contain-intrinsic-size:auto_180px] [content-visibility:auto]"
    >
      <Icon
        ref={animationRef}
        className="flex items-center justify-center [&>svg]:size-10 [&>svg]:text-neutral-800 dark:[&>svg]:text-neutral-100"
      />
      <CardTitle>{icon.name}</CardTitle>
      <CardActions {...icon} />
    </Card>
  );
};

const IconsList = ({ icons }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const deferredSearchValue = useDeferredValue(searchValue);

  const fuse = useMemo(
    () =>
      new Fuse(icons, {
        keys: [
          { name: 'name', weight: 3 },
          { name: 'keywords', weight: 2 },
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
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[3px]">
        {filteredIcons.length === 0 && (
          <div className="col-span-full pt-10 text-center text-sm text-neutral-500">
            No icons found
          </div>
        )}
        {filteredIcons.map((icon) => (
          <IconItem
            key={icon.name}
            icon={icon}
            Icon={ICON_MAP.get(icon.name)!}
          />
        ))}
      </div>
    </div>
  );
};

export { IconsList };
