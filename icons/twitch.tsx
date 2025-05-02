'use client';

import { motion, useAnimation } from 'motion/react';
import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface TwitchIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TwitchIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const pathVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: 'linear',
      opacity: { duration: 0.1 },
    },
  },
};

const lineVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: 'linear',
      opacity: { duration: 0.1 },
    },
  },
};

const TwitchIcon = forwardRef<TwitchIconHandle, TwitchIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const pathControls = useAnimation();
    const line1Controls = useAnimation();
    const line2Controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          pathControls.start('animate');
          line1Controls.start('animate');
          line2Controls.start('animate');
        },
        stopAnimation: () => {
          pathControls.start('normal');
          line1Controls.start('normal');
          line2Controls.start('normal');
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          pathControls.start('animate');
          line1Controls.start('animate');
          line2Controls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [line1Controls, line2Controls, onMouseEnter, pathControls]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          pathControls.start('normal');
          line1Controls.start('normal');
          line2Controls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [pathControls, line1Controls, line2Controls, onMouseLeave]
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
            initial="normal"
            animate={pathControls}
            d="M21 2H3v16h5v4l4-4h5l4-4V2z"
          />
          <motion.path
            variants={lineVariants}
            initial="normal"
            animate={line1Controls}
            d="M11 11V7"
          />
          <motion.path
            variants={lineVariants}
            initial="normal"
            animate={line2Controls}
            d="M16 11V7"
          />
        </svg>
      </div>
    );
  }
);

TwitchIcon.displayName = 'TwitchIcon';

export { TwitchIcon };
