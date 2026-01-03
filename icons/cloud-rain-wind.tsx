"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface CloudRainWindIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CloudRainWindIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const WIND_VARIANTS: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const WIND_CHILD_VARIANTS: Variants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [1, 0.2, 1],
    transition: {
      duration: 1,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

const CloudRainWindIcon = forwardRef<
  CloudRainWindIconHandle,
  CloudRainWindIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 24, ...props }, ref) => {
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
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <motion.g animate={controls} initial="normal" variants={WIND_VARIANTS}>
          <motion.path d="m9.2 22 3-7" variants={WIND_CHILD_VARIANTS} />
          <motion.path d="m9 13-3 7" variants={WIND_CHILD_VARIANTS} />
          <motion.path d="m17 13-3 7" variants={WIND_CHILD_VARIANTS} />
        </motion.g>
      </svg>
    </div>
  );
});

CloudRainWindIcon.displayName = "CloudRainWindIcon";

export { CloudRainWindIcon };
