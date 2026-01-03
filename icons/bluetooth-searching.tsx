"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface BluetoothSearchingIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BluetoothSearchingIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: {
    scale: 1,
    transition: {
      repeat: 0,
    },
  },
  animate: {
    scale: [0, 1, 0.8],
  },
};

const SECOND_VARIANTS: Variants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [1, 0.8, 1],
    transition: { repeat: Number.POSITIVE_INFINITY },
  },
};

const BluetoothSearchingIcon = forwardRef<
  BluetoothSearchingIconHandle,
  BluetoothSearchingIconProps
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
        <motion.path
          animate={controls}
          d="m7 7 10 10-5 5V2l5 5L7 17"
          variants={SECOND_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M20.83 14.83a4 4 0 0 0 0-5.66"
          transition={{
            duration: 0.6,
            delay: 0.2,
            repeat: Number.POSITIVE_INFINITY,
          }}
          variants={PATH_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M18 12h.01"
          transition={{
            duration: 0.6,
            repeat: Number.POSITIVE_INFINITY,
          }}
          variants={PATH_VARIANTS}
        />
      </svg>
    </div>
  );
});

BluetoothSearchingIcon.displayName = "BluetoothSearchingIcon";

export { BluetoothSearchingIcon };
