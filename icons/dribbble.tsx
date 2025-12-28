'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface DribbbleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface DribbbleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CIRCLE_VARIANTS: Variants = {
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

const PATH_VARIANTS: Variants = {
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

const DribbbleIcon = forwardRef<DribbbleIconHandle, DribbbleIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const circleControls = useAnimation();
    const path1Controls = useAnimation();
    const path2Controls = useAnimation();
    const path3Controls = useAnimation();

    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          circleControls.start('animate');
          path1Controls.start('animate');
          path2Controls.start('animate');
          path3Controls.start('animate');
        },
        stopAnimation: () => {
          circleControls.start('normal');
          path1Controls.start('normal');
          path2Controls.start('normal');
          path3Controls.start('normal');
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          circleControls.start('animate');
          path1Controls.start('animate');
          path2Controls.start('animate');
          path3Controls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [
        circleControls,
        onMouseEnter,
        path1Controls,
        path2Controls,
        path3Controls,
      ]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          circleControls.start('normal');
          path1Controls.start('normal');
          path2Controls.start('normal');
          path3Controls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [
        circleControls,
        path1Controls,
        path2Controls,
        path3Controls,
        onMouseLeave,
      ]
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
            variants={CIRCLE_VARIANTS}
            initial="normal"
            animate={circleControls}
            cx="12"
            cy="12"
            r="10"
          />
          <motion.path
            variants={PATH_VARIANTS}
            initial="normal"
            animate={path1Controls}
            d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"
          />
          <motion.path
            variants={PATH_VARIANTS}
            initial="normal"
            animate={path2Controls}
            d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"
          />
          <motion.path
            variants={PATH_VARIANTS}
            initial="normal"
            animate={path3Controls}
            d="M8.56 2.75c4.37 6 6 9.42 8 17.72"
          />
        </svg>
      </div>
    );
  }
);

DribbbleIcon.displayName = 'DribbbleIcon';

export { DribbbleIcon };
