'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface BluetoothConnectedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BluetoothConnectedIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const pathVariants: Variants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [0, 1, 0.5, 1],
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
};

const BluetoothConnectedIcon = forwardRef<
  BluetoothConnectedIconHandle,
  BluetoothConnectedIconProps
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
        <motion.path
          variants={pathVariants}
          animate={controls}
          d="m7 7 10 10-5 5V2l5 5L7 17"
        />
        <motion.line
          variants={{
            normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
            animate: {
              pathLength: [0, 1],
              opacity: [0, 1],
              pathOffset: [1, 0],
              transition: {
                duration: 0.4,
              },
            },
          }}
          animate={controls}
          x1="18"
          x2="21"
          y1="12"
          y2="12"
        />
        <motion.line
          variants={{
            normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
            animate: {
              pathLength: [0, 1],
              opacity: [0, 1],
              pathOffset: [-1, 0],
              transition: {
                duration: 0.2,
              },
            },
          }}
          animate={controls}
          x1="3"
          x2="6"
          y1="12"
          y2="12"
        />
      </svg>
    </div>
  );
});

BluetoothConnectedIcon.displayName = 'BluetoothConnectedIcon';

export { BluetoothConnectedIcon };
