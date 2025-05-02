'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface SunsetIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SunsetIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const arrowVariants: Variants = {
  normal: {
    y: 0,
  },
  animate: {
    y: [0, 1, 0],
  },
};
const raysVariants: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const SunsetIcon = forwardRef<SunsetIconHandle, SunsetIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const arrowControls = useAnimation();
    const raysControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          arrowControls.start('animate');
          raysControls.start('animate');
        },
        stopAnimation: () => {
          arrowControls.start('normal');
          raysControls.start('normal');
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          arrowControls.start('animate');
          raysControls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [arrowControls, raysControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          arrowControls.start('normal');
          raysControls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [arrowControls, raysControls, onMouseLeave]
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
            animate={arrowControls}
            initial="normal"
            variants={arrowVariants}
          >
            <path d="M12 10V2" />
            <path d="m16 6-4 4-4-4" />
          </motion.g>

          {[
            'm4.93 10.93 1.41 1.41',
            'M2 18h2',
            'M20 18h2',
            'm19.07 10.93-1.41 1.41',
            'M22 22H2',
            ,
          ].map((d, index) => (
            <motion.path
              key={d}
              d={d}
              animate={raysControls}
              variants={raysVariants}
              custom={index + 1}
              initial="normal"
            />
          ))}
          <path d="M16 18a4 4 0 0 0-8 0" />
        </svg>
      </div>
    );
  }
);

SunsetIcon.displayName = 'SunsetIcon';

export { SunsetIcon };
