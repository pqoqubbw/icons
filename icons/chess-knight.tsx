'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface ChessKnightIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChessKnightIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BODY_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    x: 0,
    rotate: 0,
  },
  animate: {
    opacity: [0.6, 1],
    x: [-3, 0],
    rotate: [-4, 0],
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
};

const HEAD_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    y: 0,
  },
  animate: {
    opacity: [0.6, 1],
    y: [-2, 0],
    transition: {
      duration: 0.2,
      ease: 'easeOut',
      delay: 0.05,
    },
  },
};

const ChessKnightIcon = forwardRef<ChessKnightIconHandle, ChessKnightIconProps>(
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
            variants={HEAD_VARIANTS}
            initial="normal"
            animate={controls}
            d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"
          />
          <motion.path
            variants={HEAD_VARIANTS}
            initial="normal"
            animate={controls}
            d="M16.5 18c1-2 2.5-5 2.5-9a7 7 0 0 0-7-7H6.635a1 1 0 0 0-.768 1.64L7 5l-2.32 5.802a2 2 0 0 0 .95 2.526l2.87 1.456"
          />
          <motion.path
            variants={HEAD_VARIANTS}
            initial="normal"
            animate={controls}
            d="M9.713 12.185 7 18"
          />
          <motion.path
            variants={BODY_VARIANTS}
            initial="normal"
            animate={controls}
            d="m15 5 1.425-1.425"
          />
          <motion.path
            variants={BODY_VARIANTS}
            initial="normal"
            animate={controls}
            d="m17 8 1.53-1.53"
          />
        </svg>
      </div>
    );
  }
);

ChessKnightIcon.displayName = 'ChessKnightIcon';

export { ChessKnightIcon };
