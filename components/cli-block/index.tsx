'use client';

import type { Icon } from '@/actions/get-icons';
import { useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { PACKAGE_MANAGER } from '@/constants';
import { getPackageManagerPrefix } from '@/lib/get-package-manager-prefix';
import { usePackageNameContext } from '@/providers/package-name';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { TextLoop } from '../ui/text-loop';

type CopyIconProps = {
  copied: boolean;
  onClick: () => void;
};

const CopyIcon = ({ copied, onClick }: CopyIconProps) => {
  return (
    <div
      onClick={onClick}
      className="hover:bg-input absolute right-3 -bottom-[6px] flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md p-4 px-3 transition-colors duration-200 md:px-0"
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
        `${getPackageManagerPrefix(packageName)} shadcn@latest add "https://lucide-animated.com/r/${text}.json"`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-input/50 border-input relative mt-8 w-full max-w-3xl overflow-hidden rounded-lg border">
      <Tabs
        className="w-full"
        value={packageName}
        onValueChange={setPackageName}
      >
        <TabsList className="w-full" onClick={(e) => e.stopPropagation()}>
          {Object.values(PACKAGE_MANAGER).map((pm) => (
            <TabsTrigger key={pm} value={pm} className="cursor-pointer">
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
        className="flex max-w-[calc(100%-56px)] cursor-pointer items-center gap-2 overflow-x-auto py-4 pr-14 pl-5 font-mono text-sm whitespace-nowrap md:max-w-full"
      >
        <div className="flex min-w-0 items-center">
          <span className="mr-2 shrink-0">
            {getPackageManagerPrefix(packageName)}
          </span>{' '}
          <span className="text-muted-foreground shrink-0">
            shadcn@latest add &quot;https://lucide-animated.com/r/
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
