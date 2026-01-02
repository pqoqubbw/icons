"use client";

import { ScrollArea as BaseScrollArea } from "@base-ui-components/react/scroll-area";
import { CopyIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import type { Icon } from "@/actions/get-icons";
import type { IconStatus } from "@/components/ui/icon-state";

import { IconState } from "@/components/ui/icon-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextLoop } from "@/components/ui/text-loop";
import { PACKAGE_MANAGER } from "@/constants";
import { getPackageManagerPrefix } from "@/lib/get-package-manager-prefix";
import { cn } from "@/lib/utils";
import { usePackageNameContext } from "@/providers/package-name";

type CliBlockProps = {
  icons?: Icon[];
  staticIconName?: string;
  className?: string;
};

const CliBlock = ({ icons, staticIconName, className }: CliBlockProps) => {
  const [state, setState] = useState<IconStatus>("idle");
  const [_, startTransition] = useTransition();
  const currentIconName = useRef(staticIconName || "");

  const { packageName, setPackageName } = usePackageNameContext();

  const isStatic = !!staticIconName;

  const handleCopyToClipboard = () => {
    startTransition(async () => {
      const iconName =
        staticIconName || currentIconName.current || icons?.[0]?.name || "";

      try {
        await navigator.clipboard.writeText(
          `${getPackageManagerPrefix(packageName)} shadcn add @lucide-animated/${iconName}`
        );

        setState("done");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setState("idle");
      } catch {
        toast.error("Failed to copy to clipboard", {
          description: "Please check your browser permissions.",
        });
        setState("error");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setState("idle");
      }
    });
  };

  return (
    <div
      className={cn("relative mt-[40px] w-full max-w-[642px] px-4", className)}
    >
      <Tabs
        className="w-full"
        onValueChange={setPackageName}
        value={packageName}
      >
        <TabsList className="w-full" onClick={(e) => e.stopPropagation()}>
          {Object.values(PACKAGE_MANAGER).map((pm) => (
            <TabsTrigger key={pm} value={pm}>
              {pm}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.values(PACKAGE_MANAGER).map((pm) => (
          <TabsContent
            className="supports-[corner-shape:squircle]:corner-tr-squircle supports-[corner-shape:squircle]:corner-br-squircle supports-[corner-shape:squircle]:corner-bl-squircle mt-px overflow-hidden rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] focus-within:outline-offset-0 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-tr-[14px] supports-[corner-shape:squircle]:rounded-br-[14px] supports-[corner-shape:squircle]:rounded-bl-[14px]"
            key={pm}
            value={pm}
          >
            <BaseScrollArea.Root className="relative w-full overflow-hidden">
              <BaseScrollArea.Viewport
                className={cn(
                  "overflow-hidden rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] bg-white focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-0 dark:bg-white/10",
                  "supports-[corner-shape:squircle]:corner-tr-squircle supports-[corner-shape:squircle]:corner-br-squircle supports-[corner-shape:squircle]:corner-bl-squircle supports-[corner-shape:squircle]:rounded-tr-[14px] supports-[corner-shape:squircle]:rounded-br-[14px] supports-[corner-shape:squircle]:rounded-bl-[14px]",
                  "isolate whitespace-nowrap px-4 py-3 pr-20 font-mono text-sm tracking-[-0.39px]",
                  // left fade
                  "before:pointer-events-none before:absolute before:top-0 before:left-0 before:z-10 before:block before:h-full before:rounded-bl-[10px]",
                  "supports-[corner-shape:squircle]:before:corner-bl-squircle supports-[corner-shape:squircle]:before:rounded-bl-[14px]",
                  "before:transition-[width] before:duration-50 before:ease-out before:content-['']",
                  "before:w-[min(40px,var(--scroll-area-overflow-x-start))] before:bg-[linear-gradient(to_right,white,transparent)] dark:before:bg-[linear-gradient(to_right,rgb(47_47_47/1),transparent)] before:[--scroll-area-overflow-x-start:inherit]",
                  // right fade
                  "after:pointer-events-none after:absolute after:top-0 after:right-0 after:z-10 after:block after:h-full after:rounded-r-[10px]",
                  "supports-[corner-shape:squircle]:after:corner-r-squircle supports-[corner-shape:squircle]:after:rounded-r-[14px]",
                  "after:transition-[width] after:duration-50 after:ease-out after:content-['']",
                  "after:w-[calc(min(40px,var(--scroll-area-overflow-x-end,100px))+100px)] after:bg-[linear-gradient(to_left,white_0%,white_30%,transparent)] dark:after:bg-[linear-gradient(to_left,rgb(47_47_47/1)_0%,rgb(47_47_47/1)_30%,transparent)] after:[--scroll-area-overflow-x-end:inherit]"
                )}
              >
                <span className="sr-only">
                  {getPackageManagerPrefix(pm)} shadcn add @lucide-animated/
                  {staticIconName || currentIconName.current}
                </span>
                <span
                  aria-hidden="true"
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  {getPackageManagerPrefix(pm)}
                </span>{" "}
                <span aria-hidden="true" className="text-black dark:text-white">
                  shadcn add @lucide-animated/
                </span>
                {isStatic ? (
                  <span className="shrink-0 text-primary">
                    {staticIconName}
                  </span>
                ) : (
                  <TextLoop
                    interval={1.5}
                    onIndexChange={(index) => {
                      currentIconName.current = icons?.[index]?.name || "";
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    variants={{
                      initial: {
                        y: -12,
                        rotateX: -90,
                        opacity: 0,
                        filter: "blur(2px)",
                      },
                      animate: {
                        y: 0,
                        rotateX: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                      },
                      exit: {
                        y: 12,
                        rotateX: 90,
                        opacity: 0,
                        filter: "blur(2px)",
                      },
                    }}
                  >
                    {(icons || [])
                      .filter((icon) => icon.name.length <= 20)
                      .map((icon) => (
                        <span className="shrink-0 text-primary" key={icon.name}>
                          {icon.name}
                        </span>
                      ))}
                  </TextLoop>
                )}
              </BaseScrollArea.Viewport>
              <BaseScrollArea.Scrollbar
                className="pointer-events-none absolute right-2! bottom-1! left-2! flex h-0.5 touch-none rounded bg-neutral-200 opacity-0 transition-opacity duration-100 data-hovering:pointer-events-auto data-scrolling:pointer-events-auto data-hovering:opacity-100 data-scrolling:opacity-100 data-hovering:delay-0 data-scrolling:duration-0 dark:bg-neutral-700"
                keepMounted={false}
                orientation="horizontal"
              >
                <BaseScrollArea.Thumb className="relative w-full rounded bg-neutral-600 dark:bg-neutral-400" />
              </BaseScrollArea.Scrollbar>
              <button
                aria-disabled={state !== "idle"}
                aria-label="Copy to clipboard"
                className="supports-[corner-shape:squircle]:corner-squircle absolute top-1/2 right-1.5 z-20 -translate-y-1/2 cursor-pointer rounded-[6px] p-2 transition-[background-color] duration-100 focus-within:outline-offset-1 hover:bg-neutral-100 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[8px] dark:hover:bg-neutral-700"
                onClick={handleCopyToClipboard}
                tabIndex={0}
                type="button"
              >
                <IconState status={state}>
                  <CopyIcon aria-hidden="true" className="size-4" />
                </IconState>
              </button>
            </BaseScrollArea.Root>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export { CliBlock };
