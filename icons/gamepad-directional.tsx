"use client";

import { motion, useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface GamepadDirectionalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GamepadDirectionalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const GAMEPAD_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const GAMEPAD_PATH1_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    y: [-10, 0],
    transition: { duration: 0.22, ease: "easeOut", delay: 0 },
  },
};

const GAMEPAD_PATH2_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    x: [10, 0],
    transition: { duration: 0.22, ease: "easeOut", delay: 0.05 },
  },
};

const GAMEPAD_PATH3_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    x: [-10, 0],
    transition: { duration: 0.22, ease: "easeOut", delay: 0.1 },
  },
};

const GAMEPAD_PATH4_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    y: [10, 0],
    transition: { duration: 0.22, ease: "easeOut", delay: 0.15 },
  },
};

const GamepadDirectionalIcon = forwardRef<
  GamepadDirectionalIconHandle,
  GamepadDirectionalIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = ref != null;
    return {
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    };
  }, [controls, ref]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseEnter?.(e);
      } else {
        controls.start("animate");
      }
    },
    [controls, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseLeave?.(e);
      } else {
        controls.start("normal");
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
      <svg
        className="overflow-visible"
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
        <motion.g
          animate={controls}
          initial="normal"
          style={{ transformOrigin: "12px 12px" }}
          variants={GAMEPAD_VARIANTS}
        >
          <motion.path
            d="M11.146 15.854a1.207 1.207 0 0 1 1.708 0l1.56 1.56A2 2 0 0 1 15 18.828V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.172a2 2 0 0 1 .586-1.414z"
            animate={controls}
            initial="normal"
            variants={GAMEPAD_PATH4_VARIANTS}
          />
          <motion.path
            d="M18.828 15a2 2 0 0 1-1.414-.586l-1.56-1.56a1.207 1.207 0 0 1 0-1.708l1.56-1.56A2 2 0 0 1 18.828 9H21a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z"
            animate={controls}
            initial="normal"
            variants={GAMEPAD_PATH2_VARIANTS}
          />
          <motion.path
            d="M6.586 14.414A2 2 0 0 1 5.172 15H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2.172a2 2 0 0 1 1.414.586l1.56 1.56a1.207 1.207 0 0 1 0 1.708z"
            animate={controls}
            initial="normal"
            variants={GAMEPAD_PATH3_VARIANTS}
          />
          <motion.path
            d="M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.172a2 2 0 0 1-.586 1.414l-1.56 1.56a1.207 1.207 0 0 1-1.708 0l-1.56-1.56A2 2 0 0 1 9 5.172z"
            animate={controls}
            initial="normal"
            variants={GAMEPAD_PATH1_VARIANTS}
          />
        </motion.g>
      </svg>
    </div>
  );
});

GamepadDirectionalIcon.displayName = "GamepadDirectionalIcon";

export { GamepadDirectionalIcon };
