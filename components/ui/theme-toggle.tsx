'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useHotkeys } from 'react-hotkeys-hook';

type Theme = 'light' | 'dark' | 'system';

const KEYS = ['ctrl+u', 'meta+u'];

const ThemeToggle = () => {
  const { setTheme, theme: currentTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';

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
      suppressHydrationWarning
      type="button"
      onClick={() => handleChangeTheme(nextTheme)}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      tabIndex={0}
      className="focus-visible:outline-primary flex size-9 cursor-pointer items-center justify-center bg-white focus-within:outline-offset-2 focus-visible:outline-1 dark:bg-white/10"
    >
      <SunIcon
        className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
        aria-hidden="true"
      />
      <MoonIcon
        className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
        aria-hidden="true"
      />
    </button>
  );
};

export { ThemeToggle };
