'use client';

import type { Icon } from '@/actions/get-icons';
import { Suspense, useMemo, useRef } from 'react';
import Fuse from 'fuse.js';
import { useQueryState } from 'nuqs';

import { Card, CardActions, CardTitle } from '@/components/card';
import { ICON_LIST } from '@/icons';

type Props = {
  icons: Icon[];
};

const IconItem = ({ icon }: { icon: Icon }) => {
  const animationRef = useRef<{
    startAnimation: () => void;
    stopAnimation: () => void;
  }>(null);

  const IconComponent = ICON_LIST.find(({ name }) => name === icon.name)!.icon;

  return (
    <Card
      key={icon.name}
      animationRef={animationRef}
      onMouseEnter={() => animationRef.current?.startAnimation()}
      onMouseLeave={() => animationRef.current?.stopAnimation()}
    >
      <IconComponent
        ref={animationRef}
        className="flex items-center justify-center [&>svg]:size-10 [&>svg]:text-neutral-800 dark:[&>svg]:text-neutral-100"
      />
      <CardTitle>{icon.name}</CardTitle>
      <CardActions {...icon} />
    </Card>
  );
};

const IconsListContent = ({ icons }: Props) => {
  const [query] = useQueryState('q');

  const filteredIcons = useMemo(() => {
    if (!query) return icons;

    const fuse = new Fuse(icons, {
      keys: ['name', 'keywords'],
      threshold: 0.2,
    });

    return fuse.search(query).map((result) => result.item);
  }, [query, icons]);

  return (
    <div className="mt-[40px] mb-20 w-full">
      {filteredIcons.length === 0 ? (
        <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
          <p className="text-muted-foreground text-lg font-medium">
            No icons found for <span className="text-primary">"{query}"</span>
          </p>
          <p className="text-muted-foreground mt-2 text-sm">
            Try searching for something else
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[3px]">
          {filteredIcons.map((icon) => {
            return <IconItem key={icon.name} icon={icon} />;
          })}
        </div>
      )}
    </div>
  );
};

const IconsList = (props: Props) => {
  return (
    <Suspense fallback={null}>
      <IconsListContent {...props} />
    </Suspense>
  );
};

export { IconsList };
