import { ICONS_MAP } from '@/icons';
import { promises as fs } from 'fs';
import path from 'path';

const ICONS_DIRECTORY = 'icons';

type Icon = {
  title: string;
  content: string;
};

const getIcons = async (): Promise<Icon[]> => {
  const iconsDir = path.join(process.cwd(), ICONS_DIRECTORY);

  const icons = await Promise.all(
    Object.entries(ICONS_MAP).map(async ([title]) => {
      const content = await fs.readFile(
        path.join(iconsDir, `${title}.tsx`),
        'utf-8'
      );

      return { title, content };
    })
  );

  return icons;
};

export { getIcons };
export type { Icon };
