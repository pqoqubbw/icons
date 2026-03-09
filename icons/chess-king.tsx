"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface ChessKingIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChessKingIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const KING_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 14,
    },
  },
  animate: {
    rotate: [0, -10, 10, -6, 6, -2, 0],
    y: [0, -3, -3, -2, -2, -1, 0],
    transition: {
      duration: 1.1,
      times: [0, 0.18, 0.38, 0.55, 0.7, 0.85, 1],
      ease: "easeInOut",
    },
  },
};

const ChessKingIcon = forwardRef<ChessKingIconHandle, ChessKingIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ overflow: "visible" }}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.g
            animate={controls}
            initial="normal"
            style={{ transformBox: "view-box", transformOrigin: "12px 22px" }}
            variants={KING_VARIANTS}
          >
            <path d="M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
            <path d="m6.7 18-1-1C4.35 15.682 3 14.09 3 12a5 5 0 0 1 4.95-5c1.584 0 2.7.455 4.05 1.818C13.35 7.455 14.466 7 16.05 7A5 5 0 0 1 21 12c0 2.082-1.359 3.673-2.7 5l-1 1" />
            <path d="M10 4h4" />
            <path d="M12 2v6.818" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

ChessKingIcon.displayName = "ChessKingIcon";

export { ChessKingIcon };
