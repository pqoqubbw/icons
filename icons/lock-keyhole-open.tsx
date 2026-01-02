"use client";

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface LockKeyholeOpenIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LockKeyholeOpenIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LockKeyholeOpenIcon = forwardRef<
  LockKeyholeOpenIconHandle,
  LockKeyholeOpenIconProps
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
      <motion.svg
        animate={controls}
        fill="none"
        height={size}
        initial="normal"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transition={{
          duration: 1,
          ease: [0.4, 0, 0.2, 1],
        }}
        variants={{
          normal: {
            rotate: 0,
            scale: 1,
          },
          animate: {
            rotate: [2, 4, -2, 0],
            scale: [1.05, 0.95, 1.02, 1],
          },
        }}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="16" r="1" />
        <rect height="12" rx="2" width="18" x="3" y="10" />
        <motion.path
          animate={controls}
          d="M7 10V7a5 5 0 0 1 10 0v3"
          initial="normal"
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
          variants={{
            normal: {
              pathLength: 0.8,
            },
            animate: {
              pathLength: 1,
            },
          }}
        />
      </motion.svg>
    </div>
  );
});

LockKeyholeOpenIcon.displayName = "LockKeyholeOpenIcon";

export { LockKeyholeOpenIcon };
