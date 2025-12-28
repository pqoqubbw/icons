'use client';

import type { Transition } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface AlignLeftIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AlignLeftIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DEFAULT_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 150,
  damping: 15,
  mass: 0.3,
};

const AlignLeftIcon = forwardRef<AlignLeftIconHandle, AlignLeftIconProps>(
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
            x1="3"
            x2="21"
            y1="6"
            y2="6"
            variants={{
              normal: { x2: 21 },
              animate: { x2: 21 },
            }}
            animate={controls}
            transition={DEFAULT_TRANSITION}
          />

          <motion.line
            x1="3"
            x2="15"
            y1="12"
            y2="12"
            variants={{
              normal: { x2: 15 },
              animate: { x2: 19 },
            }}
            animate={controls}
            transition={DEFAULT_TRANSITION}
          />

          <motion.line
            x1="3"
            x2="17"
            y1="18"
            y2="18"
            variants={{
              normal: { x2: 17 },
              animate: { x2: 12 },
            }}
            animate={controls}
            transition={DEFAULT_TRANSITION}
          />
        </svg>
      </div>
    );
  }
);

AlignLeftIcon.displayName = 'AlignLeftIcon';

export { AlignLeftIcon };
