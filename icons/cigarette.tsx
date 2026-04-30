"use client";

import { motion, useAnimation, Variants } from "motion/react";
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
          style={{ overflow: "visible" }}
        >
          <path d="M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14" />
          <motion.path
            d="M18 8c0-2.5-2-2.5-2-5"
            animate={controls}
            custom={0.1}
            initial="normal"
            variants={CIGARETTE_VARIANTS}
          />
          <path d="M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
          <motion.path
            d="M22 8c0-2.5-2-2.5-2-5"
            animate={controls}
            custom={0.3}
            initial="normal"
            variants={CIGARETTE_VARIANTS}
          />
          <path d="M7 12v4" />
        </motion.svg>
      </div>
    );
  },
);

CigaretteIcon.displayName = "CigaretteIcon";

export { CigaretteIcon };
