'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface SmileIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SmileIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SmileIcon = forwardRef<SmileIconHandle, SmileIconProps>(
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
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('normal');
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

    const faceVariants: Variants = {
      normal: {
        scale: 1,
        rotate: 0,
        strokeWidth: 2,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      animate: {
        scale: [1, 1.15, 1.05, 1.1],
        rotate: [0, -3, 3, 0],
        strokeWidth: [2, 2.5, 2.5, 2.5],
        transition: {
          duration: 0.8,
          times: [0, 0.3, 0.6, 1],
          ease: 'easeInOut',
        },
      },
    };

    const mouthVariants: Variants = {
      normal: {
        d: 'M8 14s1.5 2 4 2 4-2 4-2',
        pathLength: 1,
        pathOffset: 0,
        strokeWidth: 2,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      animate: {
        d: 'M7 13.5s2.5 3.5 5 3.5 5-3.5 5-3.5',
        pathLength: [0.3, 1, 1],
        pathOffset: [0, 0, 0],
        strokeWidth: 2.5,
        transition: {
          d: { duration: 0.4, ease: 'easeOut' },
          pathLength: {
            duration: 0.5,
            times: [0, 0.5, 1],
            ease: 'easeInOut',
          },
          delay: 0.1,
        },
      },
    };

    const eyeVariants: Variants = {
      normal: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      animate: {
        scale: [1, 1.5, 0.8, 1.2],
        opacity: [1, 1, 1, 1],
        transition: {
          duration: 0.5,
          times: [0, 0.3, 0.6, 1],
          ease: 'easeInOut',
        },
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
          initial="normal"
          variants={faceVariants}
        >
          <motion.circle cx="12" cy="12" r="10" />
          <motion.path
            variants={mouthVariants}
            animate={controls}
            initial="normal"
            d="M8 14s1.5 2 4 2 4-2 4-2"
          />
          <motion.line
            x1="9"
            x2="9.01"
            y1="9"
            y2="9"
            variants={eyeVariants}
            animate={controls}
            initial="normal"
          />
          <motion.line
            x1="15"
            x2="15.01"
            y1="9"
            y2="9"
            variants={eyeVariants}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

SmileIcon.displayName = 'SmileIcon';

export { SmileIcon };
