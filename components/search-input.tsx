import { SearchIcon } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';

import { Portal } from '@/components/ui/portal';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';

type SearchInputProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  searchOpen: boolean;
  setSearchOpen: (value: boolean) => void;
};

const SearchInput = ({
  searchValue,
  setSearchValue,
  searchOpen,
  setSearchOpen,
}: SearchInputProps) => {
  useHotkeys(
    'mod+F',
    () => {
      setSearchOpen(!searchOpen);
      setSearchValue('');
    },
    {
      preventDefault: true,
      enabled: true,
      enableOnFormTags: true,
      enableOnContentEditable: true,
    }
  );

  useHotkeys(
    'escape',
    () => {
      setSearchOpen(false);
      setSearchValue('');
    },
    {
      preventDefault: true,
      enabled: searchOpen,
      enableOnFormTags: true,
      enableOnContentEditable: true,
    }
  );

  return (
    <>
      <div
        className={cn(
          'hidden items-center justify-end gap-1 pr-4 pb-2 opacity-100 transition-opacity duration-75 md:flex',
          searchOpen && 'opacity-0'
        )}
      >
        <div className="flex items-center justify-center gap-0.5">
          <kbd>⌘</kbd>
          <kbd>F</kbd>
        </div>
        <span className="font-sans text-sm text-neutral-500 dark:text-neutral-500">
          for the search
        </span>
      </div>
      {searchOpen && (
        <Portal>
          <div className="fixed top-4 right-4 w-[400px]">
            <Input
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              inputMode="search"
              role="search"
              aria-label="Search icons"
              placeholder="Search icons..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              leadingIcon={
                <SearchIcon
                  strokeWidth={2.5}
                  className="size-4 text-neutral-400"
                />
              }
              trailingIcon={<kbd className="w-8">esc</kbd>}
              className="shadow-sm"
            />
          </div>
        </Portal>
      )}
    </>
  );
};

export { SearchInput };
