import { ICON_LIST } from '@/icons';
import { promises as fs } from 'fs';
import path from 'path';

const ICONS_DIRECTORY = 'icons';

type Icon = {
  name: string;
  content: string;
};

const getIcons = async (): Promise<Icon[]> => {
  const iconsDir = path.join(process.cwd(), ICONS_DIRECTORY);

  const icons = await Promise.all(
    ICON_LIST.map(async ({ name }) => {
      const content = await fs.readFile(
        path.join(iconsDir, `${name}.tsx`),
        'utf-8'
      );

      return { name, content };
    })
  );

  return icons;
};

export { getIcons };
export type { Icon };
