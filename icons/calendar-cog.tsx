'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface CalendarCogIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CalendarCogIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const gVariants: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: 180 },
};

const CalendarCogIcon = forwardRef<CalendarCogIconHandle, CalendarCogIconProps>(
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
          <path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
          <path d="M16 2v4" />
          <path d="M3 10h18" />
          <path d="M8 2v4" />
          <motion.g
            transition={{ type: 'spring', stiffness: 50, damping: 10 }}
            variants={gVariants}
            animate={controls}
          >
            <path d="m15.2 16.9-.9-.4" />
            <path d="m15.2 19.1-.9.4" />
            <path d="m16.9 15.2-.4-.9" />
            <path d="m16.9 20.8-.4.9" />
            <path d="m19.5 14.3-.4.9" />
            <path d="m19.5 21.7-.4-.9" />
            <path d="m21.7 16.5-.9.4" />
            <path d="m21.7 19.5-.9-.4" />
            <circle cx="18" cy="18" r="3" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

CalendarCogIcon.displayName = 'CalendarCogIcon';

export { CalendarCogIcon };
