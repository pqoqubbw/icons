'use client';

import type { Icon } from '@/actions/get-icons';
import { useRef } from 'react';

import { ICON_LIST } from '@/icons';
import { Card, CardActions, CardTitle } from '../card';
import { useSearch } from './hooks/use-search';

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

const IconsList = ({ icons }: Props) => {
  const { results } = useSearch(icons);

  return (
    <div className="mt-[100px] mb-20 w-full">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[3px]">
        {results.map((icon) => {
          return <IconItem key={icon.name} icon={icon} />;
        })}
      </div>
    </div>
  );
};

export { IconsList };
