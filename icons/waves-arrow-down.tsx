"use client";

import { useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface WavesArrowDownIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WavesArrowDownIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ARROW_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: {
    y: 2,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
      mass: 1,
    },
  },
};

const WavesArrowDownIcon = forwardRef<
  WavesArrowDownIconHandle,
  WavesArrowDownIconProps
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
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.g animate={controls} initial="normal" variants={ARROW_VARIANTS}>
          <path d="M12 10L12 2" />
          <path d="M16 6L12 10L8 6" />
        </motion.g>
        <motion.path
          d="M2 15C2.6 15.5 3.2 16 4.5 16C7 16 7 14 9.5 14C12.1 14 11.9 16 14.5 16C17 16 17 14 19.5 14C20.8 14 21.4 14.5 22 15"
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
          d="M2 21C2.6 21.5 3.2 22 4.5 22C7 22 7 20 9.5 20C12.1 20 11.9 22 14.5 22C17 22 17 20 19.5 20C20.8 20 21.4 20.5 22 21"
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

WavesArrowDownIcon.displayName = "WavesArrowDownIcon";

export { WavesArrowDownIcon };
