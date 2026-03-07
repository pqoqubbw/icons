"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

export interface AmbulanceIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AmbulanceIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BODY_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    y: [0, -1, 0, -0.5, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
    },
  },
};

const WHEEL_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 0.5,
      ease: "linear",
      repeat: Number.POSITIVE_INFINITY,
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
      duration: 0.5,
      ease: "easeOut",
      repeat: Number.POSITIVE_INFINITY,
      delay: custom * 0.08,
      times: [0, 0.2, 0.6, 1],
    },
  }),
};

const CROSS_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 0.3, 1],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

const AmbulanceIcon = forwardRef<AmbulanceIconHandle, AmbulanceIconProps>(
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
        if (!isControlledRef.current) {
          controls.start("animate");
        }
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        }
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={className}
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
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14" />
            <path d="M9 18h6" />

            <motion.g
              animate={controls}
              initial="normal"
              variants={CROSS_VARIANTS}
            >
              <path d="M10 10H6" />
              <path d="M8 8v4" />
            </motion.g>
          </motion.g>

          <motion.g
            animate={controls}
            initial="normal"
            variants={BODY_VARIANTS}
          >
            <motion.g
              animate={controls}
              initial="normal"
              style={{ transformOrigin: "7px 18px" }}
              variants={WHEEL_VARIANTS}
            >
              <circle cx="7" cy="18" r="2" />
              <line strokeWidth="1.5" x1="7" x2="7" y1="16.5" y2="19.5" />
              <line strokeWidth="1.5" x1="5.5" x2="8.5" y1="18" y2="18" />
            </motion.g>
          </motion.g>

          <motion.g
            animate={controls}
            initial="normal"
            variants={BODY_VARIANTS}
          >
            <motion.g
              animate={controls}
              initial="normal"
              style={{ transformOrigin: "17px 18px" }}
              variants={WHEEL_VARIANTS}
            >
              <circle cx="17" cy="18" r="2" />
              <line strokeWidth="1.5" x1="17" x2="17" y1="16.5" y2="19.5" />
              <line strokeWidth="1.5" x1="15.5" x2="18.5" y1="18" y2="18" />
            </motion.g>
          </motion.g>
        </svg>
      </div>
    );
  }
);

AmbulanceIcon.displayName = "AmbulanceIcon";

export { AmbulanceIcon };
