"use client";

import { useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface PhoneCallIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhoneCallIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PHONE_CALL_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    scale: 1,
  },
  animate: {
    rotate: [10, 20, -10, 10, 0],
    scale: [1, 1.1, 1.2, 1.1, 1],
    transition: {
      duration: 0.9,
      ease: "easeInOut",
    },
  },
};

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

const PhoneCallIcon = forwardRef<PhoneCallIconHandle, PhoneCallIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
    }, [pathControls, runPathIntro, ref, svgControls]);

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
          variants={PHONE_CALL_VARIANTS}
        >
          <motion.path
            d="M13 2a9 9 0 0 1 9 9"
            animate={pathControls}
            custom={2}
            initial={{ opacity: 1 }}
            variants={PATH_VARIANTS}
          />
          <motion.path
            d="M13 6a5 5 0 0 1 5 5"
            animate={pathControls}
            custom={1}
            initial={{ opacity: 1 }}
            variants={PATH_VARIANTS}
          />
          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
        </motion.svg>
      </div>
    );
  },
);

PhoneCallIcon.displayName = "PhoneCallIcon";

export { PhoneCallIcon };
