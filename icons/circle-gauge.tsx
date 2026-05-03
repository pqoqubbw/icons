"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface CircleGaugeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CircleGaugeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CIRCLE_GAUGE_VARIANTS: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    rotate: 72,
  },
};

const CircleGaugeIcon = forwardRef<CircleGaugeIconHandle, CircleGaugeIconProps>(
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
          animate={controls}
          fill="none"
          height={size}
          initial="normal"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          variants={CIRCLE_GAUGE_VARIANTS}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
          <circle cx="12" cy="12" r="2" />
          <path d="M13.4 10.6 19 5" />
        </motion.svg>
      </div>
    );
  }
);

CircleGaugeIcon.displayName = "CircleGaugeIcon";

export { CircleGaugeIcon };
