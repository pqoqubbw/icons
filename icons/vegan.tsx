'use client';

import { motion, useAnimation } from 'motion/react';
import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface VeganIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface VeganIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const circleVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: 'linear',
      opacity: { duration: 0.1 },
    },
  },
};

const pathVariantsLeftToRight: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [0, 1], 
    transition: {
      duration: 0.6,
      ease: 'linear',
      opacity: { duration: 0.1 },
    },
  },
};

const VeganIcon = forwardRef<VeganIconHandle, VeganIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const circleControls = useAnimation();
    const path1Controls = useAnimation();
    const path2Controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => {
          circleControls.start('animate');
          path1Controls.start('animate');
          path2Controls.start('animate');
        },
        stopAnimation: () => {
          circleControls.start('normal');
          path1Controls.start('normal');
          path2Controls.start('normal');
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          circleControls.start('animate');
          path1Controls.start('animate');
          path2Controls.start('animate');
        } else onMouseEnter?.(e);
      },
      [circleControls, path1Controls, path2Controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          circleControls.start('normal');
          path1Controls.start('normal');
          path2Controls.start('normal');
        } else onMouseLeave?.(e);
      },
      [circleControls, path1Controls, path2Controls, onMouseLeave]
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
            variants={circleVariants}
            initial="normal"
            animate={circleControls}
            d="M17.41 3.59a10 10 0 1 0 3 3"
          />
          <motion.path
            variants={pathVariantsLeftToRight}
            initial="normal"
            animate={path1Controls}
            d="M16 8q6 0 6-6"
          />
          <motion.path
            variants={pathVariantsLeftToRight}
            initial="normal"
            animate={path2Controls}
            d="M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14"
          />
        </svg>
      </div>
    );
  }
);

VeganIcon.displayName = 'VeganIcon';

export { VeganIcon };