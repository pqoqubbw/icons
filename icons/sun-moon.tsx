'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface SunMoonIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
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

const SunMoonIcon = forwardRef<SunMoonIconHandle, {}>(({}, ref) => {
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

  const handleMouseEnter = useCallback(() => {
    if (!isControlledRef.current) {
      sunControls.start('animate');
      moonControls.start('animate');
    }
  }, [sunControls, moonControls]);

  const handleMouseLeave = useCallback(() => {
    if (!isControlledRef.current) {
      sunControls.start('normal');
      moonControls.start('normal');
    }
  }, [sunControls, moonControls]);

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        className="lucide lucide-sun-moon"
      >
        <motion.g variants={sunVariants} animate={sunControls} initial="normal">
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
});

SunMoonIcon.displayName = 'SunMoonIcon';

export { SunMoonIcon };