'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface CloudDownloadIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CloudDownloadIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CLOUD_VARIANTS: Variants = {
  initial: { y: 2 },
  active: { y: 0 },
};

const CloudDownloadIcon = forwardRef<
  CloudDownloadIconHandle,
  CloudDownloadIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
      startAnimation: () => controls.start('initial'),
      stopAnimation: () => controls.start('active'),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start('initial');
      } else {
        onMouseEnter?.(e);
      }
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start('active');
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
        <path d="M4.2 15.1A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2" />
        <motion.g
          animate={controls}
          variants={CLOUD_VARIANTS}
          transition={{
            duration: 0.3,
            ease: [0.68, -0.6, 0.32, 1.6],
          }}
        >
          <path d="M12 13v8l-4-4" />
          <path d="m12 21 4-4" />
        </motion.g>
      </svg>
    </div>
  );
});

CloudDownloadIcon.displayName = 'CloudDownloadIcon';

export { CloudDownloadIcon };
