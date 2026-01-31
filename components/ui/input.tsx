import { Input as BaseInput } from "@base-ui/react/input";
import type * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<typeof BaseInput> {
  inputContainerClassName?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Input = ({
  inputContainerClassName,
  className,
  type,
  leadingIcon,
  trailingIcon,
  disabled,
  ...props
}: InputProps) => {
  return (
    <div
      className={cn(
        "group relative w-full data-disabled:pointer-events-none",
        inputContainerClassName
      )}
      data-disabled={disabled ? "" : undefined}
      data-slot="input-container"
    >
      {leadingIcon && (
        <span
          className="pointer-events-none absolute top-1/2 left-3 shrink-0 -translate-y-1/2 [&_svg]:shrink-0"
          data-slot="input-leading-icon"
        >
          {leadingIcon}
        </span>
      )}
      <BaseInput
        className={cn(
          "flex h-9 w-full min-w-0 px-3 py-1 text-sm outline-none ring-1",
          "bg-neutral-100 text-neutral-800 ring-neutral-300 selection:bg-primary selection:text-white placeholder:text-neutral-400/70 dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-800",
          "transition-[color,box-shadow,ring-color]",
          "focus-visible:ring-neutral-500 dark:focus-visible:ring-neutral-700",
          "supports-[corner-shape:squircle]:corner-squircle rounded-[14px] supports-[corner-shape:squircle]:rounded-[24px]",
          leadingIcon && "pl-10",
          trailingIcon && "pr-12",
          className
        )}
        data-slot="input"
        disabled={disabled}
        type={type}
        {...props}
      />
      {trailingIcon && (
        <span
          className="pointer-events-none absolute top-1/2 right-3 shrink-0 -translate-y-1/2 [&_svg]:shrink-0"
          data-slot="input-trailing-icon"
        >
          {trailingIcon}
        </span>
      )}
    </div>
  );
};

export { Input };
