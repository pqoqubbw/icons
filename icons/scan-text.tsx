'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface ScanTextIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ScanTextIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const frameVariants: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 1 },
};

const lineVariants: Variants = {
  visible: { pathLength: 1, opacity: 1 },
  hidden: { pathLength: 0, opacity: 0 },
};

const ScanTextIcon = forwardRef<ScanTextIconHandle, ScanTextIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: async () => {
          await controls.start((i) => ({
            pathLength: 0,
            opacity: 0,
            transition: { delay: i * 0.1, duration: 0.3 },
          }));
          await controls.start((i) => ({
            pathLength: 1,
            opacity: 1,
            transition: { delay: i * 0.1, duration: 0.3 },
          }));
        },
        stopAnimation: () => controls.start('visible'),
      };
    });

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          await controls.start((i) => ({
            pathLength: 0,
            opacity: 0,
            transition: { delay: i * 0.1, duration: 0.3 },
          }));
          await controls.start((i) => ({
            pathLength: 1,
            opacity: 1,
            transition: { delay: i * 0.1, duration: 0.3 },
          }));
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('visible');
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
          <motion.path variants={frameVariants} d="M3 7V5a2 2 0 0 1 2-2h2" />
          <motion.path variants={frameVariants} d="M17 3h2a2 2 0 0 1 2 2v2" />
          <motion.path variants={frameVariants} d="M21 17v2a2 2 0 0 1-2 2h-2" />
          <motion.path variants={frameVariants} d="M7 21H5a2 2 0 0 1-2-2v-2" />
          <motion.path
            variants={lineVariants}
            initial="visible"
            animate={controls}
            custom={0}
            d="M7 8h8"
          />
          <motion.path
            variants={lineVariants}
            initial="visible"
            animate={controls}
            custom={1}
            d="M7 12h10"
          />
          <motion.path
            variants={lineVariants}
            initial="visible"
            animate={controls}
            custom={2}
            d="M7 16h6"
          />
        </svg>
      </div>
    );
  }
);

ScanTextIcon.displayName = 'ScanTextIcon';

export { ScanTextIcon };
