'use client';

import type { Transition } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface AlignVerticalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AlignVerticalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 160,
  damping: 17,
  mass: 1,
};

const AlignVerticalIcon = forwardRef<
  AlignVerticalIconHandle,
  AlignVerticalIconProps
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
        <motion.rect
          variants={{
            normal: { scaleY: 1 },
            animate: { scaleY: 0.8 },
          }}
          animate={controls}
          width="10"
          height="6"
          x="7"
          y="9"
          rx="2"
          transition={defaultTransition}
        />
        <motion.path
          variants={{
            normal: { translateY: 0, scaleX: 1 },
            animate: {
              translateY: -2,
              scaleX: 0.9,
            },
          }}
          animate={controls}
          transition={defaultTransition}
          d="M22 20H2"
        />
        <motion.path
          variants={{
            normal: { translateY: 0, scaleX: 1 },
            animate: {
              translateY: 2,
              scaleX: 0.9,
            },
          }}
          animate={controls}
          transition={defaultTransition}
          d="M22 4H2"
        />
      </svg>
    </div>
  );
});

AlignVerticalIcon.displayName = 'AlignVerticalIcon';

export { AlignVerticalIcon };
