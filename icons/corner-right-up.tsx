'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

const STRETCH_VARIANTS: Variants = {
  normal: { scaleY: 1, y: 0, opacity: 1 },
  animate: {
    scaleY: [1, 1.15, 1],
    y: [0, -2, 0],
    transition: {
      duration: 0.45,
      ease: 'easeInOut',
    },
  },
};

export interface CornerRightUpIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CornerRightUpIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CornerRightUpIcon = forwardRef<
  CornerRightUpIconHandle,
  CornerRightUpIconProps
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
        variants={STRETCH_VARIANTS}
        initial="normal"
      >
        <path d="m10 9 5-5 5 5" />
        <path d="M4 20h7a4 4 0 0 0 4-4V4" />
      </motion.svg>
    </div>
  );
});

CornerRightUpIcon.displayName = 'CornerRightUpIcon';

export { CornerRightUpIcon };
