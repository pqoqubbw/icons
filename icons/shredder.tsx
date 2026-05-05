"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ShredderIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ShredderIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PAPER_PATH: Variants = {
  normal: {
    x: 0,
  },
  animate: {
    x: [0, 1.5, -1.5, 1, -1, 0.5, -0.5, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

const SHRED_PATH_VARIANTS: Variants = {
  normal: {
    y: 0,
    opacity: 1,
  },
  animate: (custom: number) => ({
    y: 3,
    opacity: [0, 1, 0],
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      duration: 1.5,
      ease: "easeInOut",
      delay: 0.2 * custom,
    },
  }),
};

const ShredderIcon = forwardRef<ShredderIconHandle, ShredderIconProps>(
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
        <motion.svg
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
          <motion.g animate={controls} initial="normal" variants={PAPER_PATH}>
            <path d="M4 13V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5" />
            <path d="M14 2v5a1 1 0 0 0 1 1h5" />
          </motion.g>
          <motion.path
            animate={controls}
            custom={0.2}
            d="M10 22v-5"
            initial="normal"
            variants={SHRED_PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={0.4}
            d="M14 19v-2"
            initial="normal"
            variants={SHRED_PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={0.6}
            d="M18 20v-3"
            initial="normal"
            variants={SHRED_PATH_VARIANTS}
          />
          <path d="M2 13h20" />
          <motion.path
            animate={controls}
            d="M6 20v-3"
            initial="normal"
            variants={SHRED_PATH_VARIANTS}
          />
        </motion.svg>
      </div>
    );
  }
);

ShredderIcon.displayName = "ShredderIcon";

export { ShredderIcon };
