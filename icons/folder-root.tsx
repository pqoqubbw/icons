"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes, MouseEvent } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface FolderRootIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FolderRootIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ROOT_VARIANTS: Variants = {
  normal: { opacity: 0.6 },
  animate: {
    opacity: [0.6, 1, 0.3, 0.6],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

const FolderRootIcon = forwardRef<FolderRootIconHandle, FolderRootIconProps>(
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
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
          <motion.circle
            animate={controls}
            cx="12"
            cy="13"
            initial="normal"
            r="2"
            variants={ROOT_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M12 15v5"
            initial="normal"
            variants={ROOT_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

FolderRootIcon.displayName = "FolderRootIcon";

export { FolderRootIcon };
