"use client";

import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface AlignHorizontalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AlignHorizontalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 160,
  damping: 17,
  mass: 1,
};

const AlignHorizontalIcon = forwardRef<
  AlignHorizontalIconHandle,
  AlignHorizontalIconProps
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
        <motion.rect
          animate={controls}
          height="10"
          rx="2"
          transition={DEFAULT_TRANSITION}
          variants={{
            normal: { scaleX: 1 },
            animate: { scaleX: 0.85 },
          }}
          width="6"
          x="9"
          y="7"
        />
        <motion.path
          animate={controls}
          d="M4 22V2"
          transition={DEFAULT_TRANSITION}
          variants={{
            normal: { translateX: 0, scaleY: 1 },
            animate: {
              translateX: 2,
              scaleY: 0.9,
            },
          }}
        />
        <motion.path
          animate={controls}
          d="M20 22V2"
          transition={DEFAULT_TRANSITION}
          variants={{
            normal: { translateX: 0, scaleY: 1 },
            animate: {
              translateX: -2,
              scaleY: 0.9,
            },
          }}
        />
      </svg>
    </div>
  );
});

AlignHorizontalIcon.displayName = "AlignHorizontalIcon";

export { AlignHorizontalIcon };
