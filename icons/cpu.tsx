'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface CpuIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CpuIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const transition: Transition = {
  duration: 0.5,
  ease: 'easeInOut',
  repeat: 1,
};

const yVariants: Variants = {
  normal: {
    scale: 1,
    rotate: 0,
    opacity: 1,
  },
  animate: {
    scaleY: [1, 1.5, 1],
    opacity: [1, 0.8, 1],
  },
};
const xVariants: Variants = {
  normal: {
    scale: 1,
    rotate: 0,
    opacity: 1,
  },
  animate: {
    scaleX: [1, 1.5, 1],
    opacity: [1, 0.8, 1],
  },
};

const CpuIcon = forwardRef<CpuIconHandle, CpuIconProps>(
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
          <rect width="16" height="16" x="4" y="4" rx="2" />
          <rect width="6" height="6" x="9" rx="1" y="9" />
          <motion.path
            d="M15 2v2"
            variants={yVariants}
            transition={transition}
            animate={controls}
          />
          <motion.path
            d="M15 20v2"
            variants={yVariants}
            transition={transition}
            animate={controls}
          />
          <motion.path
            d="M2 15h2"
            variants={xVariants}
            transition={transition}
            animate={controls}
          />
          <motion.path
            d="M2 9h2"
            variants={xVariants}
            transition={transition}
            animate={controls}
          />
          <motion.path
            d="M20 15h2"
            variants={xVariants}
            transition={transition}
            animate={controls}
          />
          <motion.path
            d="M20 9h2"
            variants={xVariants}
            transition={transition}
            animate={controls}
          />
          <motion.path
            d="M9 2v2"
            variants={yVariants}
            transition={transition}
            animate={controls}
          />
          <motion.path
            d="M9 20v2"
            variants={yVariants}
            transition={transition}
            animate={controls}
          />
        </svg>
      </div>
    );
  }
);

CpuIcon.displayName = 'CpuIcon';

export { CpuIcon };
