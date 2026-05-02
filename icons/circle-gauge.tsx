"use client";

import { motion, Transition, useAnimation, Variants } from "motion/react";
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

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 160,
  damping: 17,
  mass: 1,
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
          animate={controls}
          initial="normal"
          transition={DEFAULT_TRANSITION}
          variants={{
            animate: { translateX: 0.5, translateY: 3, rotate: 72, scale: 1.2 },
            normal: {
              translateX: 0,
              rotate: 0,
              translateY: 0,
              scale: 1,
            },
          }}
        >
          <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
          <circle cx="12" cy="12" r="2" />
          <path d="M13.4 10.6 19 5" />
        </motion.svg>
      </div>
    );
  },
);

CircleGaugeIcon.displayName = "CircleGaugeIcon";

export { CircleGaugeIcon };
