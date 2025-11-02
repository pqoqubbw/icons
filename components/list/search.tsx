'use client';

import { useRef } from 'react';
import { parseAsString, useQueryState } from 'nuqs';
import { useHotkeys } from 'react-hotkeys-hook';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input';

const KEYS = ['ctrl+k', 'meta+k'];
const DEBOUNCE_DELAY = 300;

type Props = {
  count: number;
};

const ListSearch = ({ count }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''));

  const debouncedSetSearch = useDebouncedCallback(
    (value: string) => setSearch(value),
    DEBOUNCE_DELAY
  );

  useHotkeys(KEYS, () => inputRef.current?.focus(), { preventDefault: true });

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        placeholder={`Search ${count} icons...`}
        defaultValue={search ?? ''}
        onChange={(e) => debouncedSetSearch(e.target.value)}
      />
      <kbd className="bg-muted text-muted-foreground pointer-events-none absolute top-1/2 right-2 inline-flex h-5 -translate-y-1/2 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
        <span className="text-xs">⌘</span>K
      </kbd>
    </div>
  );
};

export { ListSearch };
