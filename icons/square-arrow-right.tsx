'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface SquareArrowRightIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SquareArrowRightIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const squareVariants: Variants = {
  normal: { transition: { duration: 0.4 } },
  animate: { transition: { duration: 0.6, ease: 'easeInOut' } },
};

const pathVariants: Variants = {
  normal: { d: 'M8 12h8', opacity: 1 },
  animate: {
    d: ['M8 12h8', 'M8 12h5', 'M8 12h8'],
    transition: { duration: 0.4 },
  },
};

const secondPathVariants: Variants = {
  normal: { d: 'm12 8 4 4-4 4', translateX: 0, opacity: 1 },
  animate: {
    d: 'm12 8 4 4-4 4',
    translateX: [0, -3, 0],
    transition: { duration: 0.4 },
  },
};

const SquareArrowRightIcon = forwardRef<
  SquareArrowRightIconHandle,
  SquareArrowRightIconProps
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
      if (!isControlledRef.current) controls.start('animate');
      else onMouseEnter?.(e);
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) controls.start('normal');
      else onMouseLeave?.(e);
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
        <motion.rect
          width="18"
          height="18"
          x="3"
          y="3"
          rx="2"
          variants={squareVariants}
          animate={controls}
          initial="normal"
        />
        <motion.path
          variants={pathVariants}
          animate={controls}
          initial="normal"
          d="M8 12h8"
        />
        <motion.path
          variants={secondPathVariants}
          animate={controls}
          initial="normal"
          d="m12 8 4 4-4 4"
        />
      </svg>
    </div>
  );
});

SquareArrowRightIcon.displayName = 'SquareArrowRightIcon';

export { SquareArrowRightIcon };
