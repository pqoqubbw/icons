"use client";

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface BatteryChargingIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BatteryChargingIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BatteryChargingIcon = forwardRef<
  BatteryChargingIconHandle,
  BatteryChargingIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        <path d="M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935" />
        <path d="M22 14v-4" />
        <path d="M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936" />
        <motion.path
          animate={controls}
          d="m11 7-3 5h4l-3 5"
          initial="normal"
          style={{ originX: "50%", originY: "50%" }}
          variants={{
            normal: { scale: 1, opacity: 1 },
            animate: {
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1],
              transition: {
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            },
          }}
        />
      </svg>
    </div>
  );
});

BatteryChargingIcon.displayName = "BatteryChargingIcon";

export { BatteryChargingIcon };
