"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface AlarmClockCheckIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AlarmClockCheckIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
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
    y: -1.5,
    x: [-1, 1, -1, 1, -1, 0],
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

const SECONDARY_PATH_VARIANTS: Variants = {
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

const AlarmClockCheckIcon = forwardRef<
  AlarmClockCheckIconHandle,
  AlarmClockCheckIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  const resetToNormal = useCallback(() => {
    controls.stop();
    controls.start("normal").catch(() => {
      // ignore when interrupted by a new animation
    });
  }, [controls]);

  useImperativeHandle(ref, () => {
    isControlledRef.current = ref != null;
    return {
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => resetToNormal(),
    };
  }, [controls, ref, resetToNormal]);

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
        resetToNormal();
      }
    },
    [onMouseLeave, resetToNormal]
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
        <motion.circle
          animate={controls}
          cx="12"
          cy="13"
          initial="normal"
          r="8"
          variants={PATH_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M5 3 2 6"
          initial="normal"
          variants={SECONDARY_PATH_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="m22 6-3-3"
          initial="normal"
          variants={SECONDARY_PATH_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M6.38 18.7 4 21"
          initial="normal"
          variants={PATH_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M17.64 18.67 20 21"
          initial="normal"
          variants={PATH_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="m9 13 2 2 4-4"
          initial="normal"
          variants={PATH_VARIANTS}
        />
      </motion.svg>
    </div>
  );
});

AlarmClockCheckIcon.displayName = "AlarmClockCheckIcon";

export { AlarmClockCheckIcon };
