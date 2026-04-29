"use client";

import { useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface RouterIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface RouterIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  fadeOut: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
  fadeIn: (i: number) => ({
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: i * 0.1,
    },
  }),
};

const RouterIcon = forwardRef<RouterIconHandle, RouterIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const pathControls = useAnimation();
    const isControlledRef = useRef(false);

    const runPathIntro = useCallback(async () => {
      await pathControls.start("fadeOut");
      pathControls.start("fadeIn");
    }, [pathControls]);

    useImperativeHandle(ref, () => {
      isControlledRef.current = ref != null;
      return {
        startAnimation: async () => {
          await runPathIntro();
        },
        stopAnimation: () => {
          pathControls.start("normal");
        },
      };
    }, [pathControls, ref, runPathIntro]);

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          await runPathIntro();
        }
      },
      [onMouseEnter, runPathIntro],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          pathControls.start("normal");
        }
      },
      [onMouseLeave, pathControls],
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
        >
          <rect width="20" height="8" x="2" y="14" rx="2" />
          <path d="M6.01 18H6" />
          <path d="M10.01 18H10" />
          <path d="M15 10v4" />
          <motion.path
            d="M17.84 7.17a4 4 0 0 0-5.66 0"
            animate={pathControls}
            custom={1}
            initial={{ opacity: 1 }}
            variants={PATH_VARIANTS}
          />
          <motion.path
            d="M20.66 4.34a8 8 0 0 0-11.31 0"
            animate={pathControls}
            custom={2}
            initial={{ opacity: 1 }}
            variants={PATH_VARIANTS}
          />
        </motion.svg>
      </div>
    );
  },
);

RouterIcon.displayName = "RouterIcon";

export { RouterIcon };
