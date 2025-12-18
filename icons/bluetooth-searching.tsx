'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface BluetoothSearchingIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BluetoothSearchingIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: {
    scale: 1,
    transition: {
      repeat: 0,
    },
  },
  animate: {
    scale: [0, 1, 0.8],
  },
};

const SECOND_VARIANTS: Variants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [1, 0.8, 1],
    transition: { repeat: Infinity },
  },
};

const BluetoothSearchingIcon = forwardRef<
  BluetoothSearchingIconHandle,
  BluetoothSearchingIconProps
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
          variants={SECOND_VARIANTS}
          animate={controls}
          d="m7 7 10 10-5 5V2l5 5L7 17"
        />
        <motion.path
          variants={PATH_VARIANTS}
          animate={controls}
          transition={{
            duration: 0.6,
            delay: 0.2,
            repeat: Infinity,
          }}
          d="M20.83 14.83a4 4 0 0 0 0-5.66"
        />
        <motion.path
          variants={PATH_VARIANTS}
          animate={controls}
          transition={{
            duration: 0.6,
            repeat: Infinity,
          }}
          d="M18 12h.01"
        />
      </svg>
    </div>
  );
});

BluetoothSearchingIcon.displayName = 'BluetoothSearchingIcon';

export { BluetoothSearchingIcon };
