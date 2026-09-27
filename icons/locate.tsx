"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface LocateIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LocateIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CENTER = 12;
const FULL_RADIUS = 7;
// Outer ends of the tick marks at rest (x/y = 2 on the near side, 22 on the far side).
const TICK_OUTER_NEAR = 2;
const TICK_OUTER_FAR = 22;
// How far the tick marks' outer ends get pulled toward the center while the
// ring is collapsed, and how far they overshoot outward on the final bounce.
const TICK_PULL = 0.75;
const TICK_OVERSHOOT = 0.25;

// Ring radius over time: collapse to a dot, hold a beat, bounce out to half
// size, then bounce out to full size. Each bounce slightly overshoots its
// target before settling, giving a "locating" pulse.
const RADIUS_KEYFRAMES = [7, 1, 1, 4.25, 3.5, 7.7, 7];

// Tick outer-end inset on the same timeline: pulled in as the ring collapses,
// held through the half-size bounce, released with the final bounce.
const TICK_INSET_KEYFRAMES = [
  0,
  TICK_PULL,
  TICK_PULL,
  TICK_PULL,
  TICK_PULL,
  -TICK_OVERSHOOT,
  0,
];

const ANIMATE_TRANSITION: Transition = {
  duration: 1.2,
  times: [0, 0.28, 0.36, 0.52, 0.62, 0.84, 1],
  ease: ["easeInOut", "linear", "easeOut", "easeInOut", "easeOut", "easeInOut"],
};

const NORMAL_TRANSITION: Transition = {
  duration: 0.2,
  ease: "easeOut",
};

// The tick marks' inner ends ride along with the ring so they stretch inward
// as it shrinks, while their outer ends are gently drawn in and then released.
const INNER_BEFORE_CENTER = RADIUS_KEYFRAMES.map((r) => CENTER - r); // west x2, north y2
const INNER_AFTER_CENTER = RADIUS_KEYFRAMES.map((r) => CENTER + r); // east x1, south y1
const OUTER_BEFORE_CENTER = TICK_INSET_KEYFRAMES.map(
  (inset) => TICK_OUTER_NEAR + inset
); // west x1, north y1
const OUTER_AFTER_CENTER = TICK_INSET_KEYFRAMES.map(
  (inset) => TICK_OUTER_FAR - inset
); // east x2, south y2

const CIRCLE_VARIANTS: Variants = {
  normal: { r: FULL_RADIUS, transition: NORMAL_TRANSITION },
  animate: { r: RADIUS_KEYFRAMES, transition: ANIMATE_TRANSITION },
};

const WEST_VARIANTS: Variants = {
  normal: {
    x1: TICK_OUTER_NEAR,
    x2: CENTER - FULL_RADIUS,
    transition: NORMAL_TRANSITION,
  },
  animate: {
    x1: OUTER_BEFORE_CENTER,
    x2: INNER_BEFORE_CENTER,
    transition: ANIMATE_TRANSITION,
  },
};

const EAST_VARIANTS: Variants = {
  normal: {
    x1: CENTER + FULL_RADIUS,
    x2: TICK_OUTER_FAR,
    transition: NORMAL_TRANSITION,
  },
  animate: {
    x1: INNER_AFTER_CENTER,
    x2: OUTER_AFTER_CENTER,
    transition: ANIMATE_TRANSITION,
  },
};

const NORTH_VARIANTS: Variants = {
  normal: {
    y1: TICK_OUTER_NEAR,
    y2: CENTER - FULL_RADIUS,
    transition: NORMAL_TRANSITION,
  },
  animate: {
    y1: OUTER_BEFORE_CENTER,
    y2: INNER_BEFORE_CENTER,
    transition: ANIMATE_TRANSITION,
  },
};

const SOUTH_VARIANTS: Variants = {
  normal: {
    y1: CENTER + FULL_RADIUS,
    y2: TICK_OUTER_FAR,
    transition: NORMAL_TRANSITION,
  },
  animate: {
    y1: INNER_AFTER_CENTER,
    y2: OUTER_AFTER_CENTER,
    transition: ANIMATE_TRANSITION,
  },
};

const LocateIcon = forwardRef<LocateIconHandle, LocateIconProps>(
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
          <motion.line
            animate={controls}
            initial="normal"
            variants={WEST_VARIANTS}
            x1="2"
            x2="5"
            y1="12"
            y2="12"
          />
          <motion.line
            animate={controls}
            initial="normal"
            variants={EAST_VARIANTS}
            x1="19"
            x2="22"
            y1="12"
            y2="12"
          />
          <motion.line
            animate={controls}
            initial="normal"
            variants={NORTH_VARIANTS}
            x1="12"
            x2="12"
            y1="2"
            y2="5"
          />
          <motion.line
            animate={controls}
            initial="normal"
            variants={SOUTH_VARIANTS}
            x1="12"
            x2="12"
            y1="19"
            y2="22"
          />
          <motion.circle
            animate={controls}
            cx="12"
            cy="12"
            initial="normal"
            r="7"
            variants={CIRCLE_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

LocateIcon.displayName = "LocateIcon";

export { LocateIcon };
