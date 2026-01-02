"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface CursorClickIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CursorClickIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CURSOR_VARIANTS: Variants = {
  initial: { x: 0, y: 0 },
  hover: {
    x: [0, 0, -3, 0],
    y: [0, -4, 0, 0],
    transition: {
      duration: 1,
      bounce: 0.3,
    },
  },
};

const LINE_VARIANTS: Variants = {
  initial: { opacity: 1, x: 0, y: 0 },
  spread: (custom: { x: number; y: number }) => ({
    opacity: [0, 1, 0, 0, 0, 0, 1],
    x: [0, custom.x, 0, 0],
    y: [0, custom.y, 0, 0],
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 10,
      mass: 0.4,
    },
  }),
};

const CursorClickIcon = forwardRef<CursorClickIconHandle, CursorClickIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const clickControls = useAnimation();
    const cursorControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          cursorControls.start("hover");
          clickControls.start("spread", { delay: 1.3 });
        },
        stopAnimation: () => {
          cursorControls.start("initial");
          clickControls.start("initial");
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          cursorControls.start("hover");
          clickControls.start("spread", { delay: 1.3 });
        }
      },
      [clickControls, cursorControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          cursorControls.start("initial");
          clickControls.start("initial");
        }
      },
      [cursorControls, clickControls, onMouseLeave]
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
          <motion.path
            animate={cursorControls}
            d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"
            variants={CURSOR_VARIANTS}
          />
          <motion.path
            animate={clickControls}
            custom={{ x: 1, y: -1 }}
            d="M14 4.1 12 6"
            variants={LINE_VARIANTS}
          />
          <motion.path
            animate={clickControls}
            custom={{ x: -1, y: 0 }}
            d="m5.1 8-2.9-.8"
            variants={LINE_VARIANTS}
          />
          <motion.path
            animate={clickControls}
            custom={{ x: -1, y: 1 }}
            d="m6 12-1.9 2"
            variants={LINE_VARIANTS}
          />
          <motion.path
            animate={clickControls}
            custom={{ x: 0, y: -1 }}
            d="M7.2 2.2 8 5.1"
            variants={LINE_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

CursorClickIcon.displayName = "CursorClickIcon";

export { CursorClickIcon };
