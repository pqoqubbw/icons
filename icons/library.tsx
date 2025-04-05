'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface LibraryIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LibraryIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const defaultTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 1, 0.5, 1],
  opacity: { duration: 0.2 },
};

const firstBarVariants: Variants = {
  normal: {
    scaleY: 1,
    y: 0,
    opacity: 1,
    originY: 1,
  },
  animate: {
    scaleY: [0, 1],
    y: [4, 0],
    opacity: [0, 1],
    originY: 1,
  },
};

const secondBarVariants: Variants = {
  normal: {
    scaleY: 1,
    y: 0,
    opacity: 1,
    originY: 1,
  },
  animate: {
    scaleY: [0, 1],
    y: [2, 0],
    opacity: [0, 1],
    originY: 1,
  },
};

const thirdBarVariants: Variants = {
  normal: {
    scaleY: 1,
    y: 0,
    opacity: 1,
    originY: 1,
  },
  animate: {
    scaleY: [0, 1],
    y: [3, 0],
    opacity: [0, 1],
    originY: 1,
  },
};

const diagonalBarVariants: Variants = {
  normal: {
    rotate: 0,
    opacity: 1,
    x: 0,
    y: 0,
  },
  animate: {
    rotate: [-15, 0],
    opacity: [0, 1],
    x: [-2, 0],
    y: [-2, 0],
  },
};

const barTransitions = [
  { ...defaultTransition, delay: 0 },
  { ...defaultTransition, delay: 0.2 },
  { ...defaultTransition, delay: 0.3 },
  { ...defaultTransition, delay: 0.4 },
];

const LibraryIcon = forwardRef<LibraryIconHandle, LibraryIconProps>(
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
          void controls.start('animate');
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
        className={cn(
          `cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
          className
        )}
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
            d="M4 4v16"
            variants={firstBarVariants}
            transition={barTransitions[0]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M8 8v12"
            variants={secondBarVariants}
            transition={barTransitions[1]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M12 6v14"
            variants={thirdBarVariants}
            transition={barTransitions[2]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="m16 6 4 14"
            variants={diagonalBarVariants}
            transition={barTransitions[3]}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

LibraryIcon.displayName = 'LibraryIcon';

export { LibraryIcon };
