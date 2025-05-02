'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface TrainTrackIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TrainTrackIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const transition: Transition = {
  duration: 0.3,
  opacity: { delay: 0.15 },
};

const variants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      ...transition,
      delay: 0.1 * custom,
    },
  }),
};

const TrainTrackIcon = forwardRef<TrainTrackIconHandle, TrainTrackIconProps>(
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
          <path d="M2 17 17 2" />
          <motion.path
            d="m2 14 8 8"
            variants={variants}
            animate={controls}
            custom={4}
          />
          <motion.path
            d="m5 11 8 8"
            variants={variants}
            animate={controls}
            custom={3}
          />
          <motion.path
            d="m8 8 8 8"
            variants={variants}
            animate={controls}
            custom={2}
          />
          <motion.path
            d="m11 5 8 8"
            variants={variants}
            animate={controls}
            custom={1}
          />
          <motion.path
            d="m14 2 8 8"
            variants={variants}
            animate={controls}
            custom={0}
          />
          <path d="M7 22 22 7" />
        </svg>
      </div>
    );
  }
);

TrainTrackIcon.displayName = 'TrainTrackIcon';

export { TrainTrackIcon };
