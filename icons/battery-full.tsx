"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface BatteryFullIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BatteryFullIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LINE_VARIANTS: Variants = {
  initial: { opacity: 1 },
  fadeOut: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  fadeIn: (i: number) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.4,
      ease: "easeInOut",
    },
  }),
};

const BatteryFullIcon = forwardRef<BatteryFullIconHandle, BatteryFullIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: async () => {
          await controls.start("fadeOut");
          controls.start("fadeIn");
        },
        stopAnimation: () => controls.start("initial"),
      };
    });

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          await controls.start("fadeOut");
          controls.start("fadeIn");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("initial");
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
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect height="10" rx="2" ry="2" width="16" x="2" y="7" />
          <line x1="22" x2="22" y1="11" y2="13" />
          <motion.line
            animate={controls}
            custom={0}
            initial="initial"
            variants={LINE_VARIANTS}
            x1="6"
            x2="6"
            y1="11"
            y2="13"
          />
          <motion.line
            animate={controls}
            custom={1}
            initial="initial"
            variants={LINE_VARIANTS}
            x1="10"
            x2="10"
            y1="11"
            y2="13"
          />
          <motion.line
            animate={controls}
            custom={2}
            initial="initial"
            variants={LINE_VARIANTS}
            x1="14"
            x2="14"
            y1="11"
            y2="13"
          />
        </motion.svg>
      </div>
    );
  }
);

BatteryFullIcon.displayName = "BatteryFullIcon";

export { BatteryFullIcon };
