'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface GripHorizontalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GripHorizontalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CIRCLES = [
  { cx: 5, cy: 9 },
  { cx: 12, cy: 9 },
  { cx: 19, cy: 9 },
  { cx: 5, cy: 15 },
  { cx: 12, cy: 15 },
  { cx: 19, cy: 15 },
];

const VARIANTS: Variants = {
  normal: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  animate: (index: number) => {
    const row = Math.floor(index / 3);
    const col = index % 3;

    const delay = col * 0.15 + row * 0.25;

    return {
      opacity: [1, 0.4, 1],
      scale: [1, 0.85, 1],
      transition: {
        delay,
        duration: 1,
        ease: 'easeInOut',
      },
    };
  },
};

const GripHorizontalIcon = forwardRef<
  GripHorizontalIconHandle,
  GripHorizontalIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
      if (!isControlledRef.current) startAnimation();
      onMouseEnter?.(e);
    },
    [startAnimation, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) stopAnimation();
      onMouseLeave?.(e);
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
});

GripHorizontalIcon.displayName = 'GripHorizontalIcon';
export { GripHorizontalIcon };
