'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface CursorClickIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const cursorVariants: Variants = {
  initial: { x: 0, y: 0 },
  hover: {
    x: [0, 0, -3, 0],
    y: [0, -4, 0, 0],
    transition: {
      duration: 1,
      bounce: 0.3,
    },
  },
};

const lineVariants: Variants = {
  initial: { opacity: 1, x: 0, y: 0 },
  spread: (custom: { x: number; y: number }) => ({
    opacity: [0, 1, 0, 0, 0, 0, 1],
    x: [0, custom.x, 0, 0],
    y: [0, custom.y, 0, 0],
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 10,
      mass: 0.4,
    },
  }),
};

const CursorClickIcon = forwardRef<
  CursorClickIconHandle,
  HTMLAttributes<HTMLDivElement>
>(({ onMouseEnter, onMouseLeave, ...props }, ref) => {
  const clickControls = useAnimation();
  const cursorControls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => {
        cursorControls.start('hover');
        clickControls.start('spread', { delay: 1.3 });
      },
      stopAnimation: () => {
        cursorControls.start('initial');
        clickControls.start('initial');
      },
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        cursorControls.start('hover');
        clickControls.start('spread', { delay: 1.3 });
      } else {
        onMouseEnter?.(e);
      }
    },
    [clickControls, cursorControls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        cursorControls.start('initial');
        clickControls.start('initial');
      } else {
        onMouseLeave?.(e);
      }
    },
    [cursorControls, clickControls, onMouseLeave]
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
        <motion.path
          d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"
          variants={cursorVariants}
          animate={cursorControls}
        />
        <motion.path
          d="M14 4.1 12 6"
          variants={lineVariants}
          animate={clickControls}
          custom={{ x: 1, y: -1 }}
        />
        <motion.path
          d="m5.1 8-2.9-.8"
          variants={lineVariants}
          animate={clickControls}
          custom={{ x: -1, y: 0 }}
        />
        <motion.path
          d="m6 12-1.9 2"
          variants={lineVariants}
          animate={clickControls}
          custom={{ x: -1, y: 1 }}
        />
        <motion.path
          d="M7.2 2.2 8 5.1"
          variants={lineVariants}
          animate={clickControls}
          custom={{ x: 0, y: -1 }}
        />
      </svg>
    </div>
  );
});

CursorClickIcon.displayName = 'CursorClickIcon';

export { CursorClickIcon };
