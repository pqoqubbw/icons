'use client';

import type { Transition, Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface LoaderPinwheelIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LoaderPinwheelIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const G_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: 'linear',
    },
  },
};

const DEFAULT_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 50,
  damping: 10,
};

const LoaderPinwheelIcon = forwardRef<
  LoaderPinwheelIconHandle,
  LoaderPinwheelIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        <motion.g
          transition={DEFAULT_TRANSITION}
          variants={G_VARIANTS}
          animate={controls}
        >
          <path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" />
          <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
          <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
        </motion.g>
        <circle cx="12" cy="12" r="10" />
      </svg>
    </div>
  );
});

LoaderPinwheelIcon.displayName = 'LoaderPinwheelIcon';

export { LoaderPinwheelIcon };
