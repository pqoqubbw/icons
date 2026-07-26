"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface MonitorCogIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MonitorCogIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const G_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: 180 },
};

const MonitorCogIcon = forwardRef<MonitorCogIconHandle, MonitorCogIconProps>(
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
          <path d="M12 17v4" />
          <path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
          <path d="M8 21h8" />

          <motion.g
            animate={controls}
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
            variants={G_VARIANTS}
          >
            <path d="m14.305 7.53.923-.382" />
            <path d="m15.228 4.852-.923-.383" />
            <path d="m16.852 3.228-.383-.924" />
            <path d="m16.852 8.772-.383.923" />
            <path d="m19.148 3.228.383-.924" />
            <path d="m19.53 9.696-.382-.924" />
            <path d="m20.772 4.852.924-.383" />
            <path d="m20.772 7.148.924.383" />
            <circle cx="18" cy="6" r="3" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

MonitorCogIcon.displayName = "MonitorCogIcon";

export { MonitorCogIcon };
