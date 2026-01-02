"use client";

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface BatteryIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BatteryIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BatteryIcon = forwardRef<BatteryIconHandle, BatteryIconProps>(
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
          <rect height="12" rx="2" width="16" x="2" y="6" />
          <path d="M22 14v-4" />

          <motion.rect
            animate={controls}
            fill="currentColor"
            height="8"
            initial="normal"
            rx="1"
            stroke="none"
            variants={{
              normal: { width: 0, opacity: 0 },
              animate: {
                width: 12,
                opacity: 1,
                transition: { duration: 0.4, ease: "easeOut" },
              },
            }}
            x="4"
            y="8"
          />
        </svg>
      </div>
    );
  }
);

BatteryIcon.displayName = "BatteryIcon";

export { BatteryIcon };
