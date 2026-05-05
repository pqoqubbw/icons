"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface SprayCanIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SprayCanIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SPRAY_DOT_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  animate: (index: number) => ({
    opacity: [0, 1, 0],
    transition: {
      delay: index * 0.07,
      duration: 1.05 + index * 0.06,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
      times: [0, 0.45, 1],
    },
  }),
};

const DOT_PATHS_RTL = [
  { d: "M11 7h.01", key: "dot-3" },
  { d: "M7 5h.01", key: "dot-2" },
  { d: "M7 9h.01", key: "dot-5" },
  { d: "M3 3h.01", key: "dot-1" },
  { d: "M3 7h.01", key: "dot-4" },
  { d: "M3 11h.01", key: "dot-6" },
] as const;

const SprayCanIcon = forwardRef<SprayCanIconHandle, SprayCanIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isAnimatingRef = useRef(false);

    const isRefControlled = ref != null;

    const startAnimation = useCallback(() => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      controls.start("animate").catch(() => {
        // ignore when interrupted by a new animation
      });
    }, [controls]);

    const stopAnimation = useCallback(async () => {
      isAnimatingRef.current = false;
      await controls.start("normal");
    }, [controls]);

    useImperativeHandle(
      ref,
      () => ({
        startAnimation,
        stopAnimation,
      }),
      [startAnimation, stopAnimation]
    );

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isRefControlled) {
          onMouseEnter?.(e);
        } else {
          startAnimation();
        }
      },
      [isRefControlled, startAnimation, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isRefControlled) {
          onMouseLeave?.(e);
        } else {
          stopAnimation();
        }
      },
      [isRefControlled, stopAnimation, onMouseLeave]
    );

    return (
      <div
        className={cn("inline-flex items-center justify-center", className)}
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
          <rect height="4" width="4" x="15" y="5" />
          <path d="m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2" />
          <path d="m13 14 8-2" />
          <path d="m13 19 8-2" />
          <g>
            {DOT_PATHS_RTL.map((item, index) => (
              <motion.path
                animate={controls}
                custom={index}
                d={item.d}
                initial="normal"
                key={item.key}
                variants={SPRAY_DOT_VARIANTS}
              />
            ))}
          </g>
        </svg>
      </div>
    );
  }
);

SprayCanIcon.displayName = "SprayCanIcon";

export { SprayCanIcon };
