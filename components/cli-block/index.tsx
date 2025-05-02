'use client';

import type { Icon } from '@/actions/get-icons';
import { Check, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { TextLoop } from '../ui/text-loop';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PACKAGE_MANAGER } from '@/constants';
import { usePackageNameContext } from '@/providers/package-name';
import { getPackageManagerPrefix } from '@/lib/get-package-manager-prefix';

type CopyIconProps = {
  copied: boolean;
  onClick: () => void;
};

const CopyIcon = ({ copied, onClick }: CopyIconProps) => {
  return (
    <div
      onClick={onClick}
      className="absolute right-3 md:px-0 px-3 flex items-center justify-center -bottom-[6px] cursor-pointer p-4 size-8 -translate-y-1/2 hover:bg-input rounded-md transition-colors duration-200"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.div
            key="check"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="size-4" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Copy className="size-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CliBlock = ({ icons }: { icons: Icon[] }) => {
  const [copied, setCopied] = useState(false);
  const currentIconName = useRef('');

  const { packageName, setPackageName } = usePackageNameContext();

  const copyToClipboard = async () => {
    const text = currentIconName.current || icons[0].name;
    try {
      await navigator.clipboard.writeText(
        `${getPackageManagerPrefix(packageName)} shadcn@latest add "https://icons.pqoqubbw.dev/c/${text}.json"`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-input/50 rounded-lg overflow-hidden mt-8 border border-input relative">
      <Tabs
        className="w-full"
        value={packageName}
        onValueChange={setPackageName}
      >
        <TabsList className="w-full" onClick={(e) => e.stopPropagation()}>
          {Object.values(PACKAGE_MANAGER).map((pm) => (
            <TabsTrigger key={pm} value={pm}>
              {pm}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
      <div
        onClick={copyToClipboard}
        className="pl-5 py-4 font-mono text-sm md:max-w-full max-w-[calc(100%-56px)] flex items-center gap-2 overflow-x-auto whitespace-nowrap pr-14 cursor-pointer"
      >
        <div className="flex items-center min-w-0">
          <span className="shrink-0 mr-2">
            {getPackageManagerPrefix(packageName)}
          </span>{' '}
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
            {icons
              .filter((icon) => icon.name.length <= 20)
              .map((icon) => (
                <span key={icon.name} className="shrink-0">
                  {icon.name}.json
                  <span className="text-muted-foreground">&quot;</span>
                </span>
              ))}
          </TextLoop>
        </div>
      </div>
      <CopyIcon copied={copied} onClick={copyToClipboard} />
    </div>
  );
};

export { CliBlock };
