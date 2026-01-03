"use client";

import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface MinimizeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MinimizeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 25,
};

const MinimizeIcon = forwardRef<MinimizeIconHandle, MinimizeIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
          <motion.path
            animate={controls}
            d="M8 3v3a2 2 0 0 1-2 2H3"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: "0%", translateY: "0%" },
              animate: { translateX: "2px", translateY: "2px" },
            }}
          />
          <motion.path
            animate={controls}
            d="M21 8h-3a2 2 0 0 1-2-2V3"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: "0%", translateY: "0%" },
              animate: { translateX: "-2px", translateY: "2px" },
            }}
          />
          <motion.path
            animate={controls}
            d="M3 16h3a2 2 0 0 1 2 2v3"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: "0%", translateY: "0%" },
              animate: { translateX: "2px", translateY: "-2px" },
            }}
          />
          <motion.path
            animate={controls}
            d="M16 21v-3a2 2 0 0 1 2-2h3"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: "0%", translateY: "0%" },
              animate: { translateX: "-2px", translateY: "-2px" },
            }}
          />
        </svg>
      </div>
    );
  }
);

MinimizeIcon.displayName = "MinimizeIcon";

export { MinimizeIcon };
