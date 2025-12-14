'use client';

import type { Icon } from '@/actions/get-icons';
import { useRef } from 'react';

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

const IconsList = ({ icons }: Props) => {
  return (
    <div className="mt-[40px] mb-20 w-full">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[3px]">
        {icons.map((icon) => {
          return <IconItem key={icon.name} icon={icon} />;
        })}
      </div>
    </div>
  );
};

export { IconsList };
