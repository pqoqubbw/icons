'use client';

import { Icon } from '@/actions/get-icons';
import { Card, CardActions, CardTitle } from '@/components/card';
import { parseAsString, useQueryState } from 'nuqs';
import { Input } from '../ui/input';
import { ICONS_MAP } from '@/icons';

type Props = {
  icons: Icon[];
};

const IconsList = ({ icons }: Props) => {
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''));

  const filteredIcons = icons.filter((icon) =>
    icon.title.toLowerCase().includes(search?.toLowerCase() ?? '')
  );

  return (
    <div className="flex flex-col sm:my-20 my-10 gap-6">
      <Input
        placeholder={`Search ${icons.length} icons...`}
        value={search ?? ''}
        onChange={(e) => setSearch(e.target.value)}
      />
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
