"use client";

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface RefreshCWOffIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface RefreshCWOffIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const RefreshCWOffIcon = forwardRef<
  RefreshCWOffIconHandle,
  RefreshCWOffIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) onMouseEnter?.(e);
      else controls.start("animate");
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) onMouseLeave?.(e);
      else controls.start("normal");
    },
    [controls, onMouseLeave]
  );

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.svg
        animate={controls}
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [-3, 3, -3, 3, 0],
            transition: { duration: 0.4 },
          },
        }}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47" />
        <path d="M8 16H3v5" />
        <path d="M3 12C3 9.51 4 7.26 5.64 5.64" />
        <path d="m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64" />
        <path d="M21 12c0 1-.16 1.97-.47 2.87" />
        <path d="M21 3v5h-5" />
        <path d="M22 22 2 2" />
      </motion.svg>
    </div>
  );
});

RefreshCWOffIcon.displayName = "RefreshCWOffIcon";

export { RefreshCWOffIcon };
