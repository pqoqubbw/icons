"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface ClapIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ClapIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const VARIANTS: Variants = {
  normal: {
    rotate: 0,
    originX: "4px",
    originY: "20px",
  },
  animate: {
    rotate: [-10, -10, 0],
    transition: {
      duration: 0.8,
      times: [0, 0.5, 1],
      ease: "easeInOut",
    },
  },
};

const CLAP_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    originX: "3px",
    originY: "11px",
  },
  animate: {
    rotate: [0, -10, 16, 0],
    transition: {
      duration: 0.4,
      times: [0, 0.3, 0.6, 1],
      ease: "easeInOut",
    },
  },
};

const ClapIcon = forwardRef<ClapIconHandle, ClapIconProps>(
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
          style={{ overflow: "visible" }}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.g animate={controls} variants={VARIANTS}>
            <motion.g animate={controls} variants={CLAP_VARIANTS}>
              <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
              <path d="m6.2 5.3 3.1 3.9" />
              <path d="m12.4 3.4 3.1 4" />
            </motion.g>
            <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

ClapIcon.displayName = "ClapIcon";

export { ClapIcon };
