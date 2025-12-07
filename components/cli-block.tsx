'use client';

import type { Icon } from '@/actions/get-icons';
import { useRef, useState, useTransition } from 'react';
import { ScrollArea as BaseScrollArea } from '@base-ui-components/react/scroll-area';
import { CheckIcon, CopyIcon } from 'lucide-react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextLoop } from '@/components/ui/text-loop';
import { PACKAGE_MANAGER } from '@/constants';
import { getPackageManagerPrefix } from '@/lib/get-package-manager-prefix';
import { cn } from '@/lib/utils';
import { usePackageNameContext } from '@/providers/package-name';

const CliBlock = ({ icons }: { icons: Icon[] }) => {
  const [state, setState] = useState<'idle' | 'copied'>('idle');
  const [_, startTransition] = useTransition();
  const currentIconName = useRef('');

  const { packageName, setPackageName } = usePackageNameContext();

  const handleCopyToClipboard = () => {
    startTransition(async () => {
      const iconName = currentIconName.current || icons[0].name;

      await navigator.clipboard.writeText(
        `${getPackageManagerPrefix(packageName)} shadcn add @lucide-animated/${iconName}`
      );

      setState('copied');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setState('idle');
    });
  };

  return (
    <div className="relative mt-[50px] w-full max-w-[642px] px-4">
      <Tabs
        className="corner-squircle w-full"
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
      </Tabs>
      <BaseScrollArea.Root className="corner-squircle relative mt-px w-full overflow-hidden rounded-tr-[14px] rounded-br-[14px] rounded-bl-[14px]">
        <BaseScrollArea.Viewport
          className={cn(
            'corner-squircle focus-visible:outline-primary overflow-hidden rounded-tr-[14px] rounded-br-[14px] rounded-bl-[14px] bg-white focus-visible:outline-1 focus-visible:outline-offset-0 dark:bg-white/10',
            'px-4 py-3 pr-20 font-mono text-sm tracking-[-0.39px] whitespace-nowrap',
            // left fade
            'before:corner-squircle before:pointer-events-none before:absolute before:top-0 before:left-0 before:block before:h-full before:rounded-bl-[14px]',
            "before:transition-[width] before:duration-50 before:ease-out before:content-['']",
            'before:w-[min(40px,var(--scroll-area-overflow-x-start))] before:bg-[linear-gradient(to_right,white,transparent)] before:[--scroll-area-overflow-x-start:inherit] dark:before:bg-[linear-gradient(to_right,rgb(47_47_47/1),transparent)]',
            // right fade
            'after:corner-squircle after:pointer-events-none after:absolute after:top-0 after:right-0 after:block after:h-full after:rounded-r-[14px]',
            "after:transition-[width] after:duration-50 after:ease-out after:content-['']",
            'after:w-[calc(min(40px,var(--scroll-area-overflow-x-end))+100px)] after:bg-[linear-gradient(to_left,white_0%,white_30%,transparent)] after:[--scroll-area-overflow-x-end:inherit] dark:after:bg-[linear-gradient(to_left,rgb(47_47_47/1)_0%,rgb(47_47_47/1)_30%,transparent)]'
          )}
        >
          <span className="text-neutral-600 dark:text-neutral-400">
            {getPackageManagerPrefix(packageName)}
          </span>{' '}
          <span className="text-black dark:text-white">
            shadcn add @lucide-animated/
          </span>
          <TextLoop
            onIndexChange={(index) => {
              currentIconName.current = icons[index].name;
            }}
            interval={2}
            transition={{ duration: 0.25, opacity: { duration: 0.15 } }}
            variants={{
              initial: { y: -10, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              exit: { y: 10, opacity: 0 },
            }}
          >
            {icons
              .filter((icon) => icon.name.length <= 20)
              .map((icon) => (
                <span key={icon.name} className="text-primary shrink-0">
                  {icon.name}
                </span>
              ))}
          </TextLoop>
        </BaseScrollArea.Viewport>
        <BaseScrollArea.Scrollbar
          keepMounted={false}
          orientation="horizontal"
          className="pointer-events-none absolute right-2! bottom-1! left-2! flex h-0.5 touch-none rounded bg-neutral-200 opacity-0 transition-opacity duration-150 data-hovering:pointer-events-auto data-hovering:opacity-100 data-hovering:delay-0 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0 dark:bg-neutral-400"
        >
          <BaseScrollArea.Thumb className="relative w-10 rounded bg-neutral-700" />
        </BaseScrollArea.Scrollbar>
        <button
          type="button"
          onClick={handleCopyToClipboard}
          className="corner-squircle focus-visible:outline-primary absolute top-1/2 right-1.5 -translate-y-1/2 cursor-pointer rounded-[8px] p-2 transition-[background-color] duration-100 focus-within:outline-offset-1 hover:bg-neutral-100 focus-visible:outline-1 dark:hover:bg-neutral-700"
        >
          {state === 'copied' && (
            <CheckIcon className="size-4 text-green-600" />
          )}
          {state === 'idle' && <CopyIcon className="size-4" />}
        </button>
      </BaseScrollArea.Root>
    </div>
  );
};

export { CliBlock };
