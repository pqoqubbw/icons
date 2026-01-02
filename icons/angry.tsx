"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface AngryIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AngryIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const EYEBROW_ROTATION = 20;
const DURATION = 0.6;

const PATH_VARIANTS_FACE: Variants = {
  normal: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.2, 1.2, 1.2, 1],
    rotate: [0, -3, 3, -1, 1, 0],
    transition: {
      duration: DURATION,
      times: [0, 0.2, 0.4, 0.6, 1],
      ease: "easeInOut",
    },
  },
};

const PATH_VARIANTS_LEFT_EYEBROW: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, EYEBROW_ROTATION, 0],
    transition: {
      duration: DURATION + 0.2,
    },
  },
};

const PATH_VARIANTS_RIGHT_EYEBROW: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -EYEBROW_ROTATION, 0],
    transition: {
      duration: DURATION + 0.2,
    },
  },
};

const PATH_VARIANTS_EYE: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: DURATION,
    },
  },
};

const PATH_VARIANTS_MOUTH: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -0.5, 0],
    transition: {
      duration: DURATION,
    },
  },
};

const AngryIcon = forwardRef<AngryIconHandle, AngryIconProps>(
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
          strokeWidth="2"
          variants={PATH_VARIANTS_FACE}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" />
          <motion.path
            animate={controls}
            d="M16 16s-1.5-2-4-2-4 2-4 2"
            variants={PATH_VARIANTS_MOUTH}
          />
          <motion.path
            animate={controls}
            d="M7.5 8 10 9"
            variants={PATH_VARIANTS_LEFT_EYEBROW}
          />
          <motion.path
            animate={controls}
            d="m14 9 2.5-1"
            variants={PATH_VARIANTS_RIGHT_EYEBROW}
          />
          <motion.path
            animate={controls}
            d="M9 10h.01"
            variants={PATH_VARIANTS_EYE}
          />
          <motion.path
            animate={controls}
            d="M15 10h.01"
            variants={PATH_VARIANTS_EYE}
          />
        </motion.svg>
      </div>
    );
  }
);

AngryIcon.displayName = "AngryIcon";

export { AngryIcon };
