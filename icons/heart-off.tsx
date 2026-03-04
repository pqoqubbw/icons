"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface HeartOffIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HeartOffIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 250,
      damping: 22,
    },
  },
  animate: {
    scale: 1.06,
    y: -1,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

// Diagonal slash path length: from (2,2) to (22,22) = 20√2 ≈ 28.28
const SLASH_LENGTH = 20 * Math.SQRT2;

const SLASH_VARIANTS: Variants = {
  // Default: line visible through heart
  normal: {
    scale: 1,
    y: 0,
    strokeDashoffset: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  // Hover: keep in sync with heart motion, add a subtle redraw
  animate: {
    scale: 1.06,
    y: -1,
    strokeDashoffset: [0, SLASH_LENGTH * 0.6, 0],
    transition: {
      duration: 0.4,
      times: [0, 0.35, 1],
      ease: "easeOut",
    },
  },
};

const HeartOffIcon = forwardRef<HeartOffIconHandle, HeartOffIconProps>(
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
          style={{ overflow: "visible" }}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={controls}
            d="M10.5 4.893a5.5 5.5 0 0 1 1.091.931.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 1.872-1.002 3.356-2.187 4.655"
            initial="normal"
            variants={PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="m16.967 16.967-3.459 3.346a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 2.747-4.761"
            initial="normal"
            variants={PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="m2 2 20 20"
            initial="normal"
            strokeDasharray={SLASH_LENGTH}
            variants={SLASH_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

HeartOffIcon.displayName = "HeartOffIcon";

export { HeartOffIcon };
