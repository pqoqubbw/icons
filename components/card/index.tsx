'use client';

import { forwardRef, useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { TooltipProvider } from '../ui/tooltip';

import { useOpenPanel } from '@openpanel/nextjs';
import { ANALYTIC_EVENT } from '../analytics';
import type { Icon } from '@/actions/get-icons';
import { openInV0Action } from '@/actions/open-in-v0';
import { toast } from 'sonner';
import { ActionItem } from './action';
import { cn } from '@/lib/utils';
import type { LucideProps } from 'lucide-react';
import { usePackageNameContext } from '@/providers/package-name';
import { getPackageManagerPrefix } from '@/lib/get-package-manager-prefix';

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

const TOOLTIP_DELAY_DURATION = 500;

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-3 pt-5 border border-input rounded-md flex items-center justify-center flex-col">
      {children}
    </div>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-xs text-muted-foreground mt-5 mb-3 text-center">
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
      `${getPackageManagerPrefix(packageName)} shadcn@latest add "https://icons.pqoqubbw.dev/c/${name}.json"`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ActionItem
      icons={[Terminal, Check]}
      toggle={copied}
      onClick={handleCopy}
      tooltipText={['copy shadcn/cli command', 'copied']}
    />
  );
};

const CopyCodeAction = ({ content, name }: Pick<Icon, 'content' | 'name'>) => {
  const op = useOpenPanel();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (copied) return;

    op.track(ANALYTIC_EVENT.ICON_COPY, { icon: `${name}.tsx` });
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ActionItem
      icons={[Copy, Check]}
      toggle={copied}
      onClick={handleCopy}
      tooltipText={['copy code', 'copied']}
    />
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
    <ActionItem
      icons={[V0Icon, Check]}
      toggle={isLoading}
      onClick={handleOpenInV0}
      tooltipText={['open in v0', 'opened']}
    />
  );
};

const Actions = ({ content, name }: Icon) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <TooltipProvider delayDuration={TOOLTIP_DELAY_DURATION}>
        <CopyCLIAction name={name} />
        <CopyCodeAction content={content} name={name} />
        <OpenInV0Action name={name} />
      </TooltipProvider>
    </div>
  );
};

const CardTitle = Title;
const CardActions = Actions;

export { Card, CardTitle, CardActions };
