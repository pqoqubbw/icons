'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface CloudCogIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CloudCogIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const G_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: 180 },
};

const CloudCogIcon = forwardRef<CloudCogIconHandle, CloudCogIconProps>(
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
          <path d="M4.2 15.1A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2" />
          <motion.g
            transition={{ type: 'spring', stiffness: 50, damping: 10 }}
            variants={G_VARIANTS}
            animate={controls}
          >
            <path d="m9.2 15.9-.9-.4" />
            <path d="m9.2 18.1-.9.4" />
            <path d="m10.9 14.2-.4-.9" />
            <path d="m10.9 19.8-.4.9" />
            <path d="m13.5 13.3-.4.9" />
            <path d="m13.5 20.7-.4-.9" />
            <path d="m15.7 15.5-.9.4" />
            <path d="m15.7 18.5-.9-.4" />
            <circle cx="12" cy="17" r="3" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

CloudCogIcon.displayName = 'CloudCogIcon';

export { CloudCogIcon };
