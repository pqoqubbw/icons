'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface LockIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LockIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const lockBodyVariants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      delay: 0.3,
    },
  },
};

const lockShackleVariants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    y: [-4, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

const keyholeDotVariants: Variants = {
  normal: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  animate: {
    opacity: [0, 1],
    scale: [0, 1],
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      delay: 0.6,
    },
  },
};

const LockIcon = forwardRef<LockIconHandle, LockIconProps>(
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
        className={cn(
          'cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center',
          className
        )}
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
          <motion.rect
            x="3"
            y="11"
            width="18"
            height="11"
            rx="2"
            ry="2"
            variants={lockBodyVariants}
            initial="normal"
            animate={controls}
          />
          <motion.path
            d="M7 11V7a5 5 0 0 1 10 0v4"
            variants={lockShackleVariants}
            initial="normal"
            animate={controls}
          />
          <motion.circle
            cx="12"
            cy="16"
            r="1"
            variants={keyholeDotVariants}
            initial="normal"
            animate={controls}
          />
        </svg>
      </div>
    );
  }
);

LockIcon.displayName = 'LockIcon';

export { LockIcon };
