'use client';

import { motion, useAnimation } from 'motion/react';
import type { Transition, Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface RockingChairIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 12,
  mass: 0.4,
};

const rockingVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [-5, 5, -5],
    transition: {
      repeat: Infinity,
      repeatType: 'mirror' as const,
      duration: 1.2,
      ease: 'easeInOut',
    },
  },
};

const RockingChairIcon = forwardRef<
  RockingChairIconHandle,
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
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={rockingVariants}
        animate={controls}
        style={{ originX: '10%', originY: '90%' }}
      >
        <motion.polyline
          points="3.5 2 6.5 12.5 18 12.5"
          animate={controls}
          transition={defaultTransition}
        />
        <motion.line
          x1="9.5"
          x2="5.5"
          y1="12.5"
          y2="20"
          animate={controls}
          transition={defaultTransition}
        />
        <motion.line
          x1="15"
          x2="18.5"
          y1="12.5"
          y2="20"
          animate={controls}
          transition={defaultTransition}
        />
        <motion.path
          d="M2.75 18a13 13 0 0 0 18.5 0"
          animate={controls}
          transition={defaultTransition}
        />
      </motion.svg>
    </div>
  );
});

RockingChairIcon.displayName = 'RockingChairIcon';

export { RockingChairIcon };
