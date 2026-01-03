"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface TornadoIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TornadoIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  animate: (custom: number) => ({
    x: [0, custom * 1, 0],
    opacity: 1,
    transition: {
      x: {
        duration: 0.6,
        repeat: 1,
        ease: "easeInOut",
        delay: custom * 0.1,
      },
    },
  }),
};

const TornadoIcon = forwardRef<TornadoIconHandle, TornadoIconProps>(
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
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={controls}
            custom={1}
            d="M21 4H3"
            initial="normal"
            variants={PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={2}
            d="M18 8H6"
            initial="normal"
            variants={PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={3}
            d="M19 12H9"
            initial="normal"
            variants={PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={4}
            d="M16 16h-6"
            initial="normal"
            variants={PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={5}
            d="M11 20H9"
            initial="normal"
            variants={PATH_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

TornadoIcon.displayName = "TornadoIcon";

export { TornadoIcon };
