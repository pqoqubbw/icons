"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface ChartScatterIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChartScatterIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DOT_VARIANTS: Variants = {
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.3,
    },
  }),
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  default: { opacity: 1 },
};

const ChartScatterIcon = forwardRef<
  ChartScatterIconHandle,
  ChartScatterIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: async () => {
        await controls.start("hidden");
        await controls.start("visible");
      },
      stopAnimation: async () => controls.start("default"),
    };
  });

  const handleMouseEnter = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseEnter?.(e);
      } else {
        await controls.start("hidden");
        await controls.start("visible");
      }
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseLeave?.(e);
      } else {
        await controls.start("default");
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
        initial="default"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          custom={0}
          cx="7.5"
          cy="7.5"
          fill="currentColor"
          r=".5"
          variants={DOT_VARIANTS}
        />
        <motion.circle
          custom={1}
          cx="18.5"
          cy="5.5"
          fill="currentColor"
          r=".5"
          variants={DOT_VARIANTS}
        />
        <motion.circle
          custom={2}
          cx="11.5"
          cy="11.5"
          fill="currentColor"
          r=".5"
          variants={DOT_VARIANTS}
        />
        <motion.circle
          custom={3}
          cx="7.5"
          cy="16.5"
          fill="currentColor"
          r=".5"
          variants={DOT_VARIANTS}
        />
        <motion.circle
          custom={4}
          cx="17.5"
          cy="14.5"
          fill="currentColor"
          r=".5"
          variants={DOT_VARIANTS}
        />
        <path d="M3 3v16a2 2 0 0 0 2 2h16" strokeWidth="2" />
      </motion.svg>
    </div>
  );
});

ChartScatterIcon.displayName = "ChartScatterIcon";

export { ChartScatterIcon };
