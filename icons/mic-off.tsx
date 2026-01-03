"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface MicOffIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MicOffIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LINE_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.4,
      delay: 0.15,
      opacity: { duration: 0.1 },
    },
  },
};

const MicOffIcon = forwardRef<MicOffIconHandle, MicOffIconProps>(
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
          <path d="M12 19v3" />
          <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
          <path d="M16.95 16.95A7 7 0 0 1 5 12v-2" />
          <path d="M18.89 13.23A7 7 0 0 0 19 12v-2" />
          <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
          <motion.path
            animate={controls}
            d="m2 2 20 20"
            initial="normal"
            variants={LINE_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

MicOffIcon.displayName = "MicOffIcon";

export { MicOffIcon };
