'use client';

import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface GitCompareArrowsIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GitCompareArrowsIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DURATION = 0.3;

const CALCULATE_DELAY = (i: number) => {
  if (i === 0) return 0.1;

  return i * DURATION + 0.1;
};

const GitCompareArrowsIcon = forwardRef<
  GitCompareArrowsIconHandle,
  GitCompareArrowsIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
          cx="5"
          cy="6"
          r="3"
          transition={{
            duration: DURATION,
            delay: CALCULATE_DELAY(0),
            opacity: { delay: CALCULATE_DELAY(0) },
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
          d="M12 6h5a2 2 0 0 1 2 2v7"
          transition={{
            duration: DURATION,
            delay: CALCULATE_DELAY(1),
            opacity: { delay: CALCULATE_DELAY(1) },
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

        <motion.path
          d="m15 9-3-3 3-3"
          transition={{
            duration: DURATION,
            delay: CALCULATE_DELAY(1),
            opacity: { delay: CALCULATE_DELAY(1) },
          }}
          variants={{
            normal: { opacity: 1 },
            animate: { opacity: [0, 1] },
          }}
          animate={controls}
        />

        <motion.circle
          cx="19"
          cy="18"
          r="3"
          transition={{
            duration: DURATION,
            delay: CALCULATE_DELAY(2),
            opacity: { delay: CALCULATE_DELAY(2) },
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
          d="M12 18H7a2 2 0 0 1-2-2V9"
          transition={{
            duration: DURATION,
            delay: CALCULATE_DELAY(1),
            opacity: { delay: CALCULATE_DELAY(1) },
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

        <motion.path
          d="m9 15 3 3-3 3"
          transition={{
            duration: DURATION,
            delay: CALCULATE_DELAY(1),
            opacity: { delay: CALCULATE_DELAY(1) },
          }}
          variants={{
            normal: { opacity: 1 },
            animate: { opacity: [0, 1] },
          }}
          animate={controls}
        />
      </svg>
    </div>
  );
});

GitCompareArrowsIcon.displayName = 'GitCompareArrowsIcon';

export { GitCompareArrowsIcon };
