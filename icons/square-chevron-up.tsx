"use client";

import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface SquareChevronUpIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SquareChevronUpIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DEFAULT_TRANSITION: Transition = {
  times: [0, 0.4, 1],
  duration: 0.5,
};

const SquareChevronUpIcon = forwardRef<
  SquareChevronUpIconHandle,
  SquareChevronUpIconProps
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
      if (isControlledRef.current) {
        onMouseEnter?.(e);
      } else {
        controls.start("animate");
      }
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseLeave?.(e);
      } else {
        controls.start("normal");
      }
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
      <svg
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect height="18" rx="2" width="18" x="3" y="3" />
        <motion.path
          animate={controls}
          d="m8 14 4-4 4 4"
          transition={DEFAULT_TRANSITION}
          variants={{
            normal: { y: 0 },
            animate: { y: [0, -2, 0] },
          }}
        />
      </svg>
    </div>
  );
});

SquareChevronUpIcon.displayName = "SquareChevronUpIcon";

export { SquareChevronUpIcon };
