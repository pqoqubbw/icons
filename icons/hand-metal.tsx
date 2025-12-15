'use client';

import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface HandMetalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HandMetalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const HandMetalIcon = forwardRef<HandMetalIconHandle, HandMetalIconProps>(
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
            normal: { rotate: 0 },
            animate: {
              rotate: [0, -15, 15, -10, 10, 0],
              transition: {
                duration: 0.6,
                ease: 'easeInOut',
              },
            },
          }}
          initial="normal"
          animate={controls}
          style={{ originX: '50%', originY: '90%' }}
        >
          <path d="M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" />
          <path d="M14 11V9a2 2 0 1 0-4 0v2" />
          <path d="M10 10.5V5a2 2 0 1 0-4 0v9" />
          <path d="m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5" />
        </motion.svg>
      </div>
    );
  }
);

HandMetalIcon.displayName = 'HandMetalIcon';

export { HandMetalIcon };
