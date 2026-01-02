"use client";

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface AirplaneIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AirplaneIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SPEED_LINES = [
  { x1: 5, y1: 15, x2: 1, y2: 19, delay: 0.1 },
  { x1: 7, y1: 17, x2: 3, y2: 21, delay: 0.2 },
  { x1: 9, y1: 19, x2: 5, y2: 23, delay: 0.3 },
];

const AirplaneIcon = forwardRef<AirplaneIconHandle, AirplaneIconProps>(
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
            d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
            transition={{
              duration: 0.5,
            }}
            variants={{
              normal: { x: 0, y: 0, scale: 1 },
              animate: {
                x: 3,
                y: -3,
                scale: 0.8,
              },
            }}
          />
          {SPEED_LINES.map((line, index) => (
            <motion.line
              animate={controls}
              initial={{ opacity: 0, pathLength: 1, pathSpacing: 1 }}
              key={index}
              stroke="currentColor"
              strokeWidth="1"
              transition={{ duration: 0.15, delay: line.delay }}
              variants={{
                normal: {
                  pathOffset: [0, 1],
                  translateX: -3,
                  translateY: 3,
                  opacity: 0,
                  transition: {
                    duration: 0.3,
                    times: [0, 0.6, 1],
                  },
                },
                animate: {
                  pathOffset: [1, 2],
                  translateX: [0, 0],
                  translateY: [0, 0],
                  opacity: 1,
                },
              }}
              x1={line.x1}
              x2={line.x2}
              y1={line.y1}
              y2={line.y2}
            />
          ))}
        </svg>
      </div>
    );
  }
);

AirplaneIcon.displayName = "AirplaneIcon";

export { AirplaneIcon };
