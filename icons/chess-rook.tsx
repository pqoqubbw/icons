'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface ChessRookIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChessRookIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  animate: {
    opacity: [0.6, 1],
    scale: [0.95, 1],
    y: [2, 0],
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
};

const TOP_VARIANTS: Variants = {
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
    },
  },
};

const ChessRookIcon = forwardRef<ChessRookIconHandle, ChessRookIconProps>(
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
            d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"
          />
          <motion.path
            variants={PATH_VARIANTS}
            initial="normal"
            animate={controls}
            d="m7 18 1-9"
          />
          <motion.path
            variants={PATH_VARIANTS}
            initial="normal"
            animate={controls}
            d="m17 18-1-9"
          />
          <motion.path
            variants={PATH_VARIANTS}
            initial="normal"
            animate={controls}
            d="M6 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2"
          />
          <motion.path
            variants={PATH_VARIANTS}
            initial="normal"
            animate={controls}
            d="M6 4h12"
          />
          <motion.path
            variants={TOP_VARIANTS}
            initial="normal"
            animate={controls}
            d="M10 2v2"
          />
          <motion.path
            variants={TOP_VARIANTS}
            initial="normal"
            animate={controls}
            d="M14 2v2"
          />
        </svg>
      </div>
    );
  }
);

ChessRookIcon.displayName = 'ChessRookIcon';

export { ChessRookIcon };
