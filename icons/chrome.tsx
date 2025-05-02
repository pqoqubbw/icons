'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface ChromeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChromeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const transition: Transition = {
  duration: 0.3,
  opacity: { delay: 0.15 },
};

const variants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      ...transition,
      delay: 0.1 * custom,
    },
  }),
};

const ChromeIcon = forwardRef<ChromeIconHandle, ChromeIconProps>(
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
          <circle cx="12" cy="12" r="10" />
          <motion.circle
            cx="12"
            cy="12"
            r="4"
            variants={variants}
            animate={controls}
            custom={0}
          />
          <motion.line
            x1="21.17"
            x2="12"
            y1="8"
            y2="8"
            variants={variants}
            animate={controls}
            custom={3}
          />
          <motion.line
            x1="3.95"
            x2="8.54"
            y1="6.06"
            y2="14"
            variants={variants}
            animate={controls}
            custom={3}
          />
          <motion.line
            x1="10.88"
            x2="15.46"
            y1="21.94"
            y2="14"
            variants={variants}
            animate={controls}
            custom={3}
          />
        </svg>
      </div>
    );
  }
);

ChromeIcon.displayName = 'ChromeIcon';

export { ChromeIcon };
