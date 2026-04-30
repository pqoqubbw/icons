"use client";

import { useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface UtilityPoleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const UTILITY_POLE_VARIANTS: Variants = {
  normal: {
    rotateY: 0,
    scale: 1,
  },
  animate: {
    rotateY: 180,
    scale: [1, 1.2, 1.1, 1],
    transition: {
      rotateX: {
        duration: 0.8,
        ease: "easeInOut",
      },
      scale: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  },
};

interface UtilityPoleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const UtilityPoleIcon = forwardRef<UtilityPoleIconHandle, UtilityPoleIconProps>(
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
          variants={UTILITY_POLE_VARIANTS}
        >
          <path d="M12 2v20" />
          <path d="M2 5h20" />
          <path d="M3 3v2" />
          <path d="M7 3v2" />
          <path d="M17 3v2" />
          <path d="M21 3v2" />
          <path d="m19 5-7 7-7-7" />
        </motion.svg>
      </div>
    );
  },
);

UtilityPoleIcon.displayName = "UtilityPoleIcon";

export { UtilityPoleIcon };
