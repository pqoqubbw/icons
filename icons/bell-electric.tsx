'use client';

import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface BellElectricIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BellElectricIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BellElectricIcon = forwardRef<
  BellElectricIconHandle,
  BellElectricIconProps
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
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
        variants={{
          normal: { rotate: 0, translateX: 0, translateY: 0 },
          animate: {
            rotate: [0, -12, 12, -8, 8, 0],
            translateX: [0, -1.5, 1.5, -1, 1, 0],
            translateY: [0, -1, 1, -0.5, 0.5, 0],
          },
        }}
        transition={{ duration: 0.9 }}
        animate={controls}
      >
        <path d="M18.518 17.347A7 7 0 0 1 14 19" />
        <motion.path
          d="M18.8 4A11 11 0 0 1 20 9"
          style={{ transformBox: 'fill-box', originX: '50%', originY: '50%' }}
          variants={{
            normal: { translateX: 0, translateY: 0, rotate: 0 },
            animate: {
              translateX: [0, -0.8, 0.8, -0.6, 0.6, 0],
              translateY: [0, -0.5, 0.5, -0.3, 0.3, 0],
              rotate: [0, -6, 6, -4, 4, 0],
            },
          }}
          transition={{ duration: 0.9 }}
          animate={controls}
        />
        <motion.path
          d="M9 9h.01"
          style={{ transformBox: 'fill-box', originX: '50%', originY: '50%' }}
          variants={{
            normal: { translateX: 0, translateY: 0, rotate: 0, scale: 1 },
            animate: {
              translateX: [0, -1.6, 1.6, -1.2, 1.2, 0],
              translateY: [0, -1.2, 1.2, -0.8, 0.8, 0],
              rotate: [0, -10, 10, -7, 7, 0],
              scale: [1, 1.08, 0.95, 1.06, 0.98, 1],
            },
          }}
          transition={{ duration: 0.75 }}
          animate={controls}
        />
        <circle cx="9" cy="9" r="7" />
        <rect x="4" y="16" width="10" height="6" rx="2" />
        <circle cx="20" cy="16" r="2" />
      </motion.svg>
    </div>
  );
});

BellElectricIcon.displayName = 'BellElectricIcon';

export { BellElectricIcon };
