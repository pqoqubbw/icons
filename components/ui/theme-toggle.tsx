"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useHotkeys } from "react-hotkeys-hook";

type Theme = "light" | "dark" | "system";

const KEYS = ["ctrl+u", "meta+u"];

const ThemeToggle = () => {
  const { setTheme, theme: currentTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  const handleChangeTheme = (theme: Theme) => {
    if (theme === currentTheme) return;

    setTheme(theme);
  };

  useHotkeys(
    KEYS,
    () => {
      handleChangeTheme(nextTheme);
    },
    { preventDefault: true }
  );

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="flex size-9 cursor-pointer items-center justify-center bg-white focus-within:outline-offset-2 focus-visible:outline-1 focus-visible:outline-primary dark:bg-white/10"
      onClick={() => handleChangeTheme(nextTheme)}
      suppressHydrationWarning
      tabIndex={0}
      type="button"
    >
      <SunIcon
        aria-hidden="true"
        className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <MoonIcon
        aria-hidden="true"
        className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </button>
  );
};

export { ThemeToggle };
