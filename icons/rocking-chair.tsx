"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface RockingChairIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface RockingChairIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 12,
  mass: 0.4,
};

const ROCKING_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [-5, 5, -5],
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "mirror" as const,
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

const RockingChairIcon = forwardRef<
  RockingChairIconHandle,
  RockingChairIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        animate={controls}
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        style={{ originX: "10%", originY: "90%" }}
        variants={ROCKING_VARIANTS}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.polyline
          animate={controls}
          points="3.5 2 6.5 12.5 18 12.5"
          transition={DEFAULT_TRANSITION}
        />
        <motion.line
          animate={controls}
          transition={DEFAULT_TRANSITION}
          x1="9.5"
          x2="5.5"
          y1="12.5"
          y2="20"
        />
        <motion.line
          animate={controls}
          transition={DEFAULT_TRANSITION}
          x1="15"
          x2="18.5"
          y1="12.5"
          y2="20"
        />
        <motion.path
          animate={controls}
          d="M2.75 18a13 13 0 0 0 18.5 0"
          transition={DEFAULT_TRANSITION}
        />
      </motion.svg>
    </div>
  );
});

RockingChairIcon.displayName = "RockingChairIcon";

export { RockingChairIcon };
