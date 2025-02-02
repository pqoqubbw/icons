'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface WaypointsIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const variants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      delay: 0.15 * custom,
      opacity: { delay: 0.1 * custom },
    },
  }),
};

const WaypointsIcon = forwardRef<
  WaypointsIconHandle,
  HTMLAttributes<HTMLDivElement>
>(({ onMouseEnter, onMouseLeave, ...props }, ref) => {
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
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.circle
          cx="12"
          cy="4.5"
          r="2.5"
          variants={variants}
          animate={controls}
          custom={0}
        />
        <motion.path
          d="m10.2 6.3-3.9 3.9"
          variants={variants}
          animate={controls}
          custom={1}
        />
        <motion.circle
          cx="4.5"
          cy="12"
          r="2.5"
          variants={variants}
          animate={controls}
          custom={0}
        />
        <motion.path
          d="M7 12h10"
          variants={variants}
          animate={controls}
          custom={2}
        />
        <motion.circle
          cx="19.5"
          cy="12"
          r="2.5"
          variants={variants}
          animate={controls}
          custom={0}
        />
        <motion.path
          d="m13.8 17.7 3.9-3.9"
          variants={variants}
          animate={controls}
          custom={3}
        />
        <motion.circle
          cx="12"
          cy="19.5"
          r="2.5"
          variants={variants}
          animate={controls}
          custom={0}
        />
      </svg>
    </div>
  );
});

WaypointsIcon.displayName = 'WaypointsIcon';

export { WaypointsIcon };
