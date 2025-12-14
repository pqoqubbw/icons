'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface ArrowBigLeftDashIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowBigLeftDashIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DASH_VARIANTS: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, -1, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const ARROW_VARIANTS: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, -3, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const ArrowBigLeftDashIcon = forwardRef<
  ArrowBigLeftDashIconHandle,
  ArrowBigLeftDashIconProps
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
        <motion.path d="M19 15V9" variants={DASH_VARIANTS} animate={controls} />
        <motion.path
          d="M15 15h-3v4l-7-7 7-7v4h3v6z"
          variants={ARROW_VARIANTS}
          animate={controls}
        />
      </svg>
    </div>
  );
});

ArrowBigLeftDashIcon.displayName = 'ArrowBigLeftDashIcon';

export { ArrowBigLeftDashIcon };
