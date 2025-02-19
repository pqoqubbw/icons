'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface SunsetIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const sunVariants: Variants = {
  normal: {
    y: 0,
  },
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

const raysVariants: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const SunsetIcon = forwardRef<SunsetIconHandle, HTMLAttributes<HTMLDivElement>>(
  ({ onMouseEnter, onMouseLeave, ...props }, ref) => {
    const sunControls = useAnimation();
    const raysControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          sunControls.start('animate');
          raysControls.start('animate');
        },
        stopAnimation: () => {
          sunControls.start('normal');
          raysControls.start('normal');
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          sunControls.start('animate');
          raysControls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [sunControls, raysControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          sunControls.start('normal');
          raysControls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [sunControls, raysControls, onMouseLeave]
    );

    return (
      <div
        className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-sunset"
        >
          <motion.path
            d="M12 10V2"
            animate={sunControls}
            variants={sunVariants}
            initial="normal"
          />
          {[
            'm4.93 10.93 1.41 1.41',
            'M2 18h2',
            'M20 18h2',
            'm19.07 10.93-1.41 1.41',
            'M22 22H2',
            'm16 6-4 4-4-4',
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