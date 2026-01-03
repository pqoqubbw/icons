"use client";

import { AnimatePresence, motion } from "motion/react";
import type { HTMLAttributes } from "react";
import {
  Fragment,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

export interface VolumeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface VolumeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const VolumeIcon = forwardRef<VolumeIconHandle, VolumeIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => setIsHovered(true),
        stopAnimation: () => setIsHovered(false),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          setIsHovered(true);
        }
      },
      [onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          setIsHovered(false);
        }
      },
      [onMouseLeave]
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
          <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
          <AnimatePresence initial={false} mode="wait">
            {isHovered ? (
              <Fragment key="volume-icon-active">
                <motion.path
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                  d="M16 9a5 5 0 0 1 0 6"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                />
                <motion.path
                  animate={{ opacity: 1, transition: { delay: 0.2 } }}
                  d="M19.364 18.364a9 9 0 0 0 0-12.728"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                />
              </Fragment>
            ) : (
              <Fragment key="volume-icon-inactive">
                <motion.line
                  animate={{
                    pathLength: [0, 1],
                    opacity: [0, 1],
                    transition: { delay: 0.1 },
                  }}
                  exit={{ pathLength: 1, opacity: 1 }}
                  initial={{ pathLength: 1, opacity: 1 }}
                  x1="22"
                  x2="16"
                  y1="9"
                  y2="15"
                />
                <motion.line
                  animate={{
                    pathLength: [0, 1],
                    opacity: [0, 1],
                    transition: { delay: 0.2 },
                  }}
                  exit={{ pathLength: 1, opacity: 1 }}
                  initial={{ pathLength: 1, opacity: 1 }}
                  x1="16"
                  x2="22"
                  y1="9"
                  y2="15"
                />
              </Fragment>
            )}
          </AnimatePresence>
        </svg>
      </div>
    );
  }
);

VolumeIcon.displayName = "VolumeIcon";

export { VolumeIcon };
