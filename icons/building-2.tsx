'use client';

import { cn } from '@/lib/utils';
import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface Building2IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Building2IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const defaultTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 1, 0.5, 1],
  opacity: { duration: 0.2 },
};

const mainBuildingVariants: Variants = {
  normal: {
    y: 0,
    opacity: 1,
  },
  animate: {
    y: [20, 0],
    opacity: [0, 1],
  },
};

const leftWingVariants: Variants = {
  normal: {
    x: 0,
    opacity: 1,
  },
  animate: {
    x: [-15, 0],
    opacity: [0, 1],
  },
};

const rightWingVariants: Variants = {
  normal: {
    x: 0,
    opacity: 1,
  },
  animate: {
    x: [15, 0],
    opacity: [0, 1],
  },
};

const windowVariants: Variants = {
  normal: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  animate: {
    y: [-5, 0],
    opacity: [0, 1],
    scale: [0.8, 1],
  },
};

const buildingOutlineTransition = { ...defaultTransition, delay: 0 };
const leftWingTransition = { ...defaultTransition, delay: 0.15 };
const rightWingTransition = { ...defaultTransition, delay: 0.3 };
const windowsTransition = [
  { ...defaultTransition, delay: 0.4 },
  { ...defaultTransition, delay: 0.5 },
  { ...defaultTransition, delay: 0.6 },
  { ...defaultTransition, delay: 0.7 },
];

const Building2Icon = forwardRef<Building2IconHandle, Building2IconProps>(
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
          void controls.start('normal');
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
            d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"
            variants={mainBuildingVariants}
            transition={buildingOutlineTransition}
            animate={controls}
          />

          <motion.path
            d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"
            variants={leftWingVariants}
            transition={leftWingTransition}
            animate={controls}
          />

          <motion.path
            d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"
            variants={rightWingVariants}
            transition={rightWingTransition}
            animate={controls}
          />

          <motion.path
            d="M10 6h4"
            variants={windowVariants}
            transition={windowsTransition[0]}
            animate={controls}
          />

          <motion.path
            d="M10 10h4"
            variants={windowVariants}
            transition={windowsTransition[1]}
            animate={controls}
          />

          <motion.path
            d="M10 14h4"
            variants={windowVariants}
            transition={windowsTransition[2]}
            animate={controls}
          />

          <motion.path
            d="M10 18h4"
            variants={windowVariants}
            transition={windowsTransition[3]}
            animate={controls}
          />
        </svg>
      </div>
    );
  }
);

Building2Icon.displayName = 'Building2Icon';

export { Building2Icon };
