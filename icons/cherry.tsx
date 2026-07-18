"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import {
  forwardRef,
  type HTMLAttributes,
  type MouseEvent,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { cn } from "@/lib/utils";

export interface CherryIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CherryIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const GROUP_VARIANTS: Variants = {
  initial: {
    rotate: 0,
    transformOrigin: "top center",
  },
  animate: {
    rotate: [0, -12, 7, -4, 0],
    transformOrigin: "top center",
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const CherryIcon = forwardRef<CherryIconHandle, CherryIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("initial"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("initial");
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
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.g
            animate={controls}
            initial="initial"
            variants={GROUP_VARIANTS}
          >
            <motion.path
              d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"
              variants={GROUP_VARIANTS}
            />
            <motion.path
              d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"
              variants={GROUP_VARIANTS}
            />
            <motion.path
              d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"
              variants={GROUP_VARIANTS}
            />
            <motion.path
              d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"
              variants={GROUP_VARIANTS}
            />
          </motion.g>
        </motion.svg>
      </div>
    );
  }
);

CherryIcon.displayName = "CherryIcon";

export { CherryIcon };
