'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface HeartIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HeartIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const heartPathVariants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    scale: 1,
    fill: 'transparent',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    scale: [0.8, 1],
    fill: ['transparent', 'transparent'],
    transition: {
      pathLength: { duration: 0.6, ease: 'easeInOut', delay: custom * 0.1 },
      opacity: { duration: 0.3, ease: 'easeInOut', delay: custom * 0.1 },
      scale: { duration: 0.5, ease: 'easeOut', delay: custom * 0.1 },
      fill: { duration: 0.3, ease: 'easeInOut', delay: 0.3 + custom * 0.1 },
    },
  }),
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      times: [0, 0.5, 1],
      repeat: 1,
    },
  },
};

const HeartIcon = forwardRef<HeartIconHandle, HeartIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    const animationSequence = useCallback(async () => {
      await controls.start('animate');
      await controls.start('pulse');
    }, [controls]);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => animationSequence(),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          animationSequence();
        } else {
          onMouseEnter?.(e);
        }
      },
      [animationSequence, onMouseEnter]
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
          <motion.path
            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.332.805-4.5 2.05C10.876 3.805 9.288 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            initial="normal"
            animate={controls}
            variants={heartPathVariants}
            custom={0}
          />
        </svg>
      </div>
    );
  }
);

HeartIcon.displayName = 'HeartIcon';

export { HeartIcon };
