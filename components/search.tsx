'use client';

import { SearchIcon, XIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';

const Search = () => {
  const [search, setSearch] = useQueryState('q', {
    defaultValue: '',
    parse: (value) => value || '',
    history: 'replace',
    shallow: false,
    throttleMs: 300,
  });

  return (
    <div className="relative mt-8 w-full max-w-[642px] px-4">
      <div className="relative">
        <SearchIcon
          className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
          aria-hidden="true"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search icons..."
          className="h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 pl-9 pr-9 text-sm placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:placeholder:text-neutral-400"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 rounded-sm opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Clear search"
          >
            <XIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

export { Search };

