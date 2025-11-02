'use client';

import type { Transition } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface MinimizeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MinimizeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DEFAULT_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 250,
  damping: 25,
};

const MinimizeIcon = forwardRef<MinimizeIconHandle, MinimizeIconProps>(
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
            d="M8 3v3a2 2 0 0 1-2 2H3"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: '0%', translateY: '0%' },
              animate: { translateX: '2px', translateY: '2px' },
            }}
            animate={controls}
          />
          <motion.path
            d="M21 8h-3a2 2 0 0 1-2-2V3"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: '0%', translateY: '0%' },
              animate: { translateX: '-2px', translateY: '2px' },
            }}
            animate={controls}
          />
          <motion.path
            d="M3 16h3a2 2 0 0 1 2 2v3"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: '0%', translateY: '0%' },
              animate: { translateX: '2px', translateY: '-2px' },
            }}
            animate={controls}
          />
          <motion.path
            d="M16 21v-3a2 2 0 0 1 2-2h3"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: '0%', translateY: '0%' },
              animate: { translateX: '-2px', translateY: '-2px' },
            }}
            animate={controls}
          />
        </svg>
      </div>
    );
  }
);

MinimizeIcon.displayName = 'MinimizeIcon';

export { MinimizeIcon };
