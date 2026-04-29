"use client";

import { motion, useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ProjectorIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ProjectorIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PROJECTOR_VARIANTS: Variants = {
  normal: {
    scale: 1,
    y: 0,
  },
  animate: {
    scale: [1, 1.3, 1],
    y: [0, -1, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const PATH_VARIANTS: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [0, 0.5, 1],
    transition: { duration: 0.3, ease: "linear" },
  },
};

const ProjectorIcon = forwardRef<ProjectorIconHandle, ProjectorIconProps>(
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
          initial="normal"
          variants={PROJECTOR_VARIANTS}
        >
          <motion.path d="M5 7 3 5" 
          animate={controls}
          initial="normal"
          variants={PATH_VARIANTS}
          />
          <motion.path d="M9 6V3" 
          animate={controls}
          initial="normal"
          variants={PATH_VARIANTS}
          />
          <motion.path d="m13 7 2-2" 
          animate={controls}
          initial="normal"
          variants={PATH_VARIANTS}
          />
          <circle cx="9" cy="13" r="3" />
          <path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17" />
          <motion.path d="M16 16h2" 
            animate={controls}
            initial="normal"
            variants={PATH_VARIANTS}
          />
        </motion.svg>
      </div>
    );
  },
);

ProjectorIcon.displayName = "ProjectorIcon";

export { ProjectorIcon };
