"use client";

import { CircleXIcon, TriangleAlertIcon } from "lucide-react";
import dynamic from "next/dynamic";

const Sonner = dynamic(() => import("sonner").then((m) => m.Toaster), {
  ssr: false,
});

export const Toaster = () => (
  <Sonner
    icons={{
      error: <CircleXIcon className="size-4 text-red-600 dark:text-red-400" />,
      warning: (
        <TriangleAlertIcon className="size-4 text-yellow-500 dark:text-yellow-400" />
      ),
    }}
    position="top-center"
    toastOptions={{
      classNames: {
        toast:
          "!bg-white !px-4 !py-4 !flex-wrap dark:!bg-black !gap-0 !border-neutral-900/5 dark:!border-neutral-100/10 supports-[corner-shape:squircle]:!corner-squircle supports-[corner-shape:squircle]:!rounded-[30px] !rounded-[14px]",
        title: "font-sans text-black dark:!text-white",
        icon: "translate-y-[-9.5px]",
        actionButton:
          "!mt-2 w-full flex items-center justify-center !font-sans !bg-primary focus-visible:outline-primary cursor-pointer !h-8 !text-[14px] transition-colors duration-100 hover:!bg-[color-mix(in_oklab,var(--color-primary),black_10%)] focus-visible:outline-1 focus-visible:outline-offset-1 supports-[corner-shape:squircle]:!corner-squircle supports-[corner-shape:squircle]:!rounded-[30px] !rounded-[14px]",
        description: "font-sans text-secondary dark:!text-secondary",
      },
    }}
  />
);
