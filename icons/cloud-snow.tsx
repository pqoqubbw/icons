'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface CloudSnowIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CloudSnowIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SNOWFLAKE_VARIANTS: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const SNOWFLAKE_CHILD_VARIANTS: Variants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [1, 0.3, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const SNOWFLAKE_PATH = [
  { id: 'snowflake1', d: 'M8 15h.01' },
  { id: 'snowflake2', d: 'M8 19h.01' },
  { id: 'snowflake3', d: 'M12 17h.01' },
  { id: 'snowflake4', d: 'M12 21h.01' },
  { id: 'snowflake5', d: 'M16 15h.01' },
  { id: 'snowflake6', d: 'M16 19h.01' },
];

const CloudSnowIcon = forwardRef<CloudSnowIconHandle, CloudSnowIconProps>(
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
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <motion.g
            variants={SNOWFLAKE_VARIANTS}
            animate={controls}
            initial="normal"
          >
            {SNOWFLAKE_PATH.map((path) => (
              <motion.path
                variants={SNOWFLAKE_CHILD_VARIANTS}
                key={path.id}
                d={path.d}
              />
            ))}
          </motion.g>
        </svg>
      </div>
    );
  }
);

CloudSnowIcon.displayName = 'CloudSnowIcon';

export { CloudSnowIcon };
