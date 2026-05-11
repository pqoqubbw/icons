"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface AlarmSmokeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AlarmSmokeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ALARM_VARIANTS: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 0.2,
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

const SMOKE_VARIANTS: Variants = {
  normal: {
    y: 0,
    opacity: 1,
  },
  animate: {
    y: [6, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.4,
      ease: "easeOut",
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

const AlarmSmokeIcon = forwardRef<AlarmSmokeIconHandle, AlarmSmokeIconProps>(
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
          <motion.path
            animate={controls}
            d="M11 21c0-2.5 2-2.5 2-5"
            initial={{ y: 0, opacity: 1 }}
            variants={SMOKE_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M16 21c0-2.5 2-2.5 2-5"
            initial={{ y: 0, opacity: 1 }}
            variants={SMOKE_VARIANTS}
          />
          <motion.g
            animate={controls}
            initial={{ scale: 1, opacity: 1 }}
            variants={ALARM_VARIANTS}
          >
            <motion.path d="m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8" />
            <motion.path d="M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z" />
          </motion.g>
          <motion.path
            animate={controls}
            d="M6 21c0-2.5 2-2.5 2-5"
            initial={{ y: 0, opacity: 1 }}
            variants={SMOKE_VARIANTS}
          />
        </motion.svg>
      </div>
    );
  }
);

AlarmSmokeIcon.displayName = "AlarmSmokeIcon";

export { AlarmSmokeIcon };
