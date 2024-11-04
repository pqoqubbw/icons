import { promises as fs } from 'fs';
import path from 'path';

const ICONS_DIRECTORY = 'icons';

type Icon = {
  title: string;
  content: string;
};

const getIcons = async (): Promise<Icon[]> => {
  const iconsDir = path.join(process.cwd(), ICONS_DIRECTORY);
  const files = await fs.readdir(iconsDir);

  const icons = await Promise.all(
    files
      .filter((file) => file.endsWith('.tsx'))
      .map(async (file) => {
        const filePath = path.join(iconsDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        return {
          title: path.parse(file).name,
          content,
        };
      })
  );

  return icons;
};

export { getIcons };
export type { Icon };
