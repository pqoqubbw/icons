'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface ItalicIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ItalicIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const lineVariants: Variants = {
  normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
  },
};

const ItalicIcon = forwardRef<ItalicIconHandle, ItalicIconProps>(
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
          <motion.line
            transition={{ duration: 0.2 }}
            variants={lineVariants}
            animate={controls}
            x1="19"
            x2="10"
            y1="4"
            y2="4"
          />
          <motion.line
            transition={{ duration: 0.2 }}
            variants={lineVariants}
            animate={controls}
            x1="14"
            x2="5"
            y1="20"
            y2="20"
          />
          <motion.line
            transition={{
              delay: 0.1,
              duration: 0.4,
            }}
            variants={{
              normal: { pathLength: 1, pathOffset: 0 },
              animate: {
                pathLength: [0, 1],
                pathOffset: [1, 0],
              },
            }}
            animate={controls}
            x1="15"
            x2="9"
            y1="4"
            y2="20"
          />
        </svg>
      </div>
    );
  }
);

ItalicIcon.displayName = 'ItalicIcon';

export { ItalicIcon };
