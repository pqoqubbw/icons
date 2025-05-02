'use client';

import type { Icon } from '@/actions/get-icons';
import { ICON_LIST } from '@/icons';
import { ListSearch } from './search';
import { ListEmpty } from './empty';
import { Card, CardActions, CardTitle } from '../card';
import { useSearch } from './hooks/use-search';
import { useRef } from 'react';

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
        className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
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
    <div className="flex flex-col sm:mb-20 mb-10 mt-8 gap-6">
      <ListSearch count={icons.length} />
      {results.length === 0 && <ListEmpty />}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-[repeat(auto-fill,minmax(165px,1fr))] gap-3">
        {results.map((icon) => {
          return <IconItem key={icon.name} icon={icon} />;
        })}
      </div>
    </div>
  );
};

export { IconsList };
