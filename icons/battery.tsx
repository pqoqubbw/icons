'use client';

import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface BatteryIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BatteryIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BatteryIcon = forwardRef<BatteryIconHandle, BatteryIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
          <rect x="2" y="6" width="16" height="12" rx="2" />
          <path d="M22 14v-4" />

          <motion.rect
            x="4"
            y="8"
            height="8"
            rx="1"
            fill="currentColor"
            stroke="none"
            initial="normal"
            animate={controls}
            variants={{
              normal: { width: 0, opacity: 0 },
              animate: {
                width: 12,
                opacity: 1,
                transition: { duration: 0.4, ease: 'easeOut' },
              },
            }}
          />
        </svg>
      </div>
    );
  }
);

BatteryIcon.displayName = 'BatteryIcon';

export { BatteryIcon };
