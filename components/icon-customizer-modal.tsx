"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Copy, RotateCcw, Shuffle, Maximize2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getIconContent } from "@/actions/get-icon-content";

type CustomizerSettings = {
  color: string;
  size: number;
  darkBg: boolean;
};

const DEFAULT_SETTINGS: CustomizerSettings = {
  color: "#FFFFFF",
  size: 64,
  darkBg: true,
};

const PRESET_COLORS = [
  "#FFFFFF", "#000000", "#FF6B6B", "#4ECDC4", 
  "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F"
];

type IconCustomizerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  iconName: string;
  IconComponent: React.ElementType;
};

export const IconCustomizerModal = ({
  isOpen,
  onClose,
  iconName,
  IconComponent,
}: IconCustomizerModalProps) => {
  const [settings, setSettings] = useState<CustomizerSettings>(DEFAULT_SETTINGS);

  const handleReset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    toast.success("Reset to defaults");
  }, []);

  const handleRandomize = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      color: PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)],
    }));
  }, []);

  const handleCopyCustomCode = useCallback(async () => {
    try {
      let fullCode = await getIconContent(iconName);
      
      // Replace default size with custom size
      if (settings.size !== 28) {
        fullCode = fullCode.replace(/size = 28/g, `size = ${settings.size}`);
      }
      
      // Replace currentColor with custom color if not white
      if (settings.color !== "#FFFFFF") {
        fullCode = fullCode.replace(/stroke="currentColor"/g, `stroke="${settings.color}"`);
      }
      
      await navigator.clipboard.writeText(fullCode);
      toast.success("Customized icon code copied");
    } catch {
      toast.error("Failed to copy code");
    }
  }, [iconName, settings.size, settings.color]);

  useHotkeys("escape", onClose, { enabled: isOpen });
  useHotkeys("r", handleReset, { enabled: isOpen, preventDefault: true });
  useHotkeys("c", handleCopyCustomCode, { enabled: isOpen, preventDefault: true });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleColorChange = useCallback((color: string) => {
    setSettings((prev) => ({ ...prev, color }));
  }, []);

  const handleSizeChange = useCallback((size: number) => {
    setSettings((prev) => ({ ...prev, size }));
  }, []);

  const toggleDarkBg = useCallback(() => {
    setSettings((prev) => ({ ...prev, darkBg: !prev.darkBg }));
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="supports-[corner-shape:squircle]:corner-squircle relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[24px] bg-white p-8 shadow-2xl supports-[corner-shape:squircle]:rounded-[36px] dark:bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-sans text-2xl font-semibold text-foreground">
                  Customize Icon
                </h2>
                <p className="mt-1 font-mono text-neutral-500 text-sm">
                  {iconName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="supports-[corner-shape:squircle]:corner-squircle flex size-10 items-center justify-center rounded-[14px] bg-neutral-100 transition-colors hover:bg-neutral-200 supports-[corner-shape:squircle]:rounded-[20px] dark:bg-neutral-800 dark:hover:bg-neutral-700"
                aria-label="Close modal"
              >
                <span className="font-sans text-xl">×</span>
              </button>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Preview Section */}
              <div className="flex flex-col gap-4">
                <div
                  className={cn(
                    "supports-[corner-shape:squircle]:corner-squircle flex min-h-[300px] items-center justify-center rounded-[20px] p-8 transition-colors supports-[corner-shape:squircle]:rounded-[30px]",
                    settings.darkBg
                      ? "bg-neutral-900"
                      : "bg-neutral-100 dark:bg-neutral-800"
                  )}
                >
                  <div style={{ color: settings.color }}>
                    <IconComponent
                      size={settings.size}
                      className="flex items-center justify-center"
                    />
                  </div>
                </div>

                {/* Preview Controls */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={toggleDarkBg}
                    className="supports-[corner-shape:squircle]:corner-squircle rounded-[12px] bg-neutral-100 px-4 py-2 font-sans text-sm transition-colors hover:bg-neutral-200 supports-[corner-shape:squircle]:rounded-[18px] dark:bg-neutral-800 dark:hover:bg-neutral-700"
                  >
                    {settings.darkBg ? "Light BG" : "Dark BG"}
                  </button>
                </div>
              </div>

              {/* Controls Section */}
              <div className="flex flex-col gap-6">
                {/* Color */}
                <div>
                  <label className="mb-3 block font-sans text-sm font-medium">
                    Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings.color}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="h-10 w-16 cursor-pointer rounded-[12px]"
                      style={{ padding: 0 }}
                    />
                    <input
                      type="text"
                      value={settings.color}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="supports-[corner-shape:squircle]:corner-squircle flex-1 rounded-[12px] border-0 bg-neutral-100 px-3 py-2 font-mono text-sm supports-[corner-shape:squircle]:rounded-[18px] dark:bg-neutral-800"
                      placeholder="#FFFFFF"
                    />
                  </div>
                  <div className="mt-3 flex gap-2">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        className={cn(
                          "size-8 rounded-full transition-all hover:scale-110",
                          settings.color.toUpperCase() === color.toUpperCase()
                            ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-neutral-900"
                            : "ring-1 ring-neutral-200 dark:ring-neutral-700"
                        )}
                        style={{ backgroundColor: color }}
                        aria-label={`Set color to ${color}`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-neutral-500 text-xs">
                    Note: Color is applied via CSS, not as a prop
                  </p>
                </div>

                {/* Size */}
                <div>
                  <label className="mb-3 flex items-center justify-between font-sans text-sm font-medium">
                    <span className="flex items-center gap-2">
                      <Maximize2 className="size-4 text-neutral-400" />
                      Size
                    </span>
                    <span className="font-mono text-neutral-500 text-xs">{settings.size}px</span>
                  </label>
                  <input
                    type="range"
                    min="16"
                    max="128"
                    value={settings.size}
                    onChange={(e) => handleSizeChange(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={handleCopyCustomCode}
                    className="supports-[corner-shape:squircle]:corner-squircle flex flex-1 items-center justify-center gap-2 rounded-[12px] bg-primary px-4 py-3 font-sans text-sm text-white transition-opacity hover:opacity-90 supports-[corner-shape:squircle]:rounded-[18px]"
                  >
                    <Copy className="size-4" />
                    Copy Full Code
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="supports-[corner-shape:squircle]:corner-squircle flex flex-1 items-center justify-center gap-2 rounded-[12px] bg-neutral-100 px-4 py-2.5 font-sans text-sm transition-colors hover:bg-neutral-200 supports-[corner-shape:squircle]:rounded-[18px] dark:bg-neutral-800 dark:hover:bg-neutral-700"
                  >
                    <RotateCcw className="size-4" />
                    Reset
                  </button>
                  <button
                    onClick={handleRandomize}
                    className="supports-[corner-shape:squircle]:corner-squircle flex flex-1 items-center justify-center gap-2 rounded-[12px] bg-neutral-100 px-4 py-2.5 font-sans text-sm transition-colors hover:bg-neutral-200 supports-[corner-shape:squircle]:rounded-[18px] dark:bg-neutral-800 dark:hover:bg-neutral-700"
                  >
                    <Shuffle className="size-4" />
                    Random
                  </button>
                </div>
              </div>
            </div>

            {/* Keyboard Shortcuts Hint */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-neutral-400 text-sm dark:text-neutral-500">
              <span className="flex items-center gap-2">
                <kbd className="supports-[corner-shape:squircle]:corner-squircle min-w-[28px] rounded-[8px] bg-neutral-100 px-2 py-1 text-center font-mono text-xs font-semibold text-neutral-700 shadow-sm supports-[corner-shape:squircle]:rounded-[12px] dark:bg-neutral-800 dark:text-neutral-300">esc</kbd>
                <span>close</span>
              </span>
              <span className="flex items-center gap-2">
                <kbd className="supports-[corner-shape:squircle]:corner-squircle min-w-[28px] rounded-[8px] bg-neutral-100 px-2 py-1 text-center font-mono text-xs font-semibold text-neutral-700 shadow-sm supports-[corner-shape:squircle]:rounded-[12px] dark:bg-neutral-800 dark:text-neutral-300">c</kbd>
                <span>copy</span>
              </span>
              <span className="flex items-center gap-2">
                <kbd className="supports-[corner-shape:squircle]:corner-squircle min-w-[28px] rounded-[8px] bg-neutral-100 px-2 py-1 text-center font-mono text-xs font-semibold text-neutral-700 shadow-sm supports-[corner-shape:squircle]:rounded-[12px] dark:bg-neutral-800 dark:text-neutral-300">r</kbd>
                <span>reset</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};



