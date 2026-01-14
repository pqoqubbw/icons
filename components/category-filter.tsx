"use client";

import { motion } from "motion/react";
import { useHotkeys } from "react-hotkeys-hook";
import { cn } from "@/lib/utils";

export type Category = {
  id: string;
  label: string;
  keywords: string[];
};

export const CATEGORIES: Category[] = [
  { id: "all", label: "All", keywords: [] },
  { id: "ui", label: "UI", keywords: ["button", "input", "menu", "panel", "layout", "grid", "list", "card", "modal", "dialog", "dropdown", "select", "checkbox", "radio", "toggle", "switch", "slider", "progress", "badge", "chip", "avatar", "tooltip", "popover"] },
  { id: "arrows", label: "Arrows", keywords: ["arrow", "chevron", "corner", "trending"] },
  { id: "files", label: "Files", keywords: ["file", "folder", "document"] },
  { id: "social", label: "Social", keywords: ["github", "twitter", "facebook", "instagram", "linkedin", "youtube", "discord", "twitch", "dribbble", "figma", "gitlab"] },
  { id: "communication", label: "Communication", keywords: ["mail", "message", "chat", "phone", "bell", "notification"] },
  { id: "media", label: "Media", keywords: ["play", "pause", "volume", "music", "video", "image", "camera", "mic"] },
  { id: "weather", label: "Weather", keywords: ["sun", "moon", "cloud", "rain", "snow", "wind", "storm"] },
  { id: "symbols", label: "Symbols", keywords: ["check", "plus", "minus", "x", "circle", "square", "star", "heart", "bookmark", "flag"] },
];

type CategoryFilterProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categoryOpen: boolean;
  setCategoryOpen: (open: boolean) => void;
};

export const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
  categoryOpen,
  setCategoryOpen,
}: CategoryFilterProps) => {
  useHotkeys(
    "mod+C",
    () => {
      setCategoryOpen(!categoryOpen);
    },
    {
      preventDefault: true,
      enabled: true,
      enableOnFormTags: true,
      enableOnContentEditable: true,
    }
  );

  useHotkeys(
    "escape",
    () => {
      setCategoryOpen(false);
    },
    {
      preventDefault: true,
      enabled: categoryOpen,
      enableOnFormTags: true,
      enableOnContentEditable: true,
    }
  );

  const handleCategorySelect = (categoryId: string) => {
    onCategoryChange(categoryId);
    setCategoryOpen(false);
  };

  return (
    <>
      <div className="hidden items-center justify-start gap-1 md:flex">
        {!categoryOpen ? (
          <>
            <div className="flex items-center justify-center gap-0.5">
              <kbd>⌘</kbd>
              <kbd>C</kbd>
            </div>
            <span className="font-sans text-neutral-500 text-sm dark:text-neutral-500">
              for categories
            </span>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-0.5">
              <kbd>⌘</kbd>
              <kbd>C</kbd>
            </div>
            <span className="font-sans text-neutral-500 text-sm dark:text-neutral-500">
              to close
            </span>
          </>
        )}
      </div>

      {categoryOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-background/80 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-[600px] px-4">
            {CATEGORIES.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03, duration: 0.2, ease: "easeOut" }}
                onClick={() => handleCategorySelect(category.id)}
                className={cn(
                  "supports-[corner-shape:squircle]:corner-squircle inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-[12px] px-5 py-2.5 font-sans text-[15px] font-medium transition-all duration-150 supports-[corner-shape:squircle]:rounded-[18px]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  selectedCategory === category.id
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "bg-white text-foreground ring-1 ring-neutral-200 hover:scale-105 hover:shadow-md dark:bg-neutral-900 dark:ring-neutral-800"
                )}
                type="button"
              >
                {category.label}
              </motion.button>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex items-center gap-2 text-neutral-400 dark:text-neutral-500"
          >
            <span className="font-sans text-sm"><span className="font-semibold">esc</span> to exit</span>
          </motion.div>
        </div>
      )}
    </>
  );
};
