'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface ChessBishopIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChessBishopIconProps extends HTMLAttributes<HTMLDivElement> {
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
    scale: [0.96, 1],
    y: [2, 0],
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
};

const DIAGONAL_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  animate: {
    opacity: [0.6, 1],
    x: [-2, 0],
    y: [-2, 0],
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const CAP_VARIANTS: Variants = {
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

const ChessBishopIcon = forwardRef<ChessBishopIconHandle, ChessBishopIconProps>(
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
            d="M15 18c1.5-.615 3-2.461 3-4.923C18 8.769 14.5 4.462 12 2 9.5 4.462 6 8.77 6 13.077 6 15.539 7.5 17.385 9 18"
          />
          <motion.path
            variants={DIAGONAL_VARIANTS}
            initial="normal"
            animate={controls}
            d="m16 7-2.5 2.5"
          />
          <motion.path
            variants={CAP_VARIANTS}
            initial="normal"
            animate={controls}
            d="M9 2h6"
          />
        </svg>
      </div>
    );
  }
);

ChessBishopIcon.displayName = 'ChessBishopIcon';

export { ChessBishopIcon };
