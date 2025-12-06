import type { LucideIcon } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type Props = {
  icons: [LucideIcon, LucideIcon];
  toggle: boolean;
  onClick: () => void;
  tooltipText: [string, string];
};

const ActionItem = ({ icons, toggle, onClick, tooltipText }: Props) => {
  const [IconDefault] = icons;
  const [tooltipDefaultText, tooltipCopiedText] = tooltipText;

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className="action-container corner-squircle cursor-pointer rounded-[20px] bg-neutral-200/20 p-2 transition-colors duration-100 hover:bg-neutral-200"
          onClick={onClick}
        >
          <IconDefault className="size-5 text-neutral-800" />
        </div>
      </TooltipTrigger>
      <TooltipContent sideOffset={10} side="bottom">
        <p>{toggle ? tooltipCopiedText : tooltipDefaultText}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export { ActionItem };
