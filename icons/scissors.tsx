"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface ScissorsIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ScissorsIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Both blades are rigid bodies pivoting around the rivet at 12,12: the handle
// and the tip sit on opposite sides of it, so a single rotation opens the
// handles and the tips together, the way real scissors move.
const TRANSITION: Transition = {
  duration: 0.65,
  ease: "easeInOut",
  repeat: Number.POSITIVE_INFINITY,
  repeatType: "loop",
};

// Open wide, snip past the closed position, settle back.
const TOP_BLADE_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 11, -5, 0],
    transition: TRANSITION,
  },
};

const BOTTOM_BLADE_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -11, 5, 0],
    transition: TRANSITION,
  },
};

const PIVOT = { transformOrigin: "12px 12px" } as const;

const ScissorsIcon = forwardRef<ScissorsIconHandle, ScissorsIconProps>(
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
          className="overflow-visible"
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
          {/* top-left handle, tip pointing bottom-right */}
          <motion.g
            animate={controls}
            initial="normal"
            style={PIVOT}
            variants={TOP_BLADE_VARIANTS}
          >
            <circle cx="6" cy="6" r="3" />
            <path d="M8.12 8.12 12 12" />
            <path d="M14.8 14.8 20 20" />
          </motion.g>
          {/* bottom-left handle, tip pointing top-right */}
          <motion.g
            animate={controls}
            initial="normal"
            style={PIVOT}
            variants={BOTTOM_BLADE_VARIANTS}
          >
            <circle cx="6" cy="18" r="3" />
            <path d="M20 4 8.12 15.88" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

ScissorsIcon.displayName = "ScissorsIcon";

export { ScissorsIcon };
