'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface CloudRainIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CloudRainIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const RAIN_VARIANTS: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const RAIN_CHILD_VARIANTS: Variants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [1, 0.2, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const CloudRainIcon = forwardRef<CloudRainIconHandle, CloudRainIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 24, ...props }, ref) => {
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
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <motion.g
            variants={RAIN_VARIANTS}
            animate={controls}
            initial="normal"
          >
            <motion.path variants={RAIN_CHILD_VARIANTS} d="M16 14v6" />
            <motion.path variants={RAIN_CHILD_VARIANTS} d="M8 14v6" />
            <motion.path variants={RAIN_CHILD_VARIANTS} d="M12 16v6" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

CloudRainIcon.displayName = 'CloudRainIcon';

export { CloudRainIcon };
