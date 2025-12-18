'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface ArrowBigUpIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowBigUpIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: { d: 'M9 18v-6H5l7-7 7 7h-4v6H9z', translateY: 0 },
  animate: {
    d: 'M9 18v-6H5l7-7 7 7h-4v6H9z',
    translateY: [0, -3, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const ArrowBigUpIcon = forwardRef<ArrowBigUpIconHandle, ArrowBigUpIconProps>(
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
            d="M9 18v-6H5l7-7 7 7h-4v6H9z"
            variants={PATH_VARIANTS}
            animate={controls}
          />
        </svg>
      </div>
    );
  }
);

ArrowBigUpIcon.displayName = 'ArrowBigUpIcon';

export { ArrowBigUpIcon };
