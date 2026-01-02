"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface RadioIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface RadioIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const VARIANTS: Variants = {
  normal: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  fadeOut: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
  fadeIn: (i: number) => ({
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: i * 0.1,
    },
  }),
};

const RadioIcon = forwardRef<RadioIconHandle, RadioIconProps>(
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
        stopAnimation: () => controls.start("normal"),
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
          <motion.path
            animate={controls}
            custom={1}
            d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"
            initial={{ opacity: 1 }}
            variants={VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={0}
            d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"
            initial={{ opacity: 1 }}
            variants={VARIANTS}
          />
          <circle cx="12" cy="12" r="2" />
          <motion.path
            animate={controls}
            custom={0}
            d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"
            initial={{ opacity: 1 }}
            variants={VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={1}
            d="M19.1 4.9C23 8.8 23 15.1 19.1 19"
            initial={{ opacity: 1 }}
            variants={VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

RadioIcon.displayName = "RadioIcon";

export { RadioIcon };
