'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface FrownIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FrownIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FrownIcon = forwardRef<FrownIconHandle, FrownIconProps>(
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
        if (!isControlledRef.current) controls.start('animate');
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('normal');
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

    const faceVariants: Variants = {
      normal: {
        scale: 1,
        rotate: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      animate: {
        scale: [1, 1.15, 1.05, 1.08],
        rotate: [0, -2, 2, 0],
        transition: {
          duration: 0.8,
          times: [0, 0.3, 0.6, 1],
          ease: 'easeInOut',
        },
      },
    };

    const mouthVariants: Variants = {
      normal: {
        d: 'M16 16s-1.5-2-4-2-4 2-4 2',
        pathLength: 1,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      animate: {
        d: 'M16 17s-1.5-2.5-4-2.5-4 2.5-4 2.5',
        pathLength: [0.3, 1, 1],
        transition: {
          d: { duration: 0.5, ease: 'easeOut' },
          pathLength: {
            duration: 0.5,
            times: [0, 0.5, 1],
            ease: 'easeInOut',
          },
          delay: 0.1,
        },
      },
    };

    const leftEyeVariants: Variants = {
      normal: {
        scale: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      animate: {
        scale: [1, 1.3, 0.9, 1.1],
        y: [0, -0.5, 0.3, 0],
        transition: {
          duration: 0.6,
          times: [0, 0.3, 0.6, 1],
          ease: 'easeInOut',
        },
      },
    };

    const rightEyeVariants: Variants = {
      normal: {
        scale: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      animate: {
        scale: [1, 0.9, 1.3, 1.1],
        y: [0, -0.5, 0.3, 0],
        transition: {
          duration: 0.6,
          times: [0, 0.3, 0.6, 1],
          ease: 'easeInOut',
        },
      },
    };

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
          initial="normal"
          variants={faceVariants}
        >
          <circle cx="12" cy="12" r="10" />
          <motion.path
            variants={mouthVariants}
            animate={controls}
            initial="normal"
            d="M16 16s-1.5-2-4-2-4 2-4 2"
          />
          <motion.line
            x1="9"
            x2="9.01"
            y1="9"
            y2="9"
            variants={leftEyeVariants}
            animate={controls}
            initial="normal"
          />
          <motion.line
            x1="15"
            x2="15.01"
            y1="9"
            y2="9"
            variants={rightEyeVariants}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

FrownIcon.displayName = 'FrownIcon';

export { FrownIcon };
