'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface AArrowUpIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AArrowUpIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const letterVariants: Variants = {
  normal: { opacity: 1, scale: 1 },
  animate: {
    opacity: [0, 1],
    scale: [0.8, 1],
    transition: { duration: 0.3 },
  },
};

const arrowVariants: Variants = {
  normal: { opacity: 1, y: 0 },
  animate: {
    opacity: [0, 1],
    y: [10, 0], // Changed from [-10, 0] to animate upward
    transition: { duration: 0.3, delay: 0.2 },
  },
};

const AArrowUpIcon = forwardRef<AArrowUpIconHandle, AArrowUpIconProps>(
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
          {/* Letter A - unchanged */}
          <motion.path
            d="M3.5 13h6"
            animate={controls}
            variants={letterVariants}
          />
          <motion.path
            d="m2 16 4.5-9 4.5 9"
            animate={controls}
            variants={letterVariants}
          />
          {/* Arrow pointing up - modified */}
          <motion.path
            d="M18 16V7" // Vertical line from bottom to top
            animate={controls}
            variants={arrowVariants}
          />
          <motion.path
            d="m14 11 4-4 4 4" // Arrowhead pointing up
            animate={controls}
            variants={arrowVariants}
          />
        </svg>
      </div>
    );
  }
);

AArrowUpIcon.displayName = 'AArrowUpIcon';

export { AArrowUpIcon };
