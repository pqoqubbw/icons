'use client';

import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface AlignCenterIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AlignCenterIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const AlignCenterIcon = forwardRef<AlignCenterIconHandle, AlignCenterIconProps>(
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
          <motion.path
            d="M17 12H7"
            variants={{
              normal: { translateX: 0 },
              animate: {
                translateX: [0, 3, -3, 2, -2, 0],
                transition: {
                  ease: 'linear',
                  translateX: {
                    duration: 1,
                  },
                },
              },
            }}
            animate={controls}
          />
          <path d="M19 18H5" />
          <path d="M21 6H3" />
        </svg>
      </div>
    );
  }
);

AlignCenterIcon.displayName = 'AlignCenterIcon';

export { AlignCenterIcon };
