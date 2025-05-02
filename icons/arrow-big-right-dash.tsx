'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface ArrowBigRightDashIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowBigRightDashIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const dashVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, 1, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const arrowVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, 3, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const ArrowBigRightDashIcon = forwardRef<
  ArrowBigRightDashIconHandle,
  ArrowBigRightDashIconProps
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
        <motion.path d="M5 9v6" variants={dashVariants} animate={controls} />
        <motion.path
          d="M9 9h3V5l7 7-7 7v-4H9V9z"
          variants={arrowVariants}
          animate={controls}
        />
      </svg>
    </div>
  );
});

ArrowBigRightDashIcon.displayName = 'ArrowBigRightDashIcon';

export { ArrowBigRightDashIcon };
