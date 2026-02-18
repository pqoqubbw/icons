"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface GraduationCapIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GraduationCapIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CAP_VARIANTS: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    y: [0, -2, 0],
    rotate: [0, -2, 2, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const TASSEL_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 15, -10, 5, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 0.1,
    },
  },
};

const GraduationCapIcon = forwardRef<
  GraduationCapIconHandle,
  GraduationCapIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        <motion.g
          animate={controls}
          style={{ transformOrigin: "12px 12px" }}
          variants={CAP_VARIANTS}
        >
          <path d="M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />

          {/* Tassel now inherits cap movement */}
          <motion.path
            d="M22 10v6"
            style={{
              transformBox: "fill-box",
              transformOrigin: "top center",
            }}
            variants={TASSEL_VARIANTS}
          />
        </motion.g>
      </svg>
    </div>
  );
});

GraduationCapIcon.displayName = "GraduationCapIcon";

export { GraduationCapIcon };
