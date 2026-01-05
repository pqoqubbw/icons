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

export interface Repeat2IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Repeat2IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const RIGHT_ARROW_VARIANTS: Variants = {
  idle: {
    opacity: 1,
    y: 0,
  },
  show: {
    opacity: [0, 1],
    y: [-4, 0],
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delay: 0.05,
    },
  },
};

const LEFT_ARROW_VARIANTS: Variants = {
  idle: {
    opacity: 1,
    y: 0,
  },
  show: {
    opacity: [0, 1],
    y: [4, 0],
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delay: 0.05,
    },
  },
};

const Repeat2Icon = forwardRef<Repeat2IconHandle, Repeat2IconProps>(
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
          fill="none"
          height={size}
          initial="idle"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.g variants={LEFT_ARROW_VARIANTS}>
            <motion.path d="m2 9 3-3 3 3" />
            <motion.path d="M13 18H7a2 2 0 0 1-2-2V6" />
          </motion.g>
          <motion.g variants={RIGHT_ARROW_VARIANTS}>
            <motion.path custom={1} d="m22 15-3 3-3-3" />
            <motion.path custom={0} d="M11 6h6a2 2 0 0 1 2 2v10" />
          </motion.g>
        </motion.svg>
      </div>
    );
  }
);

Repeat2Icon.displayName = "Repeat2Icon";

export { Repeat2Icon };
