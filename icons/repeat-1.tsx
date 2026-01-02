"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

export interface Repeat1IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Repeat1IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DRAW_VARIANTS: Variants = {
  idle: {
    pathLength: 1,
    opacity: 1,
  },
  show: (i: number) => ({
    pathLength: [0, 1],
    opacity: 1,
    transition: {
      delay: i === 0 ? 0 : 0.3,
      duration: 0.25,
      ease: "easeOut",
    },
  }),
};

const NUMBER_VARIANTS: Variants = {
  idle: {
    opacity: 1,
    scale: 1,
  },
  show: {
    opacity: [0, 1],
    scale: [0.6, 1],
    transition: {
      delay: 0.25,
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const Repeat1Icon = forwardRef<Repeat1IconHandle, Repeat1IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const [hovered, setHovered] = useState(false);
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
        onMouseEnter={(e) => {
          handleMouseEnter(e);
          setHovered(true);
        }}
        onMouseLeave={(e) => {
          handleMouseLeave(e);
          setHovered(false);
        }}
        {...props}
      >
        <motion.svg
          animate={hovered ? "show" : "idle"}
          className="lucide lucide-repeat1-icon lucide-repeat-1"
          fill="none"
          height={size}
          initial="idle"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          whileHover="show"
        >
          <motion.path custom={1} d="m17 2 4 4-4 4" variants={DRAW_VARIANTS} />
          <motion.path
            custom={0}
            d="M3 11v-1a4 4 0 0 1 4-4h14"
            variants={DRAW_VARIANTS}
          />
          <motion.path custom={1} d="m7 22-4-4 4-4" variants={DRAW_VARIANTS} />
          <motion.path
            custom={0}
            d="M21 13v1a4 4 0 0 1-4 4H3"
            variants={DRAW_VARIANTS}
          />
          <motion.path d="M11 10h1v4" variants={NUMBER_VARIANTS} />
        </motion.svg>
      </div>
    );
  }
);

Repeat1Icon.displayName = "Repeat1Icon";

export { Repeat1Icon };
