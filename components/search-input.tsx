import { useHotkey } from "@tanstack/react-hotkeys";
import { SearchIcon } from "lucide-react";

import { Portal } from "@/components/ui/portal";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

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
  useHotkey(
    "Mod+F",
    () => {
      setSearchOpen(!searchOpen);
      setSearchValue("");
    },
    {
      ignoreInputs: false,
    }
  );

  useHotkey(
    "Escape",
    () => {
      setSearchOpen(false);
      setSearchValue("");
    },
    {
      ignoreInputs: false,
    }
  );

  return (
    <>
      <div
        className={cn(
          "hidden items-center justify-end gap-1 pr-4 pb-2 opacity-100 transition-opacity duration-75 md:flex",
          searchOpen && "opacity-0"
        )}
      >
        <div className="flex items-center justify-center gap-0.5">
          <kbd>⌘</kbd>
          <kbd>F</kbd>
        </div>
        <span className="font-sans text-neutral-500 text-sm dark:text-neutral-500">
          for the search
        </span>
      </div>
      {searchOpen && (
        <Portal>
          <div className="fixed top-4 right-4 w-[400px]">
            <Input
              aria-label="Search icons"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              autoFocus
              className="shadow-sm"
              inputMode="search"
              leadingIcon={
                <SearchIcon
                  className="size-4 text-neutral-400"
                  strokeWidth={2.5}
                />
              }
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search icons..."
              role="search"
              spellCheck="false"
              trailingIcon={<kbd className="w-8">esc</kbd>}
              value={searchValue}
            />
          </div>
        </Portal>
      )}
    </>
  );
};

export { SearchInput };
