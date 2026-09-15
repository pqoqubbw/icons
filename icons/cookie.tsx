"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface CookieIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CookieIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const COOKIE_OUTLINE_LENGTH = 70;
const DRAW_DURATION = 0.45;
const CHIP_STAGGER = 0.08;

const CHIPS = [
  { cx: 11, cy: 17 },
  { cx: 12, cy: 12 },
  { cx: 16, cy: 16 },
  { cx: 16, cy: 3 },
  { cx: 21, cy: 4 },
  { cx: 21, cy: 8 },
  { cx: 7, cy: 14 },
  { cx: 9, cy: 8 },
];

const OUTLINE_VARIANTS: Variants = {
  normal: {
    strokeDashoffset: 0,
  },
  animate: {
    strokeDashoffset: [COOKIE_OUTLINE_LENGTH, 0],
    transition: {
      duration: DRAW_DURATION,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

const CHIPS_GROUP_VARIANTS: Variants = {
  normal: {},
  animate: {
    transition: {
      delayChildren: DRAW_DURATION,
      staggerChildren: CHIP_STAGGER,
    },
  },
};

const CHIP_VARIANTS: Variants = {
  normal: {
    scale: 1,
    transition: { duration: 0.2 },
  },
  animate: {
    scale: [0, 1],
    transition: {
      damping: 10,
      stiffness: 300,
      type: "spring",
    },
  },
};

const CookieIcon = forwardRef<CookieIconHandle, CookieIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const isAnimatingRef = useRef(false);

    const startAnimation = useCallback(async () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      try {
        await controls.start("animate");
      } finally {
        isAnimatingRef.current = false;
      }
    }, [controls]);

    const stopAnimation = useCallback(async () => {
      isAnimatingRef.current = false;
      await controls.start("normal");
    }, [controls]);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return { startAnimation, stopAnimation };
    }, [startAnimation, stopAnimation]);

    const handleMouseEnter = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(event);
        } else {
          startAnimation();
        }
      },
      [startAnimation, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(event);
        } else {
          stopAnimation();
        }
      },
      [stopAnimation, onMouseLeave]
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
          <motion.path
            animate={controls}
            d="M11.496 2c.324-.016.558.292.529.615a4 4 0 0 0 4.235 4.368.713.713 0 0 1 .758.757 4 4 0 0 0 4.366 4.237c.323-.03.63.204.614.527a10 10 0 0 1-2.915 6.566A10 10 0 1 1 4.93 4.918 10 10 0 0 1 11.496 2"
            initial="normal"
            strokeDasharray={COOKIE_OUTLINE_LENGTH}
            variants={OUTLINE_VARIANTS}
          />

          <motion.g
            animate={controls}
            initial="normal"
            variants={CHIPS_GROUP_VARIANTS}
          >
            {CHIPS.map((chip) => (
              <motion.circle
                cx={chip.cx}
                cy={chip.cy}
                fill="currentColor"
                key={`${chip.cx}-${chip.cy}`}
                r=".5"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                variants={CHIP_VARIANTS}
              />
            ))}
          </motion.g>
        </svg>
      </div>
    );
  }
);

CookieIcon.displayName = "CookieIcon";

export { CookieIcon };
