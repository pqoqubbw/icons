"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface PresentationIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PresentationIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SCREEN_PATH = "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3";
const TRANSITION = {
  duration: 0.85,
  times: [0, 0.3, 0.75, 1],
  ease: "easeInOut" as const,
};

const SCREEN_VARIANTS: Variants = {
  normal: { d: SCREEN_PATH, transition: { duration: 0.2 } },
  animate: {
    d: [
      SCREEN_PATH,
      "M21 3v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3",
      "M21 3v11.6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3",
      SCREEN_PATH,
    ],
    transition: TRANSITION,
  },
};

const STAND_VARIANTS: Variants = {
  normal: { y: 0, transition: { duration: 0.2 } },
  animate: { y: [0, -10, 0.6, 0], transition: TRANSITION },
};

const PresentationIcon = forwardRef<
  PresentationIconHandle,
  PresentationIconProps
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
        <path d="M2 3h20" />
        <motion.path
          animate={controls}
          d={SCREEN_PATH}
          initial="normal"
          variants={SCREEN_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="m7 21 5-5 5 5"
          initial="normal"
          variants={STAND_VARIANTS}
        />
      </svg>
    </div>
  );
});

PresentationIcon.displayName = "PresentationIcon";

export { PresentationIcon };
