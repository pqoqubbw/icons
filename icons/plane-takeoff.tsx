"use client";

import { motion, useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface PlaneTakeoffIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PlaneTakeoffIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PLANE_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
  animate: {
    x: [-40, 1, 0],
    y: [40, -1, 0],
    opacity: [0, 1],
    scale: [0.8, 1],
    rotate: [-15, 5, 0],
    transition: {
      duration: 1.1,
      ease: [0.25, 1, 0.5, 1],
      times: [0, 0.7, 1],
    },
  },
};

const PlaneTakeoffIcon = forwardRef<
  PlaneTakeoffIconHandle,
  PlaneTakeoffIconProps
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
        style={{ overflow: "visible" }}
      >
        <path d="M2 22h20" />
        <motion.path
          d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"
          animate={controls}
          initial="normal"
          variants={PLANE_VARIANTS}
          style={{ originX: 0.5, originY: 0.5 }}
        />
      </motion.svg>
    </div>
  );
});

PlaneTakeoffIcon.displayName = "PlaneTakeoffIcon";

export { PlaneTakeoffIcon };
