"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface WavesArrowDownIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WavesArrowDownIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const HEAD_VARIANTS: Variants = {
  normal: {
    translateY: 0,
  },
  animate: {
    translateY: [0, 3, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const SHAFT_VARIANTS: Variants = {
  normal: {
    translateX: 0,
    translateY: 0,
    scale: 1,
  },
  animate: {
    translateY: [0, 3, 0],
    scale: [1, 0.85, 1],
    originX: 1,
    originY: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const WavesArrowDownIcon = forwardRef<
  WavesArrowDownIconHandle,
  WavesArrowDownIconProps
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
      <motion.svg
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        style={{ overflow: "visible" }}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          animate={controls}
          d="M12 10L12 2"
          initial="normal"
          variants={SHAFT_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M16 6L12 10L8 6"
          initial="normal"
          variants={HEAD_VARIANTS}
        />
        <path d="M2 15C2.6 15.5 3.2 16 4.5 16C7 16 7 14 9.5 14C12.1 14 11.9 16 14.5 16C17 16 17 14 19.5 14C20.8 14 21.4 14.5 22 15" />
        <path d="M2 21C2.6 21.5 3.2 22 4.5 22C7 22 7 20 9.5 20C12.1 20 11.9 22 14.5 22C17 22 17 20 19.5 20C20.8 20 21.4 20.5 22 21" />
      </motion.svg>
    </div>
  );
});

WavesArrowDownIcon.displayName = "WavesArrowDownIcon";

export { WavesArrowDownIcon };
