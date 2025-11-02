'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface SmilePlusIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SmilePlusIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SmilePlusIcon = forwardRef<SmilePlusIconHandle, SmilePlusIconProps>(
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

    const faceVariants: Variants = {
      normal: { scale: 1 },
      animate: {
        scale: 1.1,
        transition: { type: 'spring', stiffness: 200, damping: 20 },
      },
    };

    const plusVariants: Variants = {
      normal: { rotate: 0, scale: 1 },
      animate: {
        rotate: 90,
        scale: 1.2,
        transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.1 },
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
          <path d="M22 11v1a10 10 0 1 1-9-10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" x2="9.01" y1="9" y2="9" />
          <line x1="15" x2="15.01" y1="9" y2="9" />
          <motion.path variants={plusVariants} animate={controls} d="M16 5h6" />
          <motion.path variants={plusVariants} animate={controls} d="M19 2v6" />
        </motion.svg>
      </div>
    );
  }
);

SmilePlusIcon.displayName = 'SmilePlusIcon';

export { SmilePlusIcon };
