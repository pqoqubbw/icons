'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface GalleryVerticalEndIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GalleryVerticalEndIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const pathVariants: Variants = {
  normal: {
    translateY: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      stiffness: 200,
      damping: 13,
    },
  },
  animate: (i: number) => ({
    translateY: [2 * i, 0],
    opacity: [0, 1],
    transition: {
      delay: 0.25 * (2 - i),
      type: 'tween',
      stiffness: 200,
      damping: 13,
    },
  }),
};

const GalleryVerticalEndIcon = forwardRef<
  GalleryVerticalEndIconHandle,
  GalleryVerticalEndIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        <motion.path
          d="M7 2h10"
          variants={pathVariants}
          animate={controls}
          custom={1}
        />
        <motion.path
          d="M5 6h14"
          variants={pathVariants}
          animate={controls}
          custom={2}
        />
        <rect width="18" height="12" x="3" y="10" rx="2" />
      </svg>
    </div>
  );
});

GalleryVerticalEndIcon.displayName = 'GalleryVerticalEndIcon';

export { GalleryVerticalEndIcon };
