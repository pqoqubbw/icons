"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ShipWheelIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ShipWheelIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SHIP_WHEEL_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    transition: { type: "spring", stiffness: 50, damping: 10 },
  },
  animate: {
    rotate: 180,
    transition: { type: "spring", stiffness: 50, damping: 10 },
  },
};

const ShipWheelIcon = forwardRef<ShipWheelIconHandle, ShipWheelIconProps>(
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
          variants={SHIP_WHEEL_VARIANTS}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="8" />
          <path d="M12 2v7.5" />
          <path d="m19 5-5.23 5.23" />
          <path d="M22 12h-7.5" />
          <path d="m19 19-5.23-5.23" />
          <path d="M12 14.5V22" />
          <path d="M10.23 13.77 5 19" />
          <path d="M9.5 12H2" />
          <path d="M10.23 10.23 5 5" />
          <circle cx="12" cy="12" r="2.5" />
        </motion.svg>
      </div>
    );
  }
);

ShipWheelIcon.displayName = "ShipWheelIcon";

export { ShipWheelIcon };
