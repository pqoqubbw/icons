'use client';

import React, { useState } from 'react';
import { Check, Copy, Download, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import Link from 'next/link';
import { useOpenPanel } from '@openpanel/nextjs';
import { ANALYTIC_EVENT } from '../analytics';
import { Icon } from '@/actions/get-icons';

const ACTION_CLASS_NAMES =
  'cursor-pointer p-2 size-8 hover:bg-accent rounded-md transition-colors duration-200';

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-3 border w-full h-full border-input rounded-md flex items-center justify-center flex-col">
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

const SIDE_OFFSET = 10;
const TOOLTIP_DELAY_DURATION = 500;
const TOOLTIP_SIDE = 'bottom';

const Actions = ({ content, name }: Icon) => {
  const op = useOpenPanel();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    op.track(ANALYTIC_EVENT.ICON_COPY, { icon: name });
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    op.track(ANALYTIC_EVENT.ICON_DOWNLOAD, { icon: name });
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <TooltipProvider delayDuration={TOOLTIP_DELAY_DURATION}>
        <Tooltip>
          <TooltipTrigger>
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className={ACTION_CLASS_NAMES} />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Copy className={ACTION_CLASS_NAMES} onClick={handleCopy} />
                </motion.div>
              )}
            </AnimatePresence>
          </TooltipTrigger>
          <TooltipContent sideOffset={SIDE_OFFSET} side={TOOLTIP_SIDE}>
            <p>{copied ? 'copied' : 'copy'}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Download className={ACTION_CLASS_NAMES} onClick={handleDownload} />
          </TooltipTrigger>
          <TooltipContent sideOffset={SIDE_OFFSET} side={TOOLTIP_SIDE}>
            <p>download .tsx file</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`https://github.com/pqoqubbw/icons/blob/main/icons/${name}`}
              target="_blank"
              onClick={() => op.track(ANALYTIC_EVENT.ICON_LINK, { icon: name })}
            >
              <ExternalLink className={ACTION_CLASS_NAMES} />
            </Link>
          </TooltipTrigger>
          <TooltipContent sideOffset={SIDE_OFFSET} side={TOOLTIP_SIDE}>
            <p>view on github</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const CardTitle = Title;
const CardActions = Actions;

export { Card, CardTitle, CardActions };
