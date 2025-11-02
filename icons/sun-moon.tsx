'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface SunMoonIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SunMoonIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const sunVariants: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -5, 5, -2, 2, 0],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

const moonVariants: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const SunMoonIcon = forwardRef<SunMoonIconHandle, SunMoonIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const sunControls = useAnimation();
    const moonControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          sunControls.start('animate');
          moonControls.start('animate');
        },
        stopAnimation: () => {
          sunControls.start('normal');
          moonControls.start('normal');
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          sunControls.start('animate');
          moonControls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [sunControls, moonControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          sunControls.start('normal');
          moonControls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [sunControls, moonControls, onMouseLeave]
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
            variants={sunVariants}
            animate={sunControls}
            initial="normal"
          >
            <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
          </motion.g>
          {[
            'M12 2v2',
            'M12 20v2',
            'm4.9 4.9 1.4 1.4',
            'm17.7 17.7 1.4 1.4',
            'M2 12h2',
            'M20 12h2',
            'm6.3 17.7-1.4 1.4',
            'm19.1 4.9-1.4 1.4',
          ].map((d, index) => (
            <motion.path
              key={d}
              d={d}
              animate={moonControls}
              variants={moonVariants}
              custom={index + 1}
              initial="normal"
            />
          ))}
        </svg>
      </div>
    );
  }
);

SunMoonIcon.displayName = 'SunMoonIcon';

export { SunMoonIcon };
