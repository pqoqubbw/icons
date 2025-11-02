'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface HardDriveUploadIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HardDriveUploadIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ARROW_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: {
    y: -1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 10,
      mass: 1,
    },
  },
};

const HardDriveUploadIcon = forwardRef<
  HardDriveUploadIconHandle,
  HardDriveUploadIconProps
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
        <rect width="20" height="8" x="2" y="14" rx="2" />
        <path d="M6 18h.01" />
        <path d="M10 18h.01" />
        <motion.g variants={ARROW_VARIANTS} animate={controls}>
          <path d="m16 6-4-4-4 4" />
          <path d="M12 2v8" />
        </motion.g>
      </svg>
    </div>
  );
});

HardDriveUploadIcon.displayName = 'HardDriveUploadIcon';

export { HardDriveUploadIcon };
