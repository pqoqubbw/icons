"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ConciergeBellHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ConciergeBellProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const STEM_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: {
    y: 2,
    transition: { duration: 0.1 },
  },
};

const BELL_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -4, 4, -4, 4, -3, 3, 0],
    transition: {
      delay: 0.1,
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const SOUND_WAVES_VARIANTS: Variants = {
  normal: { opacity: 0, scale: 1 },
  animate: {
    opacity: [0, 1, 0],
    scale: [0.8, 1, 1.3],
    transition: {
      delay: 0.13,
      duration: 0.7,
      ease: "easeOut",
      times: [0, 0.2, 1],
    },
  },
};

const ConciergeBellIcon = forwardRef<ConciergeBellHandle, ConciergeBellProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    const triggerEffect = useCallback(() => {
      controls.start("animate").then(() => {
        controls.start("normal");
      });
    }, [controls]);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: triggerEffect,
        stopAnimation: () => controls.start("normal"),
      };
    });

    return (
      <div
        className={cn(className)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ overflow: "visible" }}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z" />

          <motion.g
            animate={controls}
            initial="normal"
            style={{ originX: "12px", originY: "16px" }}
            variants={BELL_VARIANTS}
          >
            <path d="M20 16a8 8 0 1 0-16 0" />

            <motion.g variants={STEM_VARIANTS}>
              <path d="M10 4h4" />
              <path d="M12 4v4" />
            </motion.g>
          </motion.g>

          <motion.g
            animate={controls}
            initial="normal"
            style={{ originX: "14px", originY: "18px" }}
            variants={SOUND_WAVES_VARIANTS}
          >
            <path d="M2 13a7 7 0 0 1 1-3.5" opacity="0.7" strokeWidth="1.5" />
            <path d="M21 13a7 7 0 0 0-1-3.5" opacity="0.7" strokeWidth="1.5" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

ConciergeBellIcon.displayName = "ConciergeBellIcon";

export { ConciergeBellIcon };
