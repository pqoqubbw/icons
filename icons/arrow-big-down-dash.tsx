'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface ArrowBigDownDashIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowBigDownDashIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const dashVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 1, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const arrowVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 3, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const ArrowBigDownDashIcon = forwardRef<
  ArrowBigDownDashIconHandle,
  ArrowBigDownDashIconProps
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
        <motion.path d="M15 5H9" variants={dashVariants} animate={controls} />
        <motion.path
          d="M15 9v3h4l-7 7-7-7h4V9z"
          variants={arrowVariants}
          animate={controls}
        />
      </svg>
    </div>
  );
});

ArrowBigDownDashIcon.displayName = 'ArrowBigDownDashIcon';

export { ArrowBigDownDashIcon };
