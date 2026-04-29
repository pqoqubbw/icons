"use client";

import { motion, useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface SatelliteDishIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SatelliteDishIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SATELLITE_DISH_VARIANTS: Variants = {
  normal: {
    y: 0,
    rotate: 0,
  },
  animate: {
    y: [0, 1, 2, 0],
    rotate: [0, -50, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    transition: {
      duration: 1.1,
    },
  },
  fadeOut: {
    opacity: 0,
    transition: { duration: 1.1 },
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

const SatelliteDishIcon = forwardRef<
  SatelliteDishIconHandle,
  SatelliteDishIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const svgControls = useAnimation();
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
        void svgControls.start("animate");
        await runPathIntro();
      },
      stopAnimation: () => {
        svgControls.start("normal");
        pathControls.start("normal");
      },
    };
  }, [pathControls, ref, runPathIntro, svgControls]);

  const handleMouseEnter = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseEnter?.(e);
      } else {
        void svgControls.start("animate");
        await runPathIntro();
      }
    },
    [onMouseEnter, runPathIntro, svgControls],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseLeave?.(e);
      } else {
        svgControls.start("normal");
        pathControls.start("normal");
      }
    },
    [onMouseLeave, pathControls, svgControls],
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
        animate={svgControls}
        initial="normal"
        variants={SATELLITE_DISH_VARIANTS}
      >
        <path d="M4 10a7.31 7.31 0 0 0 10 10Z" />
        <path d="m9 15 3-3" />
        <motion.path
          d="M17 13a6 6 0 0 0-6-6"
          animate={pathControls}
          custom={1}
          initial={{ opacity: 1 }}
          variants={PATH_VARIANTS}
        />
        <motion.path
          d="M21 13A10 10 0 0 0 11 3"
          animate={pathControls}
          custom={2}
          initial={{ opacity: 1 }}
          variants={PATH_VARIANTS}
        />
      </motion.svg>
    </div>
  );
});

SatelliteDishIcon.displayName = "SatelliteDishIcon";

export { SatelliteDishIcon };
