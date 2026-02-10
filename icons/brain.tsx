"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface BrainIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BrainIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BRAIN_STEM_VARIANTS: Variants = {
  normal: { pathLength: 1, pathOffset: 0 },
  animate: {
    pathLength: [1, 0.4, 1],
    pathOffset: [0, 0.25, 0],
    transition: {
      duration: 1.4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const BRAIN_SIDE_VARIANTS: Variants = {
  normal: { pathLength: 1, pathOffset: 0 },
  animate: {
    pathLength: [1, 0.5, 1],
    pathOffset: [0, 0.25, 0],
    transition: {
      duration: 1.4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const BRAIN_TOP_ARC_VARIANTS: Variants = {
  normal: { pathLength: 1, pathOffset: 0 },
  animate: {
    pathLength: [1, 0.8, 1],
    pathOffset: [0, 0.07, 0],
    transition: {
      duration: 1.4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const BRAIN_LOWER_ARC_VARIANTS: Variants = {
  normal: { pathLength: 1, pathOffset: 0 },
  animate: {
    pathLength: [1, 0.8, 1],
    pathOffset: [0, 0.14, 0],
    transition: {
      duration: 1.4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const BrainIcon = forwardRef<BrainIconHandle, BrainIconProps>(
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
        <motion.svg
          animate={controls}
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          variants={{
            normal: {
              scale: 1,
              strokeWidth: 2,
            },
            animate: {
              scale: [1, 1.08, 1],
              strokeWidth: [2, 2.25, 2],
              transition: {
                duration: 1.4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                ease: "easeInOut",
              },
            },
          }}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={controls}
            d="M12 18V5"
            variants={BRAIN_STEM_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"
            variants={BRAIN_SIDE_VARIANTS}
          />

          <motion.path
            animate={controls}
            d="M12 5A3 3 0 1 1 17.598 6.5"
            variants={BRAIN_TOP_ARC_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M12 5A3 3 0 1 0 6.402 6.5"
            variants={BRAIN_TOP_ARC_VARIANTS}
          />

          <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />

          <motion.path
            animate={controls}
            d="M18 18a4 4 0 0 0 2-7.464"
            variants={BRAIN_LOWER_ARC_VARIANTS}
          />

          <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />

          <motion.path
            animate={controls}
            d="M6 18a4 4 0 0 1-2-7.464"
            variants={BRAIN_LOWER_ARC_VARIANTS}
          />
          <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
        </motion.svg>
      </div>
    );
  }
);

BrainIcon.displayName = "BrainIcon";

export { BrainIcon };
