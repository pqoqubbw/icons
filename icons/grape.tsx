'use client';

import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface GrapeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GrapeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const GrapeIcon = forwardRef<GrapeIconHandle, GrapeIconProps>(
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
      (e) => {
        if (!isControlledRef.current) controls.start('animate');
        else onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) controls.start('normal');
        else onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(
          `cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
          className
        )}
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
            d="M22 5V2l-5.89 5.89"
            animate={controls}
            variants={{
              normal: { pathLength: 1, opacity: 1 },
              animate: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.3 } },
            }}
          />
          <motion.circle cx="16.6" cy="15.89" r="3" animate={controls} variants={{ normal: { opacity: 1 }, animate: { opacity: [0, 1], transition: { delay: 0.3 } } }} />
          <motion.circle cx="8.11" cy="7.4" r="3" animate={controls} variants={{ normal: { opacity: 1 }, animate: { opacity: [0, 1], transition: { delay: 0.4 } } }} />
          <motion.circle cx="12.35" cy="11.65" r="3" animate={controls} variants={{ normal: { opacity: 1 }, animate: { opacity: [0, 1], transition: { delay: 0.5 } } }} />
          <motion.circle cx="13.91" cy="5.85" r="3" animate={controls} variants={{ normal: { opacity: 1 }, animate: { opacity: [0, 1], transition: { delay: 0.6 } } }} />
          <motion.circle cx="18.15" cy="10.09" r="3" animate={controls} variants={{ normal: { opacity: 1 }, animate: { opacity: [0, 1], transition: { delay: 0.7 } } }} />
          <motion.circle cx="6.56" cy="13.2" r="3" animate={controls} variants={{ normal: { opacity: 1 }, animate: { opacity: [0, 1], transition: { delay: 0.8 } } }} />
          <motion.circle cx="10.8" cy="17.44" r="3" animate={controls} variants={{ normal: { opacity: 1 }, animate: { opacity: [0, 1], transition: { delay: 0.9 } } }} />
          <motion.circle cx="5" cy="19" r="3" animate={controls} variants={{ normal: { opacity: 1 }, animate: { opacity: [0, 1], transition: { delay: 1 } } }} />
        </svg>
      </div>
    );
  }
);

GrapeIcon.displayName = 'GrapeIcon';

export { GrapeIcon };