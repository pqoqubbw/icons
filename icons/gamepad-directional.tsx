"use client";

import { motion, useAnimation, type Variants } from "motion/react";
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

const MOVE_UP: Variants = {
  normal: { y: 0 },
  animate: {
    y: [-2, 0],
    transition: {
      duration: 0.15,
      ease: "easeOut",
      delay: 0,
    },
  },
};

const MOVE_RIGHT: Variants = {
  normal: { x: 0 },
  animate: {
    x: [2, 0],
    transition: {
      duration: 0.15,
      ease: "easeOut",
      delay: 0.1,
    },
  },
};

const MOVE_DOWN: Variants = {
  normal: { y: 0 },
  animate: {
    y: [2, 0],
    transition: {
      duration: 0.15,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

const MOVE_LEFT: Variants = {
  normal: { x: 0 },
  animate: {
    x: [-2, 0],
    transition: {
      duration: 0.15,
      ease: "easeOut",
      delay: 0.3,
    },
  },
};

const GamepadDirectionalIcon = forwardRef<
  GamepadDirectionalIconHandle,
  GamepadDirectionalIconProps
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
      <svg
        className="overflow-visible"
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
          animate={controls}
          d="M11.146 15.854a1.207 1.207 0 0 1 1.708 0l1.56 1.56A2 2 0 0 1 15 18.828V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.172a2 2 0 0 1 .586-1.414z"
          initial="normal"
          variants={MOVE_DOWN}
        />
        <motion.path
          animate={controls}
          d="M18.828 15a2 2 0 0 1-1.414-.586l-1.56-1.56a1.207 1.207 0 0 1 0-1.708l1.56-1.56A2 2 0 0 1 18.828 9H21a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z"
          initial="normal"
          variants={MOVE_RIGHT}
        />
        <motion.path
          animate={controls}
          d="M6.586 14.414A2 2 0 0 1 5.172 15H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2.172a2 2 0 0 1 1.414.586l1.56 1.56a1.207 1.207 0 0 1 0 1.708z"
          initial="normal"
          variants={MOVE_LEFT}
        />
        <motion.path
          animate={controls}
          d="M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.172a2 2 0 0 1-.586 1.414l-1.56 1.56a1.207 1.207 0 0 1-1.708 0l-1.56-1.56A2 2 0 0 1 9 5.172z"
          initial="normal"
          variants={MOVE_UP}
        />
      </svg>
    </div>
  );
});

GamepadDirectionalIcon.displayName = "GamepadDirectionalIcon";

export { GamepadDirectionalIcon };
