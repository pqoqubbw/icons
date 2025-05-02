'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface LaughIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LaughIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LaughIcon = forwardRef<LaughIconHandle, LaughIconProps>(
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
        scale: [1, 1.15, 1, 1.1, 1.05],
        rotate: [0, 3, -2, 3, 0],
        strokeWidth: [2, 2.5, 2.5, 2.5, 2],
        transition: {
          duration: 1.2,
          times: [0, 0.2, 0.4, 0.6, 1],
          ease: 'easeInOut',
          repeat: 0,
          repeatType: 'reverse',
        },
      },
    };

    const mouthVariants: Variants = {
      normal: {
        d: 'M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z',
        pathLength: 1,
        strokeWidth: 2,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      animate: {
        d: 'M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z',
        pathLength: [0.7, 1, 1],
        strokeWidth: 2.5,
        scaleY: [1, 1.2, 1.1],
        y: [0, 0.5, 0.3],
        transition: {
          duration: 0.6,
          times: [0, 0.5, 1],
          ease: 'easeInOut',
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
        scale: [1, 1.3, 1, 1.7],
        opacity: [1, 1, 1, 1],
        transition: {
          duration: 0.6,
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
          <circle cx="12" cy="12" r="10" />
          <motion.path
            variants={mouthVariants}
            animate={controls}
            initial="normal"
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

LaughIcon.displayName = 'LaughIcon';

export { LaughIcon };
