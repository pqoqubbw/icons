"use client";

import { useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface RecycleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface RecycleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal :{ pathLength: 1 },
  animate:{
      pathLength: [0, 1],
      transition: { duration: 0.4, ease: "linear" },
  },
}

const RecycleIcon = forwardRef<RecycleIconHandle, RecycleIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(
      ref,
      () => {
        isControlledRef.current = ref != null;
        return {
          startAnimation: () => controls.start("animate"),
          stopAnimation: () => controls.start("normal"),
        };
      },
      [controls, ref],
    );

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
          initial="normal"
        >
          <motion.path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" 
          animate={controls}
          initial="normal"
          variants={PATH_VARIANTS}
          />
          <motion.path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" 
          animate={controls}
          initial="normal"
          variants={PATH_VARIANTS}
          />
          <motion.path d="m14 16-3 3 3 3" 
          animate={controls}
          initial="normal"
          variants={PATH_VARIANTS}
          />
          <motion.path d="M8.293 13.596 7.196 9.5 3.1 10.598" 
          animate={controls}
          initial="normal"
          variants={PATH_VARIANTS}
          />
          <motion.path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" 
          animate={controls}
          initial="normal"
          variants={PATH_VARIANTS}
          />
          <motion.path d="m13.378 9.633 4.096 1.098 1.097-4.096" 
          animate={controls}
          initial="normal"
          variants={PATH_VARIANTS}
          />
        </motion.svg>
      </div>
    );
  },
);

RecycleIcon.displayName = "RecycleIcon";

export { RecycleIcon };
