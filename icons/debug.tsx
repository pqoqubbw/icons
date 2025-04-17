'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface DebugIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface DebugIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const legVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const DebugIcon = forwardRef<DebugIconHandle, DebugIconProps>(
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

    const handleMouseEnter = useCallback((e: any) => {
      if (!isControlledRef.current) controls.start('animate');
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
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8h.01" />
          <path d="M8 16s1.5-2 4-2 4 2 4 2" />
          <motion.line
            x1="12"
            y1="22"
            x2="12"
            y2="24"
            variants={legVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

DebugIcon.displayName = 'DebugIcon';
export { DebugIcon };
