'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface SaudiRiyalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SaudiRiyalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SAUDI_RIYAL_VARIANTS: Variants = {
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

const SaudiRiyalIcon = forwardRef<SaudiRiyalIconHandle, SaudiRiyalIconProps>(
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
            d="m20 19.5-5.5 1.2"
            initial="normal"
            animate={controls}
            variants={SAUDI_RIYAL_VARIANTS}
          />
          <motion.path
            d="M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2"
            initial="normal"
            animate={controls}
            variants={SAUDI_RIYAL_VARIANTS}
          />
          <motion.path
            d="m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2"
            initial="normal"
            animate={controls}
            variants={SAUDI_RIYAL_VARIANTS}
          />
          <motion.path
            d="M20 10 4 13.5"
            initial="normal"
            animate={controls}
            variants={SAUDI_RIYAL_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

SaudiRiyalIcon.displayName = 'SaudiRiyalIcon';

export { SaudiRiyalIcon };
