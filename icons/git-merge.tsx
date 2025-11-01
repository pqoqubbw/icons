'use client';

import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface GitMergeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GitMergeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DURATION = 0.3;

const calculateDelay = (i: number) => {
  if (i === 0) return 0.1;

  return i * DURATION + 0.1;
};

const GitMergeIcon = forwardRef<GitMergeIconHandle, GitMergeIconProps>(
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
          <motion.circle
            cx="18"
            cy="18"
            r="3"
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
            animate={controls}
          />

          <motion.circle
            cx="6"
            cy="6"
            r="3"
            transition={{
              duration: DURATION,
              delay: calculateDelay(2),
              opacity: { delay: calculateDelay(2) },
            }}
            variants={{
              normal: { pathLength: 1, opacity: 1, transition: { delay: 0 } },
              animate: {
                pathLength: [0, 1],
                opacity: [0, 1],
              },
            }}
            animate={controls}
          />

          <motion.path
            d="M6 21V9a9 9 0 0 0 9 9"
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
                pathLength: [0, 1],
                opacity: [0, 1],
                pathOffset: [1, 0],
              },
            }}
            animate={controls}
          />
        </svg>
      </div>
    );
  }
);

GitMergeIcon.displayName = 'GitMergeIcon';

export { GitMergeIcon };
