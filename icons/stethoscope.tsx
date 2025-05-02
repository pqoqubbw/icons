'use client';

import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface StethoscopeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface StethoscopeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DURATION = 0.25;

const calculateDelay = (i: number) => {
  return i === 0 ? 0.1 : i * DURATION + 0.1;
};

const StethoscopeIcon = forwardRef<StethoscopeIconHandle, StethoscopeIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('normal');
        } else {
          onMouseLeave?.(e);
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
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M11 2v2"
            animate={controls}
            transition={{
              duration: DURATION,
              delay: calculateDelay(2),
              opacity: { delay: calculateDelay(2) },
            }}
            variants={{
              normal: {
                pathLength: 1,
                pathOffset: 0,
                opacity: 1,
                transition: { delay: 0 },
              },
              animate: {
                pathOffset: [1, 0],
                pathLength: [0, 1],
                opacity: [0, 1],
              },
            }}
          />
          <motion.path
            d="M5 2v2"
            animate={controls}
            transition={{
              duration: DURATION,
              delay: calculateDelay(2),
              opacity: { delay: calculateDelay(2) },
            }}
            variants={{
              normal: {
                pathLength: 1,
                pathOffset: 0,
                opacity: 1,
                transition: { delay: 0 },
              },
              animate: {
                pathOffset: [1, 0],
                pathLength: [0, 1],
                opacity: [0, 1],
              },
            }}
          />
          <motion.path
            d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"
            animate={controls}
            transition={{
              duration: DURATION,
              delay: calculateDelay(2),
              opacity: { delay: calculateDelay(2) },
            }}
            variants={{
              normal: {
                pathLength: 1,
                pathOffset: 0,
                opacity: 1,
                transition: { delay: 0 },
              },
              animate: {
                pathLength: [0, 1],
                pathOffset: [1, 0],
                opacity: [0, 1],
              },
            }}
          />
          <motion.path
            d="M8 15a6 6 0 0 0 12 0v-3"
            animate={controls}
            transition={{
              duration: DURATION,
              delay: calculateDelay(1),
              opacity: { delay: calculateDelay(1) },
            }}
            variants={{
              normal: {
                pathLength: 1,
                pathOffset: 0,
                opacity: 1,
                transition: { delay: 0 },
              },
              animate: {
                pathOffset: [1, 0],
                pathLength: [0, 1],
                opacity: [0, 1],
              },
            }}
          />
          <motion.circle
            cx="20"
            cy="10"
            r="2"
            animate={controls}
            transition={{
              duration: DURATION,
              delay: calculateDelay(0),
              opacity: { delay: calculateDelay(0) },
            }}
            variants={{
              normal: { pathLength: 1, opacity: 1, transition: { delay: 0 } },
              animate: {
                pathLength: [0, 1],
                opacity: [0, 1],
              },
            }}
          />
        </svg>
      </div>
    );
  }
);

StethoscopeIcon.displayName = 'StethoscopeIcon';

export { StethoscopeIcon };
