"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle } from "react";
import { cn } from "@/lib/utils";

export interface ProjectorIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ProjectorIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const RAY_LINE_VARIANTS: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  visible: {
    pathLength: 1,
    opacity: 1,
  },
};

const PROJECTOR_BODY_VARIANTS: Variants = {
  normal: {
    scale: 1,
    y: 0,
  },
  animate: {
    scale: [1, 1.08, 1],
    y: [0, -1, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const ProjectorIcon = forwardRef<ProjectorIconHandle, ProjectorIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const pathControls = useAnimation();
    const bodyControls = useAnimation();
    const isRefControlled = ref != null;

    const startAll = useCallback(async () => {
      bodyControls.start("animate").catch(() => {
        // ignore when interrupted by a new animation
      });
      await pathControls.start("hidden");
      await pathControls.start("animate");
    }, [bodyControls, pathControls]);

    const stopAll = useCallback(() => {
      bodyControls.start("normal").catch(() => {
        // ignore when interrupted
      });
      pathControls.start("visible").catch(() => {
        // ignore when interrupted
      });
    }, [bodyControls, pathControls]);

    useImperativeHandle(
      ref,
      () => ({
        startAnimation: () => {
          startAll().catch(() => {
            // ignore when interrupted
          });
        },
        stopAnimation: () => stopAll(),
      }),
      [startAll, stopAll]
    );

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (isRefControlled) {
          onMouseEnter?.(e);
        } else {
          await startAll();
        }
      },
      [isRefControlled, onMouseEnter, startAll]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isRefControlled) {
          onMouseLeave?.(e);
        } else {
          stopAll();
        }
      },
      [isRefControlled, onMouseLeave, stopAll]
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
            animate={pathControls}
            d="M5 7 3 5"
            initial="visible"
            variants={RAY_LINE_VARIANTS}
          />
          <motion.path
            animate={pathControls}
            d="M9 6V3"
            initial="visible"
            variants={RAY_LINE_VARIANTS}
          />
          <motion.path
            animate={pathControls}
            d="m13 7 2-2"
            initial="visible"
            variants={RAY_LINE_VARIANTS}
          />
          <motion.g
            animate={bodyControls}
            initial="normal"
            variants={PROJECTOR_BODY_VARIANTS}
          >
            <circle cx="9" cy="13" r="3" />
            <path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17" />
            <path d="M16 16h2" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

ProjectorIcon.displayName = "ProjectorIcon";

export { ProjectorIcon };
