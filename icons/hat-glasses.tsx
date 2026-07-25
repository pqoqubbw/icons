"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface HatGlassesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HatGlassesIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const HAT_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    y: 0,
  },
  animate: {
    rotate: [0, -4, 2, 0],
    y: [0, -3, 1, 0],
    transition: {
      duration: 0.5,
      ease: "easeOut",
      times: [0, 0.35, 0.65, 1],
    },
  },
};

const GLASSES_VARIANTS: Variants = {
  normal: {
    scale: 1,
    y: 0,
  },
  animate: {
    scale: [1, 0.96, 1],
    y: [0, 1, 0],
    transition: {
      delay: 0.28,
      duration: 0.32,
      ease: "easeInOut",
    },
  },
};

const HatGlassesIcon = forwardRef<HatGlassesIconHandle, HatGlassesIconProps>(
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
        if (!isControlledRef.current) {
          controls.start("animate");
        }
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        }
        onMouseLeave?.(e);
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
          <motion.g
            animate={controls}
            initial="normal"
            style={{ originX: "12px", originY: "11px" }}
            variants={HAT_VARIANTS}
          >
            <path d="m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11" />
            <path d="M2 11h20" />
          </motion.g>

          <motion.g
            animate={controls}
            initial="normal"
            variants={GLASSES_VARIANTS}
          >
            <path d="M14 18a2 2 0 0 0-4 0" />
            <circle cx="17" cy="18" r="3" />
            <circle cx="7" cy="18" r="3" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

HatGlassesIcon.displayName = "HatGlassesIcon";

export { HatGlassesIcon };
