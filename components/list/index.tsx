'use client';

import { Icon } from '@/actions/get-icons';
import { Card, CardActions, CardTitle } from '@/components/card';
import { useQueryState } from 'nuqs';
import { ICON_LIST } from '@/icons';
import { ListSearch } from './search';
import { ListEmpty } from './empty';

type Props = {
  icons: Icon[];
};

const IconsList = ({ icons }: Props) => {
  const [search] = useQueryState('q');

  const filteredIcons = icons.filter((icon) =>
    icon.name.toLowerCase().includes(search?.toLowerCase() ?? '')
  );

  return (
    <div className="flex flex-col sm:my-20 my-10 gap-6">
      <ListSearch count={icons.length} />
      {filteredIcons.length === 0 && <ListEmpty />}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-[repeat(auto-fill,minmax(165px,1fr))] gap-3">
        {filteredIcons.map((icon) => {
          const IconComponent = ICON_LIST.find(
            ({ name }) => name === icon.name
          )!.icon;

          return (
            <Card key={icon.name}>
              <IconComponent />
              <CardTitle>{icon.name}</CardTitle>
              <CardActions {...icon} />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export { IconsList };
