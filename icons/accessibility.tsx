'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface AccessibilityIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AccessibilityIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CIRCLE_VARIANTS: Variants = {
  initial: {
    y: 0,
    x: 0,
  },
  animate: {
    y: [0, 1, -1, 0],
    x: [0, 1, -1, 0],
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

const PRIMARY_GROUP_VARIANTS: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

const SECONDARY_GROUP_VARIANTS: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: -360,
    transition: {
      duration: 1,
      delay: 0.4,
      ease: 'easeInOut',
    },
  },
};

const PATH_VARIANTS: Variants = {
  initial: {
    rotate: 0,
    d: 'M8 5 L5 8',
  },
  animate: {
    rotate: [0, -60, 0],
    d: ['M8 5 L5 8', 'M8 5 L4 9', 'M8 5 L5 8'],
    transition: {
      duration: 0.4,
      delay: 0.2,
      ease: 'easeInOut',
    },
    transformOrigin: 'top right',
  },
};

const AccessibilityIcon = forwardRef<
  AccessibilityIconHandle,
  AccessibilityIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => controls.start('animate'),
      stopAnimation: () => controls.start('initial'),
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
        <motion.circle
          cx="16"
          cy="4"
          r="1"
          variants={CIRCLE_VARIANTS}
          initial="initial"
          animate={controls}
        />
        <motion.g
          variants={PRIMARY_GROUP_VARIANTS}
          initial="initial"
          animate={controls}
        >
          <path d="m18 19 1-7-6 1" />
          <path d="M8,5l5.5,3-2.4,3.5" />
          <motion.path
            d="M8 5 L5 8"
            variants={PATH_VARIANTS}
            initial="initial"
            animate={controls}
          />
        </motion.g>
        <motion.g
          variants={SECONDARY_GROUP_VARIANTS}
          initial="initial"
          animate={controls}
        >
          <path d="M4.2,14.5c-.8,2.6.7,5.4,3.3,6.2,1.2.4,2.4.3,3.6-.2" />
          <path d="M13.8,17.5c.8-2.6-.7-5.4-3.3-6.2-1.2-.4-2.4-.3-3.6.2" />
          <path d="M13,13.1c-.5-.7-1.1-1.2-1.9-1.6" />
        </motion.g>
      </svg>
    </div>
  );
});

AccessibilityIcon.displayName = 'AccessibilityIcon';

export { AccessibilityIcon };
