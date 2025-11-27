'use client';

import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface BatteryWarningIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BatteryWarningIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BatteryWarningIcon = forwardRef<
  BatteryWarningIconHandle,
  BatteryWarningIconProps
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
        <path d="M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2" />
        <path d="M22 14v-4" />
        <path d="M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />

        <motion.g
          variants={{
            normal: { opacity: 1, scale: 1 },
            animate: {
              opacity: [1, 0.4, 1],
              scale: [1, 1.1, 1],
              transition: {
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            },
          }}
          initial="normal"
          animate={controls}
          style={{ originX: '50%', originY: '50%' }}
        >
          <path d="M10 17h.01" />
          <path d="M10 7v6" />
        </motion.g>
      </svg>
    </div>
  );
});

BatteryWarningIcon.displayName = 'BatteryWarningIcon';

export { BatteryWarningIcon };
