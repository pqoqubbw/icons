"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TreeDeciduousIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TreeDeciduousIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const TREE_DECIDUOUS_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -10, 10, -10, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const TreeDeciduousIcon = forwardRef<
  TreeDeciduousIconHandle,
  TreeDeciduousIconProps
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
        style={{ transformOrigin: "12px 21px" }}
        variants={TREE_DECIDUOUS_VARIANTS}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path d="M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z" />
        <path d="M12 19v3" />
      </motion.svg>
    </div>
  );
});

TreeDeciduousIcon.displayName = "TreeDeciduousIcon";

export { TreeDeciduousIcon };
