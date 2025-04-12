'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface PromptIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PromptIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const caretVariants: Variants = {
  normal: { opacity: 1 },
  blink: {
    opacity: [1, 0, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

const arrowVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -1.5, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const PromptIcon = forwardRef<PromptIconHandle, PromptIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start('blink'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback((e: any) => {
      if (!isControlledRef.current) controls.start('blink');
      else onMouseEnter?.(e);
    }, []);

    const handleMouseLeave = useCallback((e: any) => {
      if (!isControlledRef.current) controls.start('normal');
      else onMouseLeave?.(e);
    }, []);

    return (
      <div
        className={cn(
          'cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center',
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
          <motion.polyline
            points="4 17 10 11 4 5"
            variants={arrowVariants}
            initial="initial"
            animate="animate"
          />
          <motion.line
            x1="12"
            x2="20"
            y1="19"
            y2="19"
            variants={caretVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

PromptIcon.displayName = 'PromptIcon';
export { PromptIcon };
