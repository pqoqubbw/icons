'use client';

import type { Transition, Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface ArrowDown01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowDown01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SWAP_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 240,
  damping: 24,
};

const SWAP_VARIANTS: Variants = {
  normal: {
    translateY: 0,
  },
  animate: (custom: number) => ({
    translateY: custom * 10,
  }),
};

const ArrowDown01Icon = forwardRef<ArrowDown01IconHandle, ArrowDown01IconProps>(
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
          <path d="m3 16 4 4 4-4" />
          <path d="M7 20V4" />
          <motion.rect
            x="15"
            y="4"
            width="4"
            height="6"
            ry="2"
            variants={SWAP_VARIANTS}
            initial="normal"
            animate={controls}
            custom={1}
            transition={SWAP_TRANSITION}
          />
          <motion.g
            variants={SWAP_VARIANTS}
            initial="normal"
            animate={controls}
            custom={-1}
            transition={SWAP_TRANSITION}
          >
            <path d="M17 20v-6h-2" />
            <path d="M15 20h4" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

ArrowDown01Icon.displayName = 'ArrowDown01con';

export { ArrowDown01Icon };
