'use client';

import { motion, useAnimation } from 'motion/react';
import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface CherryIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CherryIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const variants: Variants = {
  normal: {
    translateX: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  animate: {
    translateX: [0, -2, 2, -2, 2, 0],
    opacity: 1,
    transition: {
      duration: 0.4,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      ease: 'easeInOut',
    },
  },
};

const CherryIcon = forwardRef<CherryIconHandle, CherryIconProps>(
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
      (e) => {
        if (!isControlledRef.current) controls.start('animate');
        else onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) controls.start('normal');
        else onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(
          `cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
          className
        )}
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
            variants={variants}
            animate={controls}
            initial="normal"
            d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"
          />
          <motion.path
            variants={variants}
            animate={controls}
            initial="normal"
            d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"
          />
          <motion.path
            variants={variants}
            animate={controls}
            initial="normal"
            d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"
          />
          <motion.path
            variants={variants}
            animate={controls}
            initial="normal"
            d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"
          />
        </svg>
      </div>
    );
  }
);

CherryIcon.displayName = 'CherryIcon';

export { CherryIcon };
