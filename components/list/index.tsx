'use client';

import { Icon } from '@/actions/get-icons';
import { Card, CardActions, CardTitle } from '@/components/card';
import { useQueryState } from 'nuqs';
import { ICONS_MAP } from '@/icons';
import { ListSearch } from './search';

type Props = {
  icons: Icon[];
};

const IconsList = ({ icons }: Props) => {
  const [search] = useQueryState('q');

  const filteredIcons = icons.filter((icon) =>
    icon.title.toLowerCase().includes(search?.toLowerCase() ?? '')
  );

  return (
    <div className="flex flex-col sm:my-20 my-10 gap-6">
      <ListSearch count={icons.length} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-[repeat(auto-fill,minmax(165px,1fr))] gap-3">
        {filteredIcons.map((icon) => {
          const IconComponent = ICONS_MAP[icon.title as keyof typeof ICONS_MAP];

          return (
            <Card key={icon.title}>
              <IconComponent />
              <CardTitle>{icon.title}</CardTitle>
              <CardActions {...icon} />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export { IconsList };
