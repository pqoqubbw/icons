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

const pulseVariants: Variants = {
  normal: { scale: 1, opacity: 1 },
  pulse: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.5, 1],
    transition: {
      duration: 1.2,
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
        startAnimation: () => controls.start('pulse'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback((e: any) => {
      if (!isControlledRef.current) controls.start('pulse');
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
          {/* Bug base (from Lucide's bug icon) */}
          <path d="M8 2v2m8-2v2M9 10h6m-6 4h6" />
          <path d="M12 6v14a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" />
          <path d="M12 6v14a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4z" />
          {/* Legs */}
          <path d="M3 13h2M3 17h2M19 13h2M19 17h2" />
          {/* Pulse dot as breakpoint */}
          <motion.circle
            cx="12"
            cy="4"
            r="1.5"
            fill="red"
            variants={pulseVariants}
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
