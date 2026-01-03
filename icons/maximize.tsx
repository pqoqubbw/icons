"use client";

import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface MaximizeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 25,
};

interface MaximizeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MaximizeIcon = forwardRef<MaximizeIconHandle, MaximizeIconProps>(
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
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={controls}
            d="M8 3H5a2 2 0 0 0-2 2v3"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: "0%", translateY: "0%" },
              animate: { translateX: "-2px", translateY: "-2px" },
            }}
          />

          <motion.path
            animate={controls}
            d="M21 8V5a2 2 0 0 0-2-2h-3"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: "0%", translateY: "0%" },
              animate: { translateX: "2px", translateY: "-2px" },
            }}
          />

          <motion.path
            animate={controls}
            d="M3 16v3a2 2 0 0 0 2 2h3"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: "0%", translateY: "0%" },
              animate: { translateX: "-2px", translateY: "2px" },
            }}
          />

          <motion.path
            animate={controls}
            d="M16 21h3a2 2 0 0 0 2-2v-3"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: "0%", translateY: "0%" },
              animate: { translateX: "2px", translateY: "2px" },
            }}
          />
        </svg>
      </div>
    );
  }
);

MaximizeIcon.displayName = "MaximizeIcon";

export { MaximizeIcon };
