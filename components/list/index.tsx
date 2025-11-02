'use client';

import type { Icon } from '@/actions/get-icons';
import { useRef } from 'react';

import { ICON_LIST } from '@/icons';
import { Card, CardActions, CardTitle } from '../card';
import { ListEmpty } from './empty';
import { useSearch } from './hooks/use-search';
import { ListSearch } from './search';

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
    <Card key={icon.name}>
      <div
        className="hover:bg-accent flex cursor-pointer items-center justify-center rounded-md p-2 transition-colors duration-200 select-none"
        onMouseEnter={() => animationRef.current?.startAnimation()}
        onMouseLeave={() => animationRef.current?.stopAnimation()}
      >
        <IconComponent ref={animationRef} />
      </div>
      <CardTitle>{icon.name}</CardTitle>
      <CardActions {...icon} />
    </Card>
  );
};

const IconsList = ({ icons }: Props) => {
  const { results } = useSearch(icons);

  return (
    <div className="mt-8 mb-10 flex flex-col gap-6 sm:mb-20">
      <ListSearch count={icons.length} />
      {results.length === 0 && <ListEmpty />}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-[repeat(auto-fill,minmax(165px,1fr))]">
        {results.map((icon) => {
          return <IconItem key={icon.name} icon={icon} />;
        })}
      </div>
    </div>
  );
};

export { IconsList };
