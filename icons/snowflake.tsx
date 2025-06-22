'use client';

import { motion, useAnimation, type Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

const pathVariants: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.4,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
};

export interface SnowflakeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SnowflakeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SnowflakeIcon = forwardRef<SnowflakeIconHandle, SnowflakeIconProps>(
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
          variants={pathVariants}
          animate={controls}
          style={{ transformOrigin: 'center' }}
        >
          <path d="m10 20-1.25-2.5L6 18" />
          <path d="M10 4 8.75 6.5 6 6" />
          <path d="m14 20 1.25-2.5L18 18" />
          <path d="m14 4 1.25 2.5L18 6" />
          <path d="m17 21-3-6h-4" />
          <path d="m17 3-3 6 1.5 3" />
          <path d="M2 12h6.5L10 9" />
          <path d="m20 10-1.5 2 1.5 2" />
          <path d="M22 12h-6.5L14 15" />
          <path d="m4 10 1.5 2L4 14" />
          <path d="m7 21 3-6-1.5-3" />
          <path d="m7 3 3 6h4" />
        </motion.svg>
      </div>
    );
  }
);

SnowflakeIcon.displayName = 'SnowflakeIcon';

export { SnowflakeIcon };
