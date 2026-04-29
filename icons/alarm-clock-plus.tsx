"use client";

import { useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface AlarmClockPlusIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AlarmClockPlusIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ALARM_CLOCK_PLUS_VARIANTS: Variants = {
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

const PLUS_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    y: 0,
  },
  animate: {
    rotate: 180, 
    y: -2,
    transition: {
      rotate: {
        duration: 0.4,
        ease: "easeInOut",
      },
      y: {
        duration: 0.2,
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  },
};

const AlarmClockPlusIcon = forwardRef<
  AlarmClockPlusIconHandle,
  AlarmClockPlusIconProps
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
          variants={ALARM_CLOCK_PLUS_VARIANTS}
        />
        <motion.path
          d="M5 3 2 6"
          animate={controls}
          initial="normal"
          variants={ALARM_CLOCK_PLUS_VARIANTS}
        />
        <motion.path
          d="m22 6-3-3"
          animate={controls}
          initial="normal"
          variants={ALARM_CLOCK_PLUS_VARIANTS}
        />
        <motion.path
          d="M6.38 18.7 4 21"
          animate={controls}
          initial="normal"
          variants={ALARM_CLOCK_PLUS_VARIANTS}
        />
        <motion.path
          d="M17.64 18.67 20 21"
          animate={controls}
          initial="normal"
          variants={ALARM_CLOCK_PLUS_VARIANTS}
        />
        <motion.g animate={controls} initial="normal" variants={PLUS_VARIANTS}>
          <path d="M12 10v6" />
          <path d="M9 13h6" />
        </motion.g>
      </motion.svg>
    </div>
  );
});

AlarmClockPlusIcon.displayName = "AlarmClockPlusIcon";

export { AlarmClockPlusIcon };
