"use client";

import { motion, useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface WavesArrowUpIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WavesArrowUpIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const HEAD_VARIANTS: Variants = {
  normal: { 
    translateY: 0 },
  animate: {
    translateY: [0, -3, 0],
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
    scale: 1 
  },
  animate: {
    translateY: [0, -3, 0],
    scale: [1, 0.85, 1],
    originX: 1,
    originY: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const WavesArrowUpIcon = forwardRef<
  WavesArrowUpIconHandle,
  WavesArrowUpIconProps
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
      if (!isControlledRef.current) {
        controls.start("animate");
      } else {
        onMouseEnter?.(e);
      }
    },
    [controls, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start("normal");
      } else {
        onMouseLeave?.(e);
      }
    },
    [controls, onMouseLeave],
  );

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={controls}
        style={{ overflow: "visible" }}
      >
        {/* <motion.g animate={controls} initial="normal" variants={ARROW_VARIANTS}>  */}
          <motion.path d="M12 2v8" 
          animate={controls}
          initial="normal"
          variants={SHAFT_VARIANTS}
          />
          <motion.path d="m8 6 4-4 4 4"
          animate={controls}
          initial="normal"
          variants={HEAD_VARIANTS}
          />
        {/* </motion.g> */}
        <path d="M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      </motion.svg>
    </div>
  );
});

WavesArrowUpIcon.displayName = "WavesArrowUpIcon";

export { WavesArrowUpIcon };
