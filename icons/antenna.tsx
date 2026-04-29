"use client";

import { useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface AntennaIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AntennaIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ANTENNA_VARIANTS: Variants = {
  normal: {
    rotateY: 0,
    scale: 1,
  },
  animate: {
    rotateY: [180, 360, 180, 360],
    scale: [1, 1.2, 1.1, 1],
    transition: {
      rotateX: {
        duration: 1.2,
        ease: "easeInOut",
      },
      scale: {
        duration: 0.9,
        ease: "easeInOut",
      },
    },
  },
};

const AntennaIcon = forwardRef<AntennaIconHandle, AntennaIconProps>(
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
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
          variants={ANTENNA_VARIANTS}
        >
          <path d="M2 12 7 2" />
          <path d="m7 12 5-10" />
          <path d="m12 12 5-10" />
          <path d="m17 12 5-10" />
          <path d="M4.5 7h15" />
          <path d="M12 16v6" />
        </motion.svg>
      </div>
    );
  },
);

AntennaIcon.displayName = "AntennaIcon";

export { AntennaIcon };
