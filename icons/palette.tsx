"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface PaletteIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PaletteIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// "Ripple bloom": the palette stays still while the paint wells pulse outward
// in a staggered ripple, like fresh paint settling. Monochrome (currentColor).
const WELL_VARIANTS: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: (i: number) => ({
    scale: [1, 1.8, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: "easeOut",
    },
  }),
};

// Ordered as a sweep across the palette so the pulse travels like a ripple.
const WELLS = [
  { cx: 8.5, cy: 7.5 },
  { cx: 13.5, cy: 6.5 },
  { cx: 17.5, cy: 10.5 },
  { cx: 6.5, cy: 12.5 },
];

const PaletteIcon = forwardRef<PaletteIconHandle, PaletteIconProps>(
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
          <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
          {WELLS.map((well, i) => (
            <motion.circle
              animate={controls}
              custom={i}
              cx={well.cx}
              cy={well.cy}
              fill="currentColor"
              initial="normal"
              key={`${well.cx}-${well.cy}`}
              r=".5"
              style={{ transformOrigin: `${well.cx}px ${well.cy}px` }}
              variants={WELL_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  }
);

PaletteIcon.displayName = "PaletteIcon";

export { PaletteIcon };
