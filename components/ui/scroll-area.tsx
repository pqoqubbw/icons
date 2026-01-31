import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea.Root>,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Root>
>(({ className, children, ...props }, ref) => (
  <BaseScrollArea.Root
    className={cn("relative overflow-hidden", className)}
    ref={ref}
    {...props}
  >
    {children}
  </BaseScrollArea.Root>
));
ScrollArea.displayName = "ScrollArea";

const ScrollAreaViewport = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea.Viewport>,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Viewport>
>(({ className, children, ...props }, ref) => (
  <BaseScrollArea.Viewport
    className={cn("overscroll-contain rounded-[inherit]", className)}
    ref={ref}
    {...props}
  >
    {children}
  </BaseScrollArea.Viewport>
));
ScrollAreaViewport.displayName = "ScrollAreaViewport";

const ScrollAreaContent = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea.Content>,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Content>
>(({ className, ...props }, ref) => (
  <BaseScrollArea.Content className={className} ref={ref} {...props} />
));
ScrollAreaContent.displayName = "ScrollAreaContent";

const ScrollAreaScrollbar = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Scrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <BaseScrollArea.Scrollbar
    className={cn(
      "pointer-events-none relative flex touch-none opacity-0 transition-opacity duration-100",
      "before:absolute before:content-['']",
      "data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0",
      "data-hovering:pointer-events-auto data-hovering:opacity-100 data-hovering:delay-0",
      orientation === "vertical" &&
        "m-2 w-1 before:left-1/2 before:h-full before:w-5 before:-translate-x-1/2",
      orientation === "horizontal" &&
        "m-2 h-1 before:right-0 before:-bottom-2 before:left-0 before:h-5 before:w-full",
      className
    )}
    orientation={orientation}
    ref={ref}
    {...props}
  >
    <BaseScrollArea.Thumb className="relative w-full flex-1" />
  </BaseScrollArea.Scrollbar>
));
ScrollAreaScrollbar.displayName = "ScrollAreaScrollbar";

const ScrollAreaCorner = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea.Corner>,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Corner>
>(({ className, ...props }, ref) => (
  <BaseScrollArea.Corner className={className} ref={ref} {...props} />
));
ScrollAreaCorner.displayName = "ScrollAreaCorner";

export {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaCorner,
};
