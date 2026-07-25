"use client";

import {
  motion,
  type Transition,
  useAnimation,
  type Variants,
} from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface CloudBackupIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CloudBackupIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BACKUP_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: -360 },
};

const BACKUP_TRANSITION: Transition = {
  duration: 0.8,
  ease: "easeInOut",
};

const CloudBackupIcon = forwardRef<CloudBackupIconHandle, CloudBackupIconProps>(
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
          <path d="M21 15.251A4.5 4.5 0 0 0 17.5 8h-1.79A7 7 0 1 0 3 13.607" />
          <motion.g
            animate={controls}
            initial="normal"
            transition={BACKUP_TRANSITION}
            variants={BACKUP_VARIANTS}
          >
            <path d="M7 11v4h4" />
            <path d="M8 19a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5 4.82 4.82 0 0 0-3.41 1.41L7 15" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

CloudBackupIcon.displayName = "CloudBackupIcon";

export { CloudBackupIcon };
