"use client";

import { motion, useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface WifiCogIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WifiCogIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const COG_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: 180 },
};

const WifiCogIcon = forwardRef<WifiCogIconHandle, WifiCogIconProps>(
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
        >
          <path d="M2 7.82a15 15 0 0 1 20 0" />
          <path d="M5 11.858a10 10 0 0 1 11.5-1.785" />
          <path d="M8.5 15.429a5 5 0 0 1 2.413-1.31" />
          <motion.g
            animate={controls}
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
            variants={COG_VARIANTS}
          >
            <path d="m14.305 19.53.923-.382" />
            <path d="m15.228 16.852-.923-.383" />
            <path d="m16.852 15.228-.383-.923" />
            <path d="m16.852 20.772-.383.924" />
            <path d="m19.148 15.228.383-.923" />
            <path d="m19.53 21.696-.382-.924" />
            <path d="m20.772 16.852.924-.383" />
            <path d="m20.772 19.148.924.383" />
            <circle cx="18" cy="18" r="3" />
          </motion.g>
        </motion.svg>
      </div>
    );
  },
);

WifiCogIcon.displayName = "WifiCogIcon";

export { WifiCogIcon };
