'use client';

import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BotMessageSquareHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BotMessageSquareProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export const BotMessageSquareIcon = forwardRef<
  BotMessageSquareHandle,
  BotMessageSquareProps
>(({ className, onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
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
      className={cn('inline-flex items-center justify-center', className)}
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
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0, scale: 1 },
          animate: {
            rotate: [0, -3, 3, 0, 0],
            y: [0, 1.5, -1.5, 0],
            scale: [1, 1.03, 1],
            transition: {
              duration: 1,
              ease: 'easeInOut',
              repeat: 0,
            },
          },
        }}
      >
        {/* antenna */}
        <path d="M12 6V2H8" />

        {/* side connectors */}
        <path d="M2 12h2" />
        <path d="M20 12h2" />

        {/* message bubble pulse */}
        <motion.path
          d="M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"
          variants={{
            normal: { scale: 1, originX: 0.5, originY: 0.5 },
            animate: {
              scale: [1, 1.04, 1],
              transition: {
                duration: 0.6,
                ease: 'easeInOut',
                repeat: 1,
              },
            },
          }}
        />

        {/* eyes */}
        <motion.path
          d="M9 11v2"
          variants={{
            normal: { scaleY: 1, originY: 0.5 },
            animate: {
              scaleY: [1, 0.1, 1],
              transition: { duration: 0.4, ease: 'easeInOut', delay: 0.1 },
            },
          }}
        />
        <motion.path
          d="M15 11v2"
          variants={{
            normal: { scaleY: 1, originY: 0.5 },
            animate: {
              scaleY: [1, 0.1, 1],
              transition: { duration: 0.4, ease: 'easeInOut', delay: 0.2 },
            },
          }}
        />

        {/* typing dots (only visible when animating) */}
        <motion.circle
          cx="10"
          cy="18"
          r="0.5"
          variants={{
            normal: { opacity: 0 },
            animate: {
              opacity: [0.3, 1, 0.3],
              transition: { repeat: Infinity, duration: 1.2, delay: 0 },
            },
          }}
        />
        <motion.circle
          cx="12"
          cy="18"
          r="0.5"
          variants={{
            normal: { opacity: 0 },
            animate: {
              opacity: [0.3, 1, 0.3],
              transition: { repeat: Infinity, duration: 1.2, delay: 0.3 },
            },
          }}
        />
        <motion.circle
          cx="14"
          cy="18"
          r="0.5"
          variants={{
            normal: { opacity: 0 },
            animate: {
              opacity: [0.3, 1, 0.3],
              transition: { repeat: Infinity, duration: 1.2, delay: 0.6 },
            },
          }}
        />
      </motion.svg>
    </div>
  );
});

BotMessageSquareIcon.displayName = 'BotMessageSquareIcon';
