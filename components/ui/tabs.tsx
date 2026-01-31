"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type * as React from "react";

import { cn } from "@/lib/utils";

type TabsProps = React.ComponentProps<typeof BaseTabs.Root>;

const Tabs = ({ className, ...props }: TabsProps) => {
  return (
    <BaseTabs.Root
      className={cn("flex flex-col", className)}
      data-slot="tabs"
      {...props}
    />
  );
};

type TabsListProps = React.ComponentProps<typeof BaseTabs.List>;

const TabsList = ({ className, children, ...props }: TabsListProps) => {
  return (
    <BaseTabs.List
      className={cn("inline-flex items-center justify-start gap-px", className)}
      data-slot="tabs-list"
      {...props}
    >
      {children}
    </BaseTabs.List>
  );
};

type TabsTriggerProps = React.ComponentProps<typeof BaseTabs.Tab>;

const TabsTrigger = ({ className, ...props }: TabsTriggerProps) => {
  return (
    <BaseTabs.Tab
      className={cn(
        "z-50 inline-flex cursor-pointer items-center justify-center whitespace-nowrap bg-white px-4 py-1 font-mono text-black text-sm tracking-[-0.39px] hover:bg-neutral-50 aria-selected:bg-primary aria-selected:text-white dark:bg-white/10 dark:text-white dark:aria-selected:bg-primary dark:hover:bg-white/5",
        "first:rounded-tl-[8px] last:rounded-tr-[8px]",
        "supports-[corner-shape:squircle]:first:corner-tl-squircle supports-[corner-shape:squircle]:first:rounded-tl-[14px]",
        "supports-[corner-shape:squircle]:last:corner-tr-squircle supports-[corner-shape:squircle]:last:rounded-tr-[14px]",
        "transition-[background-color] duration-50",
        "focus-within:outline-offset-0 focus-visible:outline-1 focus-visible:outline-primary",
        className
      )}
      data-slot="tabs-trigger"
      {...props}
    />
  );
};

const TabsContent = (props: React.ComponentProps<typeof BaseTabs.Panel>) => {
  return <BaseTabs.Panel data-slot="tabs-content" {...props} />;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
