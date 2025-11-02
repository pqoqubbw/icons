'use client';

import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface WashingMachineIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WashingMachineIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const WashingMachineIcon = forwardRef<
  WashingMachineIconHandle,
  WashingMachineIconProps
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
        <motion.g
          animate={controls}
          variants={{
            normal: {
              x: 0,
            },
            animate: {
              x: [0, 0.5, -0.5, 0.3, -0.3, 0],
              transition: {
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            },
          }}
        >
          <path d="M3 6h3" />
          <path d="M17 6h.01" />
          <rect width="18" height="20" x="3" y="2" rx="2" />
        </motion.g>
        <motion.g
          animate={controls}
          variants={{
            normal: {
              rotate: 0,
              y: 0,
              transition: {
                duration: 0.5,
                ease: 'linear',
              },
            },
            animate: {
              rotate: 360,
              y: [0, -0.3, 0, 0.3, 0],
              transition: {
                rotate: {
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                },
                y: {
                  duration: 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              },
            },
          }}
        >
          <circle cx="12" cy="13" r="5" />
          <path d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" />
        </motion.g>
      </svg>
    </div>
  );
});

WashingMachineIcon.displayName = 'WashingMachineIcon';

export { WashingMachineIcon };
