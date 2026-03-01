"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface HeartPulseIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HeartPulseIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const HEART_DRAW_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  hidden: { pathLength: 0, opacity: 0 },
  draw: { pathLength: [0, 1], opacity: [0, 1] },
};

const HEART_PULSE_VARIANTS: Variants = {
  normal: { scale: 1 },
  pulse: { scale: [1, 1.08, 1] },
};

const LINE_VARIANTS: Variants = {
  normal: { pathLength: 1, pathOffset: 0, opacity: 1 },
  animate: { pathLength: [0, 1], pathOffset: [1, 0], opacity: [0, 1] },
};

const HeartPulseIcon = forwardRef<HeartPulseIconHandle, HeartPulseIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const heartDrawControls = useAnimation();
    const heartPulseControls = useAnimation();
    const lineControls = useAnimation();
    const isControlledRef = useRef(false);

    const startAnimation = useCallback(async () => {
      heartDrawControls.start("hidden", { duration: 0 });
      await lineControls.start("animate", {
        duration: 0.6,
        ease: "linear",
        opacity: { duration: 0.1 },
      });
      await heartDrawControls.start("draw", {
        duration: 0.5,
        ease: "easeOut",
        opacity: { duration: 0.1 },
      });
      heartPulseControls.start("pulse", {
        duration: 0.9,
        repeat: 1,
        ease: "easeInOut",
      });
    }, [heartDrawControls, heartPulseControls, lineControls]);

    const stopAnimation = useCallback(() => {
      heartDrawControls.start("normal", { duration: 0.3 });
      heartPulseControls.start("normal", { duration: 0.3 });
      lineControls.start("normal", { duration: 0.3 });
    }, [heartDrawControls, heartPulseControls, lineControls]);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return { startAnimation, stopAnimation };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          startAnimation();
        }
      },
      [startAnimation, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          stopAnimation();
        }
      },
      [stopAnimation, onMouseLeave]
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
          <motion.g
            animate={heartPulseControls}
            style={{ originX: "12px", originY: "12px" }}
            variants={HEART_PULSE_VARIANTS}
          >
            <motion.path
              animate={heartDrawControls}
              d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
              variants={HEART_DRAW_VARIANTS}
            />
          </motion.g>
          <motion.path
            animate={lineControls}
            d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"
            variants={LINE_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

HeartPulseIcon.displayName = "HeartPulseIcon";

export { HeartPulseIcon };
