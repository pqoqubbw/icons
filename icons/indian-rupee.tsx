'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface IndianRupeeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface IndianRupeeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const INDIAN_RUPEE_MAIN_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      duration: 0.6,
      opacity: { duration: 0.1 },
    },
  },
};

const INDIAN_RUPEE_SECONDARY_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      delay: 0.3,
      duration: 0.3,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      delay: 0.5,
      duration: 0.4,
      opacity: { duration: 0.1, delay: 0.5 },
    },
  },
};

const IndianRupeeIcon = forwardRef<IndianRupeeIconHandle, IndianRupeeIconProps>(
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
            d="M9 3c6.667 0 6.667 10 0 10"
            initial="normal"
            animate={controls}
            variants={INDIAN_RUPEE_MAIN_VARIANTS}
          />
          <motion.path
            d="M9 13h-3"
            initial="normal"
            animate={controls}
            variants={INDIAN_RUPEE_MAIN_VARIANTS}
          />
          <motion.path
            d="m14.5 21 l-8.5 -8"
            initial="normal"
            animate={controls}
            variants={INDIAN_RUPEE_MAIN_VARIANTS}
          />
          <motion.path
            d="M18 3h-12"
            initial="normal"
            animate={controls}
            variants={INDIAN_RUPEE_SECONDARY_VARIANTS}
          />
          <motion.path
            d="M18 8h-12"
            initial="normal"
            animate={controls}
            variants={INDIAN_RUPEE_SECONDARY_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IndianRupeeIcon.displayName = 'IndianRupeeIcon';

export { IndianRupeeIcon };
