"use client";

import { Transition, useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface PhoneIncomingIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhoneIncomingIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PHONE_INCOMING_VARIANTS: Variants = {
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

const ARROW_VARIANTS: Variants = {
  normal: { y: 0, x: 0 },
  animate: { y: [0, 1.6, 0], x: [-1.3, 0] },
};

const ARROW_TRANSITION: Transition = {
  times: [0, 0.4, 1],
  duration: 0.8,
};

const PhoneIncomingIcon = forwardRef<
  PhoneIncomingIconHandle,
  PhoneIncomingIconProps
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
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={controls}
        initial="normal"
        variants={PHONE_INCOMING_VARIANTS}
        style={{ overflow: "visible" }}
      >
        <motion.g
          animate={controls}
          initial="normal"
          transition={ARROW_TRANSITION}
          variants={ARROW_VARIANTS}
        >
          <motion.path d="M16 2v6h6" />
          <motion.path d="m22 2-6 6" />
        </motion.g>
        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
      </motion.svg>
    </div>
  );
});

PhoneIncomingIcon.displayName = "PhoneIncomingIcon";

export { PhoneIncomingIcon };
