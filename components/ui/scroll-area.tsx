import * as React from 'react';
import { ScrollArea as BaseScrollArea } from '@base-ui-components/react/scroll-area';

import { cn } from '@/lib/utils';

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea.Root>,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Root>
>(({ className, children, ...props }, ref) => (
  <BaseScrollArea.Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    {children}
  </BaseScrollArea.Root>
));
ScrollArea.displayName = 'ScrollArea';

const ScrollAreaViewport = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea.Viewport>,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Viewport> & {
    scrollFade?: boolean;
  }
>(({ className, scrollFade, children, ...props }, ref) => (
  <BaseScrollArea.Viewport
    ref={ref}
    className={cn(
      'overscroll-contain rounded-[inherit]',
      'focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-800',
      scrollFade &&
        "before:from-background after:from-background before:pointer-events-none before:absolute before:top-0 before:left-0 before:block before:h-[min(40px,var(--scroll-area-overflow-y-start))] before:w-full before:rounded-[inherit] before:bg-linear-to-b before:to-transparent before:transition-[height] before:duration-100 before:ease-out before:content-[''] before:[--scroll-area-overflow-y-start:inherit] after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-[min(40px,var(--scroll-area-overflow-y-end,40px))] after:w-full after:rounded-[inherit] after:bg-linear-to-t after:to-transparent after:transition-[height] after:duration-100 after:ease-out after:content-[''] after:[--scroll-area-overflow-y-end:inherit]",
      className
    )}
    {...props}
  >
    {children}
  </BaseScrollArea.Viewport>
));
ScrollAreaViewport.displayName = 'ScrollAreaViewport';

const ScrollAreaContent = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea.Content>,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Content>
>(({ className, ...props }, ref) => (
  <BaseScrollArea.Content ref={ref} className={className} {...props} />
));
ScrollAreaContent.displayName = 'ScrollAreaContent';

const ScrollAreaScrollbar = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Scrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <BaseScrollArea.Scrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'pointer-events-none relative flex touch-none rounded bg-neutral-200 opacity-0 transition-opacity duration-150',
      "before:absolute before:content-['']",
      'data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0',
      'data-hovering:pointer-events-auto data-hovering:opacity-100 data-hovering:delay-0',
      orientation === 'vertical' &&
        'm-2 w-1 before:left-1/2 before:h-full before:w-5 before:-translate-x-1/2',
      orientation === 'horizontal' &&
        'm-2 h-1 before:right-0 before:-bottom-2 before:left-0 before:h-5 before:w-full',
      className
    )}
    {...props}
  >
    <BaseScrollArea.Thumb className="relative w-full flex-1 rounded bg-neutral-500 dark:bg-neutral-700" />
  </BaseScrollArea.Scrollbar>
));
ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar';

const ScrollAreaCorner = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea.Corner>,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Corner>
>(({ className, ...props }, ref) => (
  <BaseScrollArea.Corner ref={ref} className={className} {...props} />
));
ScrollAreaCorner.displayName = 'ScrollAreaCorner';

export {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaCorner,
};
