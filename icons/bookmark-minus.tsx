'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
  type HTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils';

export interface BookmarkMinusIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BookmarkMinusIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const bookmarkVariants: Variants = {
  normal: { scaleY: 1, scaleX: 1 },
  animate: {
    scaleY: [1, 1.3, 0.9, 1.05, 1],
    scaleX: [1, 0.9, 1.1, 0.95, 1],
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const minusVariants: Variants = {
  normal: { strokeDashoffset: 0, opacity: 1 }, // always visible
  animate: {
    strokeDashoffset: [1, 0],
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const BookmarkMinusIcon = forwardRef<
  BookmarkMinusIconHandle,
  BookmarkMinusIconProps
>(({ className, size = 28, onMouseEnter, onMouseLeave, ...props }, ref) => {
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
        {/* Bookmark body */}
        <motion.path
          d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
          animate={controls}
          variants={bookmarkVariants}
          style={{ originX: 0.5, originY: 0.5 }}
        />

        {/* Minus line */}
        <motion.line
          x1="15"
          x2="9"
          y1="10"
          y2="10"
          animate={controls}
          variants={minusVariants}
          initial="normal"
          strokeDasharray="1 1"
          pathLength="1"
        />
      </svg>
    </div>
  );
});

BookmarkMinusIcon.displayName = 'BookmarkMinusIcon';

export { BookmarkMinusIcon };
