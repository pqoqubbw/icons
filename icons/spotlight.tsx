"use client";

import { motion, useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface SpotlightIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SpotlightIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SPOTLIGHT_VARIANTS: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -10, 10, -5, 5, 0],
    transition: {
      duration: 1.2,
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

const SpotlightIcon = forwardRef<SpotlightIconHandle, SpotlightIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const beamControls = useAnimation();
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
          void beamControls.start("animate");
          await runPathIntro();
        },
        stopAnimation: () => {
          beamControls.start("normal");
          pathControls.start("normal");
        },
      };
    }, [beamControls, pathControls, ref, runPathIntro]);

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          void beamControls.start("animate");
          await runPathIntro();
        }
      },
      [beamControls, onMouseEnter, runPathIntro],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          beamControls.start("normal");
          pathControls.start("normal");
        }
      },
      [beamControls, onMouseLeave, pathControls],
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
          <motion.path
            d="M15.295 19.562 16 22"
            animate={pathControls}
            custom={0}
            initial={{ opacity: 1 }}
            variants={PATH_VARIANTS}
          />
          <motion.path
            d="m17 16 3.758 2.098"
            animate={pathControls}
            custom={1}
            initial={{ opacity: 1 }}
            variants={PATH_VARIANTS}
          />
          <motion.path
            d="m19 12.5 3.026-.598"
            animate={pathControls}
            custom={2}
            initial={{ opacity: 1 }}
            variants={PATH_VARIANTS}
          />

          <motion.path
            d="M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z"
            animate={beamControls}
            initial="normal"
            variants={SPOTLIGHT_VARIANTS}
          />
          <motion.path d="M8 9V2" />
        </motion.svg>
      </div>
    );
  },
);

SpotlightIcon.displayName = "SpotlightIcon";

export { SpotlightIcon };
