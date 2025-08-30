'use client';

import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface WavesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WavesIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const WavesIcon = forwardRef<WavesIconHandle, WavesIconProps>(
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
        }
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('normal');
        }
        onMouseLeave?.(e);
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
          <motion.path
            d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1"
            initial={{ pathLength: 1 }}
            variants={{
              normal: { pathLength: 1 },
              animate: {
                pathLength: [0, 1],
                transition: { duration: 0.4, ease: 'linear' },
              },
            }}
            animate={controls}
          />
          <motion.path
            d="M2 12c.6.5 1.2 1 2.5 1c2.5 0 2.5-2 5-2c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1"
            initial={{ pathLength: 1 }}
            variants={{
              normal: { pathLength: 1 },
              animate: {
                pathLength: [0, 1],
                transition: { duration: 0.4, ease: 'linear' },
              },
            }}
            animate={controls}
          />
          <motion.path
            d="M2 18c.6.5 1.2 1 2.5 1c2.5 0 2.5-2 5-2c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1"
            initial={{ pathLength: 1 }}
            variants={{
              normal: { pathLength: 1 },
              animate: {
                pathLength: [0, 1],
                transition: { duration: 0.4, ease: 'linear' },
              },
            }}
            animate={controls}
          />
        </svg>
      </div>
    );
  }
);

WavesIcon.displayName = 'WavesIcon';
export { WavesIcon };
