"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface CigaretteIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CigaretteIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CIGARETTE_VARIANTS: Variants = {
  normal: {
    y: 0,
    opacity: 1,
  },
  animate: (custom: number) => ({
    y: -3,
    opacity: [0, 1, 0],
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      duration: 1.5,
      ease: "easeInOut",
      delay: 0.2 * custom,
    },
  }),
};

const CigaretteIcon = forwardRef<CigaretteIconHandle, CigaretteIconProps>(
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
          <path d="M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14" />
          <motion.path
            animate={controls}
            custom={0.1}
            d="M18 8c0-2.5-2-2.5-2-5"
            initial="normal"
            variants={CIGARETTE_VARIANTS}
          />
          <path d="M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
          <motion.path
            animate={controls}
            custom={0.3}
            d="M22 8c0-2.5-2-2.5-2-5"
            initial="normal"
            variants={CIGARETTE_VARIANTS}
          />
          <path d="M7 12v4" />
        </motion.svg>
      </div>
    );
  }
);

CigaretteIcon.displayName = "CigaretteIcon";

export { CigaretteIcon };
