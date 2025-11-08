'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

const CURVE_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0.4, 1],
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

const ARROW_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0.4, 1],
    transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' },
  },
};

export interface CornerDownLeftIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CornerDownLeftIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CornerDownLeftIcon = forwardRef<
  CornerDownLeftIconHandle,
  CornerDownLeftIconProps
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
        <motion.path
          d="M20 4v7a4 4 0 0 1-4 4H4"
          animate={controls}
          variants={CURVE_VARIANTS}
          initial="normal"
          strokeDasharray="1 1"
          pathLength="1"
        />
        <motion.path
          d="m9 10-5 5 5 5"
          animate={controls}
          variants={ARROW_VARIANTS}
          initial="normal"
          strokeDasharray="1 1"
          pathLength="1"
        />
      </svg>
    </div>
  );
});

CornerDownLeftIcon.displayName = 'CornerDownLeftIcon';

export { CornerDownLeftIcon };
