'use client';

import type { Icon } from '@/actions/get-icons';
import type { LucideProps } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { useOpenPanel } from '@openpanel/nextjs';
import { Copy, Terminal } from 'lucide-react';
import { toast } from 'sonner';

import { getIconContent } from '@/actions/get-icon-content';
import { openInV0Action } from '@/actions/open-in-v0';
import { ANALYTIC_EVENT } from '@/components/analytics';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getPackageManagerPrefix } from '@/lib/get-package-manager-prefix';
import { cn } from '@/lib/utils';
import { usePackageNameContext } from '@/providers/package-name';

const V0Icon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return (
    <svg
      ref={ref}
      fill="currentColor"
      viewBox="0 0 40 20"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-6', props.className)}
      {...props}
    >
      <path d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"></path>
      <path d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"></path>
    </svg>
  );
});

V0Icon.displayName = 'V0Icon';

const Card = ({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className="corner-squircle group/card flex flex-col items-center justify-center rounded-[30px] bg-white px-[28px] pt-[50px] dark:bg-[#0A0A0A]"
      {...props}
    >
      {children}
    </div>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="mt-[36px] text-center font-mono text-xs text-[#9F9FA9] dark:text-[#D4D4D4]">
      {children}
    </p>
  );
};

const CopyCLIAction = ({ name }: Pick<Icon, 'name'>) => {
  const op = useOpenPanel();
  const { packageName } = usePackageNameContext();

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (copied) return;

    op.track(ANALYTIC_EVENT.ICON_COPY_TERMINAL, { icon: `${name}.tsx` });
    navigator.clipboard.writeText(
      `${getPackageManagerPrefix(packageName)} shadcn@latest add "https://lucide-animated.com/r/${name}.json"`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip>
      <TooltipTrigger
        className="corner-squircle flex size-10 cursor-pointer items-center justify-center rounded-[20px] bg-neutral-200/20 transition-colors duration-100 hover:bg-neutral-200 dark:bg-neutral-800/20 dark:hover:bg-neutral-700"
        onClick={handleCopy}
      >
        <Terminal className="size-4 text-neutral-800 dark:text-neutral-100" />
      </TooltipTrigger>
      <TooltipContent>
        Copy{' '}
        <code className="rounded-[4px] bg-neutral-50/20 px-1 py-0.5 font-mono">
          shadcn/cli
        </code>{' '}
        command
      </TooltipContent>
    </Tooltip>
  );
};

const CopyCodeAction = ({ name }: Pick<Icon, 'name'>) => {
  const op = useOpenPanel();

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async () => {
    if (copied || isLoading) return;

    try {
      setIsLoading(true);
      op.track(ANALYTIC_EVENT.ICON_COPY, { icon: `${name}.tsx` });

      const content = await getIconContent(name);

      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy icon content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger
        className="corner-squircle flex size-10 cursor-pointer items-center justify-center rounded-[20px] bg-neutral-200/20 transition-colors duration-100 hover:bg-neutral-200 dark:bg-neutral-800/20 dark:hover:bg-neutral-700"
        onClick={handleCopy}
      >
        <Copy className="size-4 text-neutral-800 dark:text-neutral-100" />
      </TooltipTrigger>
      <TooltipContent>
        Copy{' '}
        <code className="rounded-[4px] bg-neutral-50/20 px-1 py-0.5 font-mono">
          .tsx
        </code>{' '}
        code
      </TooltipContent>
    </Tooltip>
  );
};

const OpenInV0Action = ({ name }: Pick<Icon, 'name'>) => {
  const op = useOpenPanel();

  const [isLoading, setIsLoading] = useState(false);

  const handleOpenInV0 = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      op.track(ANALYTIC_EVENT.ICON_OPEN_IN_V0, { icon: `${name}.tsx` });
      const data = await openInV0Action(name);

      if (data.url) {
        const popupOpened = window.open(data.url, '_blank');

        if (!popupOpened) {
          toast.warning('Pop-up window blocked.', {
            description: 'Click Open to continue in new tab.',
            duration: 5000,
            action: {
              label: 'Open',
              onClick: () => window.open(data.url, '_blank'),
            },
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger
        className="corner-squircle flex size-10 cursor-pointer items-center justify-center rounded-[20px] bg-neutral-200/20 transition-colors duration-100 hover:bg-neutral-200 dark:bg-neutral-800/20 dark:hover:bg-neutral-700"
        onClick={handleOpenInV0}
      >
        <V0Icon className="size-5 text-neutral-800 dark:text-neutral-100" />
      </TooltipTrigger>
      <TooltipContent>Open in v0</TooltipContent>
    </Tooltip>
  );
};

const Actions = ({ name }: Pick<Icon, 'name'>) => {
  return (
    <TooltipProvider>
      <div className="my-6 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-100 group-hover/card:opacity-100 has-data-popup-open:opacity-100 [@media(hover:none)]:opacity-100">
        <CopyCodeAction name={name} />
        <CopyCLIAction name={name} />
        <OpenInV0Action name={name} />
      </div>
    </TooltipProvider>
  );
};

const CardTitle = Title;
const CardActions = Actions;

export { Card, CardTitle, CardActions };
