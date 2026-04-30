"use client";

import { useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface FlowerIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FlowerIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FLOWER_VARIANTS = {
  initial: {
    scale: 1,
    rotate: 0,
  },
  animate: {
    scale: [1, 1.02, 1.04, 1],
    rotate: [0, 45, 90],
  },
};
const FlowerIcon = forwardRef<FlowerIconHandle, FlowerIconProps>(
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
          initial="initial"
          animate={controls}
          variants={FLOWER_VARIANTS}
        >
          <circle cx="12" cy="12" r="3" />
          <motion.path
            d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"
            animate={controls}
            initial={{ pathLength: 1 }}
            variants={{
              normal: { pathLength: 1 },
              animate: {
                pathLength: [0, 1],
                transition: { duration: 0.9, ease: "linear" },
              },
            }}
          />
          <motion.path d="M12 7.5V9" />
          <motion.path d="M7.5 12H9" />
          <motion.path d="M16.5 12H15" />
          <motion.path d="M12 16.5V15" />
          <motion.path d="M14.12 9.88 16 8" />
          <motion.path d="m8 8 1.88 1.88" />
          <motion.path d="m8 16 1.88-1.88" />
          <motion.path d="M14.12 14.12 16 16" />
        </motion.svg>
      </div>
    );
  },
);

FlowerIcon.displayName = "FlowerIcon";

export { FlowerIcon };
