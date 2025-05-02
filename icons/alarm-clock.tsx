'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface AlarmClockIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AlarmClockIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const pathVariants: Variants = {
  normal: {
    y: 0,
    x: 0,
    transition: {
      duration: 0.2,
      type: 'spring',
      stiffness: 200,
      damping: 25,
    },
  },
  animate: {
    y: -1.5,
    x: [-1, 1, -1, 1, -1, 0],
    transition: {
      y: {
        duration: 0.2,
        type: 'spring',
        stiffness: 200,
        damping: 25,
      },
      x: {
        duration: 0.3,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },
};

const secondaryPathVariants: Variants = {
  normal: {
    y: 0,
    x: 0,
    transition: {
      duration: 0.2,
      type: 'spring',
      stiffness: 200,
      damping: 25,
    },
  },
  animate: {
    y: -2.5,
    x: [-2, 2, -2, 2, -2, 0],
    transition: {
      y: {
        duration: 0.2,
        type: 'spring',
        stiffness: 200,
        damping: 25,
      },
      x: {
        duration: 0.3,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },
};

const AlarmClockIcon = forwardRef<AlarmClockIconHandle, AlarmClockIconProps>(
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
          style={{ overflow: 'visible' }}
        >
          <motion.path
            variants={pathVariants}
            initial="normal"
            animate={controls}
            d="M18 20.5L19.5 22"
          />
          <motion.path
            variants={pathVariants}
            initial="normal"
            animate={controls}
            d="M6 20.5L4.5 22"
          />
          <motion.path
            variants={pathVariants}
            initial="normal"
            animate={controls}
            d="M21 13C21 17.968 16.968 22 12 22C7.032 22 3 17.968 3 13C3 8.032 7.032 4 12 4C16.968 4 21 8.032 21 13Z"
          />
          <motion.path
            variants={pathVariants}
            initial="normal"
            animate={controls}
            d="M15.339 15.862L12.549 14.197C12.063 13.909 11.667 13.216 11.667 12.649V8.95898"
          />
          <motion.path
            variants={secondaryPathVariants}
            initial="normal"
            animate={controls}
            d="M18 2L21.747 5.31064"
          />
          <motion.path
            variants={secondaryPathVariants}
            initial="normal"
            animate={controls}
            d="M6 2L2.25304 5.31064"
          />
        </svg>
      </div>
    );
  }
);

AlarmClockIcon.displayName = 'AlarmClockIcon';

export { AlarmClockIcon };
