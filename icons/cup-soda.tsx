"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface CupSodaIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CupSodaIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const STRAW_VARIANTS: Variants = {
  normal: {
    y: 0,
    scaleY: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  animate: {
    y: [0, -2.2, 0.5, 0],
    scaleY: [1, 1.18, 0.97, 1],
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
      times: [0, 0.35, 0.65, 1],
    },
  },
};

const WAVE_VARIANTS: Variants = {
  normal: {
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  animate: {
    y: [0, -1, 0],
    transition: {
      duration: 1.8,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

const BUBBLE_VARIANTS: Variants = {
  normal: { opacity: 0, y: 0, scale: 1 },
  animate: (delay: number) => ({
    opacity: [0, 0.9, 0.4, 0],
    y: [0, -3, -10, -14],
    scale: [1, 1, 0.85, 0.6],
    transition: {
      duration: 1.5,
      ease: "easeIn",
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 0,
      times: [0, 0.08, 0.7, 1],
    },
  }),
};

const BUBBLES = [
  { delay: 0, cx: 8.25, cy: 20.5, r: 0.75 },
  { delay: 0.35, cx: 11.25, cy: 19.5, r: 0.6 },
  { delay: 0.7, cx: 14, cy: 20.75, r: 0.6 },
  { delay: 1.05, cx: 9.75, cy: 19, r: 0.75 },
  { delay: 0.55, cx: 12.5, cy: 20, r: 0.45 },
] as const;

const CupSodaIcon = forwardRef<CupSodaIconHandle, CupSodaIconProps>(
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
        className={cn("relative", className)}
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
          <path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8" />
          <path d="M5 8h14" />
          <motion.path
            animate={controls}
            d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"
            variants={WAVE_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="m12 8 1-6h2"
            style={{
              transformBox: "fill-box",
              originX: "50%",
              originY: "100%",
            }}
            variants={STRAW_VARIANTS}
          />
          {BUBBLES.map((b, i) => (
            <motion.circle
              animate={controls}
              custom={b.delay}
              cx={b.cx}
              cy={b.cy}
              fill="currentColor"
              initial="normal"
              key={i}
              r={b.r}
              stroke="none"
              style={{
                transformBox: "fill-box",
                originX: "50%",
                originY: "50%",
              }}
              variants={BUBBLE_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  }
);

CupSodaIcon.displayName = "CupSodaIcon";

export { CupSodaIcon };
