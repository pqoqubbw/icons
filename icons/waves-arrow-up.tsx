"use client";

import { useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface WavesArrowUpIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WavesArrowUpIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ARROW_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: {
    y: -1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
      mass: 1,
    },
  },
};

const WavesArrowUpIcon = forwardRef<
  WavesArrowUpIconHandle,
  WavesArrowUpIconProps
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
        style={{ overflow: "visible" }}
      >
        <motion.g animate={controls} variants={ARROW_VARIANTS}>
          <path d="M12 2v8" />
          <path d="m8 6 4-4 4 4" />
        </motion.g>
        <motion.path
          d="M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
          animate={controls}
          initial={{ pathLength: 1 }}
          variants={{
            normal: { pathLength: 1 },
            animate: {
              pathLength: [0, 1],
              transition: { duration: 0.4, ease: "linear" },
            },
          }}
        />
        <motion.path
          d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
          animate={controls}
          initial={{ pathLength: 1 }}
          variants={{
            normal: { pathLength: 1 },
            animate: {
              pathLength: [0, 1],
              transition: { duration: 0.4, ease: "linear" },
            },
          }}
        />
      </motion.svg>
    </div>
  );
});

WavesArrowUpIcon.displayName = "WavesArrowUpIcon";

export { WavesArrowUpIcon };
