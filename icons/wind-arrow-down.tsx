"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface WindArrowDownIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WindArrowDownIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const WIND_VARIANTS: Variants = {
  normal: (custom: number) => ({
    pathLength: 1,
    opacity: 1,
    pathOffset: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: custom,
    },
  }),
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: custom,
    },
  }),
};

const ARROW_VARIANTS: Variants = {
  normal: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  animate: {
    y: [-10, 0],
    opacity: [0, 1],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 0.35,
    },
  },
};

const WindArrowDownIcon = forwardRef<
  WindArrowDownIconHandle,
  WindArrowDownIconProps
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
        <motion.path
          animate={controls}
          custom={0.2}
          d="M12.8 21.6A2 2 0 1 0 14 18H2"
          initial="normal"
          variants={WIND_VARIANTS}
        />
        <motion.path
          animate={controls}
          custom={0.4}
          d="M17.5 10a2.5 2.5 0 1 1 2 4H2"
          initial="normal"
          variants={WIND_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M10 2v8"
          initial="normal"
          variants={ARROW_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="m6 6 4 4 4-4"
          initial="normal"
          variants={ARROW_VARIANTS}
        />
      </svg>
    </div>
  );
});

WindArrowDownIcon.displayName = "WindArrowDownIcon";

export { WindArrowDownIcon };
