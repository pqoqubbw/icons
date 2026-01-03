'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface ChessKingIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChessKingIconProps extends HTMLAttributes<HTMLDivElement> {
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

const CROSS_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    y: 0,
  },
  animate: {
    opacity: [0.6, 1],
    y: [-3, 0],
    transition: {
      duration: 0.2,
      ease: 'easeOut',
      delay: 0.05,
    },
  },
};

const ChessKingIcon = forwardRef<ChessKingIconHandle, ChessKingIconProps>(
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
            d="m6.7 18-1-1C4.35 15.682 3 14.09 3 12a5 5 0 0 1 4.95-5c1.584 0 2.7.455 4.05 1.818C13.35 7.455 14.466 7 16.05 7A5 5 0 0 1 21 12c0 2.082-1.359 3.673-2.7 5l-1 1"
          />
          <motion.path
            variants={CROSS_VARIANTS}
            initial="normal"
            animate={controls}
            d="M10 4h4"
          />
          <motion.path
            variants={CROSS_VARIANTS}
            initial="normal"
            animate={controls}
            d="M12 2v6.818"
          />
        </svg>
      </div>
    );
  }
);

ChessKingIcon.displayName = 'ChessKingIcon';

export { ChessKingIcon };
