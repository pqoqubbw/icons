'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes, MouseEvent } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface FolderLockIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FolderLockIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LOCK_VARIANTS: Variants = {
  normal: { y: 0, rotate: 0 },
  animate: {
    y: [0, -1.6, 0],
    rotate: [0, -3, 2, 0],
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

const FolderLockIcon = forwardRef<FolderLockIconHandle, FolderLockIconProps>(
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
      (event: MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('animate');
        } else {
          onMouseEnter?.(event);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('normal');
        } else {
          onMouseLeave?.(event);
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
          <path d="M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5" />
          <motion.g
            variants={LOCK_VARIANTS}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '18px 19px' }}
          >
            <rect width="8" height="5" x="14" y="17" rx="1" />
            <path d="M20 17v-2a2 2 0 1 0-4 0v2" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

FolderLockIcon.displayName = 'FolderLockIcon';

export { FolderLockIcon };
