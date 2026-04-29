"use client";

import { motion, useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface SwitchCameraIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SwitchCameraIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [0, 1],
    transition: { duration: 0.4, ease: "linear" },
  },
};

const SwitchCameraIcon = forwardRef<
  SwitchCameraIconHandle,
  SwitchCameraIconProps
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
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={controls}
      >
        <motion.path
          d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"
          animate={controls}
          initial="normal"
          variants={PATH_VARIANTS}
        />
        <motion.path
          d="M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5"
          animate={controls}
          initial="normal"
          variants={PATH_VARIANTS}
        />
        <circle cx="12" cy="12" r="3" />
        <motion.path
          d="m18 22-3-3 3-3"
          animate={controls}
          initial="normal"
          variants={PATH_VARIANTS}
        />
        <motion.path
          d="m6 2 3 3-3 3"
          animate={controls}
          initial="normal"
          variants={PATH_VARIANTS}
        />
      </motion.svg>
    </div>
  );
});

SwitchCameraIcon.displayName = "SwitchCameraIcon";

export { SwitchCameraIcon };
