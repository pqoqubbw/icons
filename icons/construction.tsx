'use client';

import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface ConstructionIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ConstructionIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ConstructionIcon = forwardRef<
  ConstructionIconHandle,
  ConstructionIconProps
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
        <defs>
          <motion.pattern
            id="stripes"
            patternUnits="userSpaceOnUse"
            width="6"
            height="14"
            variants={{
              normal: {
                x: 0,
              },
              animate: {
                x: [0, 6],
                transition: {
                  duration: 1,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatType: 'loop',
                },
              },
            }}
            animate={controls}
            initial="normal"
          >
            <path d="M-4 -2 L14 30" stroke="currentColor" strokeWidth="2" />
          </motion.pattern>
        </defs>
        <rect x="2" y="6" width="20" height="8" rx="1" fill="url(#stripes)" />
        <path d="M17 14v7" />
        <path d="M7 14v7" />
        <path d="M17 3v3" />
        <path d="M7 3v3" />
      </svg>
    </div>
  );
});

ConstructionIcon.displayName = 'ConstructionIcon';

export { ConstructionIcon };
