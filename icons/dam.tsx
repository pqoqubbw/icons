"use client";

import { useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface DamIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface DamIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DamIcon = forwardRef<DamIconHandle, DamIconProps>(
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
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
        >
          <motion.path
            d="M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
            initial={{ pathLength: 1 }}
            variants={{
              normal: { pathLength: 1 },
              animate: {
                pathLength: [0, 1],
                transition: { duration: 0.4, ease: "linear" },
              },
            }}
          />
          <motion.path
            d="M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
            initial={{ pathLength: 1 }}
            variants={{
              normal: { pathLength: 1 },
              animate: {
                pathLength: [0, 1],
                transition: { duration: 0.4, ease: "linear" },
              },
            }}
          />
          <motion.path
            d="M2 10h4"
            initial={{ pathLength: 1 }}
            variants={{
              normal: { pathLength: 1 },
              animate: {
                pathLength: [0, 1],
                transition: { duration: 0.4, ease: "linear" },
              },
            }}
          />
          <motion.path
            d="M2 14h4"
            initial={{ pathLength: 1 }}
            variants={{
              normal: { pathLength: 1 },
              animate: {
                pathLength: [0, 1],
                transition: { duration: 0.4, ease: "linear" },
              },
            }}
          />
          <motion.path
            d="M2 18h4"
            initial={{ pathLength: 1 }}
            variants={{
              normal: { pathLength: 1 },
              animate: {
                pathLength: [0, 1],
                transition: { duration: 0.4, ease: "linear" },
              },
            }}
          />
          <motion.path
            d="M2 6h4"
            initial={{ pathLength: 1 }}
            variants={{
              normal: { pathLength: 1 },
              animate: {
                pathLength: [0, 1],
                transition: { duration: 0.4, ease: "linear" },
              },
            }}
          />
          <path d="M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z" />
        </motion.svg>
      </div>
    );
  },
);

DamIcon.displayName = "DamIcon";

export { DamIcon };
