'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface GalleryHorizontalEndIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GalleryHorizontalEndIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: {
    translateX: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      stiffness: 200,
      damping: 13,
    },
  },
  animate: (i: number) => ({
    translateX: [2 * i, 0],
    opacity: [0, 1],
    transition: {
      delay: 0.25 * (2 - i),
      type: 'tween',
      stiffness: 200,
      damping: 13,
    },
  }),
};

const GalleryHorizontalEndIcon = forwardRef<
  GalleryHorizontalEndIconHandle,
  GalleryHorizontalEndIconProps
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
          d="M6 5v14"
          variants={PATH_VARIANTS}
          animate={controls}
          custom={2}
        />
        <motion.path
          d="M2 7v10"
          variants={PATH_VARIANTS}
          animate={controls}
          custom={1}
        />
        <rect width="12" height="18" x="10" y="3" rx="2" />
      </svg>
    </div>
  );
});

GalleryHorizontalEndIcon.displayName = 'GalleryHorizontalEndIcon';

export { GalleryHorizontalEndIcon };
