'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useHotkeys } from 'react-hotkeys-hook';

import { Button } from '@/components/ui/button';

type Theme = 'light' | 'dark' | 'system';

const KEYS = ['ctrl+u', 'meta+u'];

export function ModeToggle() {
  const { setTheme, theme: currentTheme } = useTheme();

  const handleChangeTheme = (theme: Theme) => {
    if (theme === currentTheme) return;

    if (!document.startViewTransition) return setTheme(theme);
    document.startViewTransition(() => setTheme(theme));
  };

  useHotkeys(
    KEYS,
    () => {
      handleChangeTheme(currentTheme === 'light' ? 'dark' : 'light');
    },
    { preventDefault: true }
  );

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() =>
        handleChangeTheme(currentTheme === 'light' ? 'dark' : 'light')
      }
      className="cursor-pointer"
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
