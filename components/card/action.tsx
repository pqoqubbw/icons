import { AnimatePresence, motion } from 'motion/react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import type { LucideIcon } from 'lucide-react';

type Props = {
  icons: [LucideIcon, LucideIcon];
  toggle: boolean;
  onClick: () => void;
  tooltipText: [string, string];
};

const ActionItem = ({ icons, toggle, onClick, tooltipText }: Props) => {
  const [IconDefault, IconCopied] = icons;
  const [tooltipDefaultText, tooltipCopiedText] = tooltipText;

  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="action-container" onClick={onClick}>
          <AnimatePresence mode="wait" initial={false}>
            {!toggle ? (
              <motion.div
                key="first"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
              >
                <IconDefault className="action-item" />
              </motion.div>
            ) : (
              <motion.div
                key="second"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
              >
                <IconCopied className="action-item" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </TooltipTrigger>
      <TooltipContent sideOffset={10} side="bottom">
        <p>{toggle ? tooltipCopiedText : tooltipDefaultText}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export { ActionItem };
