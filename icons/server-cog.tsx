"use client";

import { motion, useAnimation, Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ServerCogIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ServerCogIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const COG_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: 180 },
};

const ServerCogIcon = forwardRef<ServerCogIconHandle, ServerCogIconProps>(
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
          animate={controls}
        >
          <motion.g
            animate={controls}
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
            variants={COG_VARIANTS}
          >
            <path d="m10.852 14.772-.383.923" />
            <path d="M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923" />
            <path d="m13.148 9.228.383-.923" />
            <path d="m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544" />
            <path d="m14.772 10.852.923-.383" />
            <path d="m14.772 13.148.923.383" />
            <path d="m9.228 10.852-.923-.383" />
            <path d="m9.228 13.148-.923.383" />
          </motion.g>

          <path d="M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5" />
          <path d="M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5" />
          <path d="M6 18h.01" />
          <path d="M6 6h.01" />
        </motion.svg>
      </div>
    );
  },
);

ServerCogIcon.displayName = "ServerCogIcon";

export { ServerCogIcon };
