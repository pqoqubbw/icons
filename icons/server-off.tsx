"use client";

import { motion, useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ServerOffIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ServerOffIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [0, 1],
    transition: { duration: 0.4, ease: "linear" },
  },
};

const ServerOffIcon = forwardRef<ServerOffIconHandle, ServerOffIconProps>(
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
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
        >
          <motion.path
            d="M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5"
            animate={controls}
            initial="normal"
            variants={PATH_VARIANTS}
          />
          <motion.path
            d="M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z"
            animate={controls}
            initial="normal"
            variants={PATH_VARIANTS}
          />
          <motion.path
            d="M22 17v-1a2 2 0 0 0-2-2h-1"
            animate={controls}
            initial="normal"
            variants={PATH_VARIANTS}
          />
          <motion.path
            d="M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z"
            animate={controls}
            initial="normal"
            variants={PATH_VARIANTS}
          />
          <motion.path
            d="M6 18h.01"
            animate={controls}
            initial="normal"
            variants={PATH_VARIANTS}
          />
          <motion.path
            d="m2 2 20 20"
            animate={controls}
            initial="normal"
            variants={PATH_VARIANTS}
          />
        </motion.svg>
      </div>
    );
  },
);

ServerOffIcon.displayName = "ServerOffIcon";

export { ServerOffIcon };
