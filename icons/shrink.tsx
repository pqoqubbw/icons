'use client';

import type { Transition } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface ShrinkIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ShrinkIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DEFAULT_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 250,
  damping: 25,
};

const ShrinkIcon = forwardRef<ShrinkIconHandle, ShrinkIconProps>(
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
            d="M9 4.2V9m0 0H4.2M9 9 3 3"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: '0%', translateY: '0%' },
              animate: { translateX: '1px', translateY: '1px' },
            }}
            animate={controls}
          />
          <motion.path
            d="M15 4.2V9m0 0h4.8M15 9l6-6"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: '0%', translateY: '0%' },
              animate: { translateX: '-1px', translateY: '1px' },
            }}
            animate={controls}
          />
          <motion.path
            d="M9 19.8V15m0 0H4.2M9 15l-6 6"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: '0%', translateY: '0%' },
              animate: { translateX: '1px', translateY: '-1px' },
            }}
            animate={controls}
          />
          <motion.path
            d="m15 15 6 6m-6-6v4.8m0-4.8h4.8"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: '0%', translateY: '0%' },
              animate: { translateX: '-1px', translateY: '-1px' },
            }}
            animate={controls}
          />
        </svg>
      </div>
    );
  }
);

ShrinkIcon.displayName = 'ShrinkIcon';

export { ShrinkIcon };
