"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface PhoneMissedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhoneMissedIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// X/cross rotates on hover
const CROSS_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 22,
    },
  },
  animate: {
    rotate: 90,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 20,
    },
  },
};

const PhoneMissedIcon = forwardRef<PhoneMissedIconHandle, PhoneMissedIconProps>(
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
        style={{ ...props.style, overflow: "visible" }}
      >
        <svg
          fill="none"
          height={size}
          preserveAspectRatio="xMidYMid meet"
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
            d="m16 2 6 6"
            initial="normal"
            variants={CROSS_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="m22 2-6 6"
            initial="normal"
            variants={CROSS_VARIANTS}
          />
          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
        </svg>
      </div>
    );
  }
);

PhoneMissedIcon.displayName = "PhoneMissedIcon";

export { PhoneMissedIcon };
