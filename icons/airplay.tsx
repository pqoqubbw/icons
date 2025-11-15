'use client';

import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { easeInOut, easeOut, motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface AirplayIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AirplayIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DURATION = 0.3;

const SCREEN_VARIANTS = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: { duration: DURATION },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: DURATION * 2,
      ease: easeInOut,
    },
  },
};

const TRIANGLE_VARIANTS = {
  normal: {
    scale: 1,
    opacity: 1,
    transition: { duration: DURATION },
  },
  animate: {
    scale: [0.6, 1.1, 1],
    opacity: [0, 1],
    transition: {
      duration: DURATION * 2,
      ease: easeOut,
    },
  },
};

const AirplayIcon = forwardRef<AirplayIconHandle, AirplayIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: async () => {
          await controls.start('animate');
          controls.start('normal');
        },
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          await controls.start('animate');
          controls.start('normal');
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
            d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"
            variants={SCREEN_VARIANTS}
            animate={controls}
          />
          <motion.path
            d="M12 15l5 6H7z"
            variants={TRIANGLE_VARIANTS}
            animate={controls}
          />
        </svg>
      </div>
    );
  }
);

AirplayIcon.displayName = 'AirplayIcon';

export { AirplayIcon };
