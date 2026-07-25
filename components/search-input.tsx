"use client";

import { useHotkey } from "@tanstack/react-hotkeys";
import { SearchIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useRef } from "react";

import { Input } from "./ui/input";

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true, shallow: true })
  );

  useHotkey(
    "Mod+F",
    () => {
      inputRef.current?.focus();
      inputRef.current?.select();
    },
    {
      ignoreInputs: false,
    }
  );

  useHotkey(
    "Escape",
    () => {
      setSearchValue(null);
      inputRef.current?.blur();
    },
    {
      ignoreInputs: false,
    }
  );

  return (
    <div className="w-full max-w-[280px]">
      <Input
        aria-label="Search icons"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        className="shadow-sm"
        inputMode="search"
        leadingIcon={
          <SearchIcon
            className="size-4 text-neutral-400"
            strokeWidth={2.5}
          />
        }
        onChange={(e) => setSearchValue(e.target.value || null)}
        placeholder="Search icons..."
        ref={inputRef}
        role="search"
        spellCheck="false"
        trailingIcon={
          <div className="flex items-center justify-center gap-0.5">
            <kbd>⌘</kbd>
            <kbd>F</kbd>
          </div>
        }
        value={searchValue}
      />
    </div>
  );
};

export { SearchInput };
