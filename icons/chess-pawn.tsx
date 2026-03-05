"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface ChessPawnIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChessPawnIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const HEAD_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 16,
    },
  },
  animate: {
    x: [0, -5, 5, 0],
    rotate: [0, -15, 15, 0],
    transition: {
      duration: 2.4,
      times: [0, 0.33, 0.66, 1],
      ease: "easeInOut",
    },
  },
};

const BODY_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 16,
    },
  },
  animate: {
    rotate: [0, 5, 5, 5, 3, 0],
    transition: {
      duration: 1.8,
      times: [0, 0.08, 0.3, 0.52, 0.72, 1],
      ease: "easeInOut",
    },
  },
};

const ChessPawnIcon = forwardRef<ChessPawnIconHandle, ChessPawnIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const headControls = useAnimation();
    const bodyControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => {
          headControls.start("animate");
          bodyControls.start("animate");
        },
        stopAnimation: () => {
          headControls.start("normal");
          bodyControls.start("normal");
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          headControls.start("animate");
          bodyControls.start("animate");
        }
      },
      [headControls, bodyControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          headControls.start("normal");
          bodyControls.start("normal");
        }
      },
      [headControls, bodyControls, onMouseLeave]
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
          <motion.g
            animate={bodyControls}
            initial="normal"
            style={{ transformBox: "view-box", transformOrigin: "12px 21px" }}
            variants={BODY_VARIANTS}
          >
            <path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
            <path d="m14.5 10 1.5 8" />
            <path d="M7 10h10" />
            <path d="m8 18 1.5-8" />
          </motion.g>
          <motion.circle
            animate={headControls}
            cx="12"
            cy="6"
            initial="normal"
            r="4"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            variants={HEAD_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

ChessPawnIcon.displayName = "ChessPawnIcon";

export { ChessPawnIcon };
