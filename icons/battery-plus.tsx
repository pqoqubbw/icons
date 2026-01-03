"use client";

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface BatteryPlusIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BatteryPlusIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BatteryPlusIcon = forwardRef<BatteryPlusIconHandle, BatteryPlusIconProps>(
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
          <path d="M12.543 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.605" />
          <path d="M22 14v-4" />
          <path d="M7.606 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.606" />

          <motion.g
            animate={controls}
            initial="normal"
            style={{ originX: "50%", originY: "50%" }}
            variants={{
              normal: { opacity: 1, scale: 1 },
              animate: {
                opacity: [1, 0.5, 1],
                scale: [1, 0.8, 1.2, 1],
                transition: {
                  duration: 0.5,
                  ease: "easeInOut",
                },
              },
            }}
          >
            <path d="M10 9v6" />
            <path d="M7 12h6" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

BatteryPlusIcon.displayName = "BatteryPlusIcon";

export { BatteryPlusIcon };
