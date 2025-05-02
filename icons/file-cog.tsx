'use client';

import { cn } from '@/lib/utils';
import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface FileCogIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const gVariants: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: 180 },
};

const FileCogIcon = forwardRef<
  FileCogIconHandle,
  HTMLAttributes<HTMLDivElement>
>(({ onMouseEnter, onMouseLeave, className, ...props }, ref) => {
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
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M4.677 21.5a2 2 0 0 0 1.313.5H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2.5" />
        <motion.g
          transition={{ type: 'spring', stiffness: 50, damping: 10 }}
          variants={gVariants}
          animate={controls}
        >
          <path d="m3.2 12.9-.9-.4" />
          <path d="m3.2 15.1-.9.4" />
          <path d="m4.9 11.2-.4-.9" />
          <path d="m4.9 16.8-.4.9" />
          <path d="m7.5 10.3-.4.9" />
          <path d="m7.5 17.7-.4-.9" />
          <path d="m9.7 12.5-.9.4" />
          <path d="m9.7 15.5-.9-.4" />
          <circle cx="6" cy="14" r="3" />
        </motion.g>
      </svg>
    </div>
  );
});

FileCogIcon.displayName = 'FileCogIcon';

export { FileCogIcon };
