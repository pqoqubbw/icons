"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface SquareArrowLeftIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SquareArrowLeftIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SQUARE_VARIANTS: Variants = {
  normal: { transition: { duration: 0.4 } },
  animate: { transition: { duration: 0.6, ease: "easeInOut" } },
};

const PATH_VARIANTS: Variants = {
  normal: { d: "m12 8-4 4 4 4", translateX: 0, opacity: 1 },
  animate: {
    d: "m12 8-4 4 4 4",
    translateX: [0, 3, 0],
    transition: { duration: 0.4 },
  },
};

const SECOND_PATH_VARIANTS: Variants = {
  normal: { d: "M16 12H8", opacity: 1 },
  animate: {
    d: ["M16 12H8", "M16 12H13", "M16 12H8"],
    transition: { duration: 0.4 },
  },
};

const SquareArrowLeftIcon = forwardRef<
  SquareArrowLeftIconHandle,
  SquareArrowLeftIconProps
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
      if (isControlledRef.current) onMouseEnter?.(e);
      else controls.start("animate");
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) onMouseLeave?.(e);
      else controls.start("normal");
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
        <motion.rect
          animate={controls}
          height="18"
          initial="normal"
          rx="2"
          variants={SQUARE_VARIANTS}
          width="18"
          x="3"
          y="3"
        />
        <motion.path
          animate={controls}
          d="m12 8-4 4 4 4"
          initial="normal"
          variants={PATH_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M16 12H8"
          initial="normal"
          variants={SECOND_PATH_VARIANTS}
        />
      </svg>
    </div>
  );
});

SquareArrowLeftIcon.displayName = "SquareArrowLeftIcon";

export { SquareArrowLeftIcon };
