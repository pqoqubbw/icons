"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface PhoneCallIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhoneCallIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Call signal rings: fade out then fade in with stagger (like wifi / smartphone-nfc)
const RING_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  fadeOut: {
    opacity: 0,
    transition: { duration: 0.25 },
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
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: async () => {
          await controls.start("fadeOut");
          controls.start("fadeIn");
        },
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          await controls.start("fadeOut");
          controls.start("fadeIn");
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
        style={{ ...props.style, overflow: "visible" }}
      >
        <svg
          fill="none"
          height={size}
          preserveAspectRatio="xMidYMid meet"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ overflow: "visible" }}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={controls}
            custom={0}
            d="M13 2a9 9 0 0 1 9 9"
            initial={{ opacity: 1 }}
            variants={RING_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={1}
            d="M13 6a5 5 0 0 1 5 5"
            initial={{ opacity: 1 }}
            variants={RING_VARIANTS}
          />
          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
        </svg>
      </div>
    );
  }
);

PhoneCallIcon.displayName = "PhoneCallIcon";

export { PhoneCallIcon };
