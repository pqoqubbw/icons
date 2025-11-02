import Link from 'next/link';
import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ModeToggle } from '../ui/theme-toggle';
import { HeaderGithub } from './github';

const Header = () => {
  return (
    <header className="py-4 font-mono">
      <div className="container flex h-full w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-base">lucide-animated</h1>
        </Link>
        <Link
          href="/sponsorship"
          className={cn(
            'border-r-border group mr-4 ml-auto flex items-center gap-2 border-r pr-4 text-sm underline-offset-4 hover:underline',
            'hidden sm:flex'
          )}
        >
          sponsorship
          <div className="relative select-none">
            <Heart className="size-3 transition-all duration-200 group-hover:scale-110 group-hover:fill-red-500 group-hover:text-red-500" />
            <Heart
              className={cn(
                'size-3 animate-ping fill-red-500 text-red-600 duration-1000',
                'absolute inset-0 hidden group-hover:flex'
              )}
            />
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <HeaderGithub />
        </div>
      </div>
    </header>
  );
};

export { Header };
