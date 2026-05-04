"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface PlaneLandingIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PlaneLandingIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PLANE_LANDING_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
  animate: {
    x: [-38, 1, 0],
    y: [-20, 1, 0],
    opacity: [0, 1, 1],
    scale: [0.5, 1],
    rotate: [16, -5, 0],
    transition: {
      duration: 1.1,
      ease: [0.25, 1, 0.5, 1],
      times: [0, 0.65, 1],
    },
  },
};

const PlaneLandingIcon = forwardRef<
  PlaneLandingIconHandle,
  PlaneLandingIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = ref != null;
    return {
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    };
  }, [controls, ref]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseEnter?.(e);
      } else {
        controls.start("animate");
      }
    },
    [controls, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseLeave?.(e);
      } else {
        controls.start("normal");
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
        <path d="M2 22h20" />
        <motion.path
          animate={controls}
          d="M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z"
          initial="normal"
          style={{ originX: 0.5, originY: 0.5 }}
          variants={PLANE_LANDING_VARIANTS}
        />
      </motion.svg>
    </div>
  );
});

PlaneLandingIcon.displayName = "PlaneLandingIcon";

export { PlaneLandingIcon };
