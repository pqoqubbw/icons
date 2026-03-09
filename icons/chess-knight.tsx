"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes, MouseEvent } from "react";
import { forwardRef, useCallback, useImperativeHandle } from "react";

import { cn } from "@/lib/utils";

export interface ChessKnightIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChessKnightIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const KNIGHT_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 12,
    },
  },
  animate: {
    rotate: [0, 12, 38, 42, 38, 10, -5, 0],
    y: [0, -2, -9, -12, -9, -2, 1, 0],
    transition: {
      duration: 0.9,
      times: [0, 0.1, 0.3, 0.45, 0.6, 0.78, 0.9, 1],
      ease: "easeInOut",
    },
  },
};

const ChessKnightIcon = forwardRef<ChessKnightIconHandle, ChessKnightIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlled = !!ref;

    useImperativeHandle(
      ref,
      () => ({
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      }),
      [controls]
    );

    const handleMouseEnter = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (isControlled) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, isControlled, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (isControlled) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, isControlled, onMouseLeave]
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
            style={{ transformBox: "view-box", transformOrigin: "12px 22px" }}
            variants={KNIGHT_VARIANTS}
          >
            <path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
            <path d="M16.5 18c1-2 2.5-5 2.5-9a7 7 0 0 0-7-7H6.635a1 1 0 0 0-.768 1.64L7 5l-2.32 5.802a2 2 0 0 0 .95 2.526l2.87 1.456" />
            <path d="m15 5 1.425-1.425" />
            <path d="m17 8 1.53-1.53" />
            <path d="M9.713 12.185 7 18" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

ChessKnightIcon.displayName = "ChessKnightIcon";

export { ChessKnightIcon };
