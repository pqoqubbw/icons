"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface ArrowBigDownDashIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowBigDownDashIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DASH_VARIANTS: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 1, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const ARROW_VARIANTS: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 3, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const ArrowBigDownDashIcon = forwardRef<
  ArrowBigDownDashIconHandle,
  ArrowBigDownDashIconProps
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
        <motion.path animate={controls} d="M15 5H9" variants={DASH_VARIANTS} />
        <motion.path
          animate={controls}
          d="M15 9v3h4l-7 7-7-7h4V9z"
          variants={ARROW_VARIANTS}
        />
      </svg>
    </div>
  );
});

ArrowBigDownDashIcon.displayName = "ArrowBigDownDashIcon";

export { ArrowBigDownDashIcon };
