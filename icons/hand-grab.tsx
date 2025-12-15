'use client';

import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface HandGrabIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HandGrabIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const HandGrabIcon = forwardRef<HandGrabIconHandle, HandGrabIconProps>(
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
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 0.9, 1],
              transition: {
                duration: 0.4,
                ease: 'easeInOut',
              },
            },
          }}
          initial="normal"
          animate={controls}
        >
          <path d="M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" />
          <path d="M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
          <path d="M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5" />
          <path d="M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
          <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0" />
        </motion.svg>
      </div>
    );
  }
);

HandGrabIcon.displayName = 'HandGrabIcon';

export { HandGrabIcon };
