import { Icon } from '@/actions/get-icons';
import { Card, CardActions, CardTitle } from '@/components/card';
import { kebabToPascalCase } from '@/lib/kebab-to-pascal';
import dynamic from 'next/dynamic';

type Props = {
  icons: Icon[];
};

const IconsList = ({ icons }: Props) => {
  return (
    <div className="grid sm:my-20 my-10 grid-cols-[repeat(auto-fit,minmax(165px,1fr))] auto-rows-[minmax(165px,auto)] gap-3">
      {icons.map((icon) => {
        const IconComponent = dynamic(() =>
          import(`@/icons/${icon.title}.tsx`).then(
            (mod) => mod[kebabToPascalCase(icon.title)]
          )
        );

        return (
          <Card key={icon.title}>
            <IconComponent />
            <CardTitle>{icon.title}</CardTitle>
            <CardActions {...icon} />
          </Card>
        );
      })}
    </div>
  );
};

export { IconsList };
