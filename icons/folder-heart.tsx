"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes, MouseEvent } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface FolderHeartIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FolderHeartIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const HEART_VARIANTS: Variants = {
  normal: { scale: 1, opacity: 0.9 },
  animate: {
    scale: [1, 1.12, 1.04, 1.12, 1],
    opacity: [0.9, 1, 0.85, 1, 0.9],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

const FolderHeartIcon = forwardRef<FolderHeartIconHandle, FolderHeartIconProps>(
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
          <path d="M10.638 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.417" />
          <motion.path
            animate={controls}
            d="M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"
            initial="normal"
            style={{ transformOrigin: "18px 18px" }}
            variants={HEART_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

FolderHeartIcon.displayName = "FolderHeartIcon";

export { FolderHeartIcon };
