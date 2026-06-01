"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface PhoneForwardedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhoneForwardedIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PHONE_FORWARDED_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    scale: 1,
  },
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.9,
      ease: "easeInOut",
    },
  },
};

const HEAD_VARIANTS: Variants = {
  normal: {
    translateX: 0,
  },
  animate: {
    translateX: [0, 3, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const SHAFT_VARIANTS: Variants = {
  normal: {
    translateX: 0,
    scale: 1,
  },
  animate: {
    translateX: [0, 3, 0],
    scale: [1, 0.85, 1],
    originX: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const PhoneForwardedIcon = forwardRef<
  PhoneForwardedIconHandle,
  PhoneForwardedIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
      if (isControlledRef.current) {
        onMouseEnter?.(e);
      } else {
        controls.start("animate");
      }
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseLeave?.(e);
      } else {
        controls.start("normal");
      }
    },
    [controls, onMouseLeave]
  );

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.svg
        animate={controls}
        fill="none"
        height={size}
        initial="normal"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        style={{ overflow: "visible" }}
        variants={PHONE_FORWARDED_VARIANTS}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          animate={controls}
          d="M14 6h8"
          initial="normal"
          variants={SHAFT_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="m18 2 4 4-4 4"
          initial="normal"
          variants={HEAD_VARIANTS}
        />

        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
      </motion.svg>
    </div>
  );
});

PhoneForwardedIcon.displayName = "PhoneForwardedIcon";

export { PhoneForwardedIcon };
