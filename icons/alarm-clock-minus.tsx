"use client";

import { useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface AlarmClockMinusIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AlarmClockMinusIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ALARAM_CLOCK_MINUS_VARIANTS: Variants = {
  normal: {
    y: 0,
    x: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 200,
      damping: 25,
    },
  },
  animate: {
    y: -2.5,
    x: [-2, 2, -2, 2, -2, 0],
    transition: {
      y: {
        duration: 0.2,
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
      x: {
        duration: 0.3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  },
};

const AlarmClockMinusIcon = forwardRef<
  AlarmClockMinusIconHandle,
  AlarmClockMinusIconProps
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
        <motion.circle
          cx="12"
          cy="13"
          r="8"
          animate={controls}
          initial="normal"
          variants={ALARAM_CLOCK_MINUS_VARIANTS}
        />
        <motion.path
          d="M5 3 2 6"
          animate={controls}
          initial="normal"
          variants={ALARAM_CLOCK_MINUS_VARIANTS}
        />
        <motion.path
          d="m22 6-3-3"
          animate={controls}
          initial="normal"
          variants={ALARAM_CLOCK_MINUS_VARIANTS}
        />
        <motion.path
          d="M6.38 18.7 4 21"
          animate={controls}
          initial="normal"
          variants={ALARAM_CLOCK_MINUS_VARIANTS}
        />
        <motion.path
          d="M17.64 18.67 20 21"
          animate={controls}
          initial="normal"
          variants={ALARAM_CLOCK_MINUS_VARIANTS}
        />
        <motion.path
          d="M9 13h6"
          animate={controls}
          initial="normal"
          variants={ALARAM_CLOCK_MINUS_VARIANTS}
        />
      </motion.svg>
    </div>
  );
});

AlarmClockMinusIcon.displayName = "AlarmClockMinusIcon";

export { AlarmClockMinusIcon };
