'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface ChessQueenIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChessQueenIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    transition: { duration: 0.25 },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    scale: [0.9, 1],
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const CIRCLE_VARIANTS: Variants = {
  normal: {
    scale: 1,
    opacity: 1,
  },
  animate: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.3,
      ease: 'backOut',
    },
  },
};

const ChessQueenIcon = forwardRef<ChessQueenIconHandle, ChessQueenIconProps>(
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
            variants={PATH_VARIANTS}
            initial="normal"
            animate={controls}
            d="M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"
          />
          <motion.path
            variants={PATH_VARIANTS}
            initial="normal"
            animate={controls}
            d="M7 18 4 9"
          />
          <motion.path
            variants={PATH_VARIANTS}
            initial="normal"
            animate={controls}
            d="m20 9-3 9"
          />
          <motion.path
            variants={PATH_VARIANTS}
            initial="normal"
            animate={controls}
            d="m12.474 5.943 1.567 5.34a1 1 0 0 0 1.75.328l2.616-3.402"
          />
          <motion.path
            variants={PATH_VARIANTS}
            initial="normal"
            animate={controls}
            d="m5.594 8.209 2.615 3.403a1 1 0 0 0 1.75-.329l1.567-5.34"
          />
          <motion.circle
            variants={CIRCLE_VARIANTS}
            initial="normal"
            animate={controls}
            cx="12"
            cy="4"
            r="2"
          />
          <motion.circle
            variants={CIRCLE_VARIANTS}
            initial="normal"
            animate={controls}
            cx="20"
            cy="7"
            r="2"
          />
          <motion.circle
            variants={CIRCLE_VARIANTS}
            initial="normal"
            animate={controls}
            cx="4"
            cy="7"
            r="2"
          />
        </svg>
      </div>
    );
  }
);

ChessQueenIcon.displayName = 'ChessQueenIcon';

export { ChessQueenIcon };
