import { ICON_LIST } from "@/icons";

type Icon = {
  name: string;
  keywords: string[];
};

const getIcons = (): Icon[] => {
  return ICON_LIST.map(({ name, keywords }) => ({
    name,
    keywords,
  }));
};

export { getIcons };
export type { Icon };
