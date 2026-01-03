"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes, MouseEvent } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface FolderKeyIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FolderKeyIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const KEY_VARIANTS: Variants = {
  normal: { rotate: 0, x: 0 },
  animate: {
    rotate: [0, -15, 8, -5, 0],
    x: [0, 0.5, 0],
    transition: {
      duration: 0.9,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

const FolderKeyIcon = forwardRef<FolderKeyIconHandle, FolderKeyIconProps>(
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
      (event: MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(event);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(event);
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
          <path d="M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2" />
          <motion.g
            animate={controls}
            initial="normal"
            style={{ transformOrigin: "16px 18px" }}
            variants={KEY_VARIANTS}
          >
            <circle cx="16" cy="20" r="2" />
            <path d="m22 14-4.5 4.5" />
            <path d="m21 15 1 1" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

FolderKeyIcon.displayName = "FolderKeyIcon";

export { FolderKeyIcon };
