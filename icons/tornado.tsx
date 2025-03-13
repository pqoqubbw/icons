'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface TornadoIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TornadoIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const pathVariants: Variants = {
  normal: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  animate: (custom: number) => ({
    x: [0, custom * 1, 0],
    opacity: 1,
    transition: {
      x: {
        duration: 0.6,
        repeat: 0.7,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: custom * 0.1,
      },
    },
  }),
};

const TornadoIcon = forwardRef<TornadoIconHandle, TornadoIconProps>(
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
            d="M21 4H3"
            variants={pathVariants}
            initial="normal"
            animate={controls}
            custom={1}
          />
          <motion.path
            d="M18 8H6"
            variants={pathVariants}
            initial="normal"
            animate={controls}
            custom={2}
          />
          <motion.path
            d="M19 12H9"
            variants={pathVariants}
            initial="normal"
            animate={controls}
            custom={3}
          />
          <motion.path
            d="M16 16h-6"
            variants={pathVariants}
            initial="normal"
            animate={controls}
            custom={4}
          />
          <motion.path
            d="M11 20H9"
            variants={pathVariants}
            initial="normal"
            animate={controls}
            custom={5}
          />
        </svg>
      </div>
    );
  }
);

TornadoIcon.displayName = 'TornadoIcon';

export { TornadoIcon };
