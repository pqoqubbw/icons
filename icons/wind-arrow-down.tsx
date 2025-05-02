'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface WindArrowDownIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WindArrowDownIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const windVariants: Variants = {
  normal: (custom: number) => ({
    pathLength: 1,
    opacity: 1,
    pathOffset: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
      delay: custom,
    },
  }),
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      delay: custom,
    },
  }),
};

const arrowVariants: Variants = {
  normal: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  animate: {
    y: [-10, 0],
    opacity: [0, 1],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      delay: 0.35,
    },
  },
};

const WindArrowDownIcon = forwardRef<
  WindArrowDownIconHandle,
  WindArrowDownIconProps
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
        {/* Wind paths */}
        <motion.path
          d="M12.8 21.6A2 2 0 1 0 14 18H2"
          variants={windVariants}
          initial="normal"
          animate={controls}
          custom={0.2}
        />
        <motion.path
          d="M17.5 10a2.5 2.5 0 1 1 2 4H2"
          variants={windVariants}
          initial="normal"
          animate={controls}
          custom={0.4}
        />
        <motion.path
          d="M10 2v8"
          variants={arrowVariants}
          initial="normal"
          animate={controls}
        />
        <motion.path
          d="m6 6 4 4 4-4"
          variants={arrowVariants}
          initial="normal"
          animate={controls}
        />
      </svg>
    </div>
  );
});

WindArrowDownIcon.displayName = 'WindArrowDownIcon';

export { WindArrowDownIcon };
