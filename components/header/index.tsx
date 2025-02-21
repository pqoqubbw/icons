import Link from 'next/link';
import { ModeToggle } from '../ui/theme-toggle';
import { HeaderGithub } from './github';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-4 font-mono">
      <div className="container w-full flex items-center justify-between h-full">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-base">pqoqubbw/icons</h1>
        </Link>
        <Link
          href="/sponsorship"
          className={cn(
            'ml-auto flex border-r border-r-border pr-4 mr-4 text-sm underline-offset-4 hover:underline items-center gap-2 group',
            'sm:flex hidden'
          )}
        >
          sponsorship
          <div className="relative select-none">
            <Heart className="size-3 group-hover:scale-110 transition-all duration-200 group-hover:text-red-500 group-hover:fill-red-500" />
            <Heart
              className={cn(
                'size-3 animate-ping duration-1000 fill-red-500 text-red-600',
                'group-hover:flex hidden absolute inset-0'
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
