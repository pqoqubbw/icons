'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface ScanFaceIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ScanFaceIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ScanFaceIcon = forwardRef<ScanFaceIconHandle, ScanFaceIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: async () => {
          await controls.start('hidden');
          await controls.start('visible');
        },
        stopAnimation: () => controls.start('visible'),
      };
    });

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          await controls.start('hidden');
          await controls.start('visible');
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

    const faceVariants: Variants = {
      visible: { scale: 1 },
      hidden: {
        scale: 0.9,
        transition: { type: 'spring', stiffness: 200, damping: 20 },
      },
    };

    const cornerVariants: Variants = {
      visible: { scale: 1, rotate: 0, opacity: 1 },
      hidden: {
        scale: 1.2,
        rotate: 45,
        opacity: 0,
        transition: { type: 'spring', stiffness: 200, damping: 20 },
      },
    };

    const mouthVariants: Variants = {
      visible: { scale: 1, opacity: 1 },
      hidden: {
        scale: 0.8,
        opacity: 0,
        transition: { duration: 0.3, delay: 0.1 },
      },
    };

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
          variants={faceVariants}
        >
          <motion.path
            variants={cornerVariants}
            animate={controls}
            initial="visible"
            d="M3 7V5a2 2 0 0 1 2-2h2"
          />
          <motion.path
            variants={cornerVariants}
            animate={controls}
            initial="visible"
            d="M17 3h2a2 2 0 0 1 2 2v2"
          />
          <motion.path
            variants={cornerVariants}
            animate={controls}
            initial="visible"
            d="M21 17v2a2 2 0 0 1-2 2h-2"
          />
          <motion.path
            variants={cornerVariants}
            animate={controls}
            initial="visible"
            d="M7 21H5a2 2 0 0 1-2-2v-2"
          />
          <motion.path
            variants={mouthVariants}
            animate={controls}
            initial="visible"
            d="M8 14s1.5 2 4 2 4-2 4-2"
          />
          <line x1="9" x2="9.01" y1="9" y2="9" />
          <line x1="15" x2="15.01" y1="9" y2="9" />
        </motion.svg>
      </div>
    );
  }
);

ScanFaceIcon.displayName = 'ScanFaceIcon';

export { ScanFaceIcon };
