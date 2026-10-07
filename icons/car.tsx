"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface CarIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CarIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const WHEEL_VARIANTS: Variants = {
  normal: {
    scaleX: 1,
    scaleY: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  animate: {
    scaleX: [1, 1.12, 1, 1.06, 1],
    scaleY: [1, 0.9, 1, 0.95, 1],
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const BODY_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    y: [0, -0.6, 0, -0.4, 0],
    transition: {
      duration: 0.7,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
    },
  },
};

const SPEED_LINE_VARIANTS: Variants = {
  normal: {
    opacity: 0,
    x: 0,
    scaleX: 0,
  },
  animate: (custom: number) => ({
    opacity: [0, 0.7, 0.5, 0],
    x: [0, -4, -10, -16],
    scaleX: [0.2, 1, 0.8, 0.3],
    transition: {
      duration: 0.6,
      ease: "easeOut",
      repeat: Number.POSITIVE_INFINITY,
      delay: custom * 0.08,
      times: [0, 0.2, 0.6, 1],
    },
  }),
};

const CarIcon = forwardRef<CarIconHandle, CarIconProps>(
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
          className="overflow-visible"
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
          {[
            { y: 8, width: 5, x: 0 },
            { y: 11, width: 7, x: -1 },
            { y: 14, width: 4, x: 0 },
          ].map((line, i) => (
            <motion.line
              animate={controls}
              custom={i}
              initial="normal"
              key={`speed-${i}`}
              strokeLinecap="round"
              strokeWidth="2"
              variants={SPEED_LINE_VARIANTS}
              x1={line.x}
              x2={line.x + line.width}
              y1={line.y}
              y2={line.y}
            />
          ))}
          <motion.g
            animate={controls}
            initial="normal"
            variants={BODY_VARIANTS}
          >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          </motion.g>
          <motion.g
            animate={controls}
            initial="normal"
            style={{ transformOrigin: "7px 19px" }}
            variants={WHEEL_VARIANTS}
          >
            <circle cx="7" cy="17" r="2" />
          </motion.g>
          <motion.g
            animate={controls}
            initial="normal"
            variants={BODY_VARIANTS}
          >
            <path d="M9 17h6" />
          </motion.g>
          <motion.g
            animate={controls}
            initial="normal"
            style={{ transformOrigin: "17px 19px" }}
            variants={WHEEL_VARIANTS}
          >
            <circle cx="17" cy="17" r="2" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

CarIcon.displayName = "CarIcon";

export { CarIcon };
