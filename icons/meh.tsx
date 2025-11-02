'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface MehIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MehIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MehIcon = forwardRef<MehIconHandle, MehIconProps>(
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
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      animate: {
        scale: [1, 1.05, 0.98, 1.02],
        rotate: [0, 1, -1, 0],
        transition: {
          duration: 0.7,
          times: [0, 0.4, 0.7, 1],
          ease: 'easeInOut',
        },
      },
    };

    const mouthVariants: Variants = {
      normal: {
        scaleX: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      animate: {
        scaleX: [1, 1.2, 0.9, 1.1],
        y: [0, 0.5, -0.5, 0],
        transition: {
          duration: 0.6,
          times: [0, 0.3, 0.6, 1],
          ease: 'easeInOut',
          delay: 0.1,
        },
      },
    };

    const leftEyeVariants: Variants = {
      normal: {
        scale: 1,
        x: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      animate: {
        scale: [1, 1.3, 1, 1.2],
        x: [0, -0.3, 0.3, 0],
        transition: {
          duration: 0.5,
          times: [0, 0.3, 0.6, 1],
          ease: 'easeInOut',
        },
      },
    };

    const rightEyeVariants: Variants = {
      normal: {
        scale: 1,
        x: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      animate: {
        scale: [1, 1.3, 1, 1.2],
        x: [0, 0.3, -0.3, 0],
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
          <circle cx="12" cy="12" r="10" />
          <motion.line
            variants={mouthVariants}
            animate={controls}
            initial="normal"
            x1="8"
            x2="16"
            y1="15"
            y2="15"
          />
          <motion.line
            x1="9"
            x2="9.01"
            y1="9"
            y2="9"
            variants={leftEyeVariants}
            animate={controls}
            initial="normal"
          />
          <motion.line
            x1="15"
            x2="15.01"
            y1="9"
            y2="9"
            variants={rightEyeVariants}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

MehIcon.displayName = 'MehIcon';

export { MehIcon };
