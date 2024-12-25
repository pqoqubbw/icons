'use client';

import type { Icon } from '@/actions/get-icons';
import { Check, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { TextLoop } from '../ui/text-loop';

const CliBlock = ({ icons }: { icons: Icon[] }) => {
  const [copied, setCopied] = useState(false);
  const currentIconName = useRef('');

  const copyToClipboard = async () => {
    const text = currentIconName.current || icons[0].name;
    try {
      await navigator.clipboard.writeText(
        `npx shadcn@latest add "https://icons.pqoqubbw.dev/c/${text}.json"`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div
      className="w-full max-w-3xl bg-input/50 rounded-lg overflow-hidden cursor-pointer mt-8 border border-input"
      onClick={copyToClipboard}
    >
      <div className="p-3 relative font-mono text-sm flex items-center justify-between gap-2 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center min-w-0">
          <span className="shrink-0 mr-2">npx</span>{' '}
          <span className="text-muted-foreground shrink-0">
            shadcn@latest add &quot;https://icons.pqoqubbw.dev/c/
          </span>
          <TextLoop
            onIndexChange={(index) => {
              currentIconName.current = icons[index].name;
            }}
            interval={2}
            transition={{ duration: 0.25, opacity: { duration: 0.2 } }}
            variants={{
              initial: { y: -15, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              exit: { y: 15, opacity: 0 },
            }}
          >
            {icons.map((icon) => (
              <span key={icon.name} className="shrink-0">
                {icon.name}.json
                <span className="text-muted-foreground">&quot;</span>
              </span>
            ))}
          </TextLoop>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Check className="cursor-pointer p-2 size-8 hover:bg-accent rounded-md transition-colors duration-200" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Copy className="cursor-pointer p-2 size-8 hover:bg-accent rounded-md transition-colors duration-200" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { CliBlock };
