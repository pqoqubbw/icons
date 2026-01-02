"use client";

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface ChevronFirstIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChevronFirstIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ChevronFirstIcon = forwardRef<
  ChevronFirstIconHandle,
  ChevronFirstIconProps
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
        <motion.path
          animate={controls}
          d="m17 18-6-6 6-6"
          initial="normal"
          variants={{
            normal: {
              translateX: 0,
              transition: { duration: 0.3, ease: "easeOut" },
            },
            animate: {
              translateX: [-2, 1, -1, 0],
              transition: {
                duration: 0.6,
                ease: "easeInOut",
                times: [0, 0.3, 0.7, 1],
              },
            },
          }}
        />

        <path d="M7 6v12" />
      </svg>
    </div>
  );
});

ChevronFirstIcon.displayName = "ChevronsDownUpIcon";

export { ChevronFirstIcon };
