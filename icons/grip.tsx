'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface GripIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GripProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CIRCLES = [
  { cx: 19, cy: 5 },
  { cx: 19, cy: 12 },
  { cx: 12, cy: 5 },
  { cx: 19, cy: 19 },
  { cx: 12, cy: 12 },
  { cx: 5, cy: 5 },
  { cx: 12, cy: 19 },
  { cx: 5, cy: 12 },
  { cx: 5, cy: 19 },
];

const VARIANTS: Variants = {
  normal: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
  animate: (index: number) => ({
    opacity: [1, 0.3, 0.3, 1],
    transition: {
      delay: index * 0.07,
      duration: 1.1,
      times: [0, 0.2, 0.8, 1],
    },
  }),
};

const GripIcon = forwardRef<GripIconHandle, GripProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const isAnimatingRef = useRef(false);

    const startAnimation = useCallback(async () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      await controls.start('animate');
      await controls.start('normal');
      isAnimatingRef.current = false;
    }, [controls]);

    const stopAnimation = useCallback(async () => {
      if (!isAnimatingRef.current) return;
      await controls.start('normal');
      isAnimatingRef.current = false;
    }, [controls]);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return { startAnimation, stopAnimation };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          startAnimation();
        } else {
          onMouseEnter?.(e);
        }
      },
      [startAnimation, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          stopAnimation();
        } else {
          onMouseLeave?.(e);
        }
      },
      [stopAnimation, onMouseLeave]
    );

    return (
      <div
        className={cn('inline-flex items-center justify-center', className)}
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
          {CIRCLES.map((circle, index) => (
            <motion.circle
              key={`${circle.cx}-${circle.cy}`}
              cx={circle.cx}
              cy={circle.cy}
              r="1"
              variants={VARIANTS}
              animate={controls}
              custom={index}
              initial="normal"
            />
          ))}
        </svg>
      </div>
    );
  }
);

GripIcon.displayName = 'GripIcon';
export { GripIcon };
