'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface CloudSunIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const cloudVariants: Variants = {
  normal: {
    x: 0,
    y: 0,
  },
  animate: {
    x: [-2, 2, -1, 1, 0],
    y: [-1, 1, -0.5, 0.5, 0],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

const sunVariants: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const CloudSunIcon = forwardRef<
  CloudSunIconHandle,
  HTMLAttributes<HTMLDivElement>
>(({ onMouseEnter, onMouseLeave, ...props }, ref) => {
  const cloudControls = useAnimation();
  const sunControls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => {
        cloudControls.start('animate');
        sunControls.start('animate');
      },
      stopAnimation: () => {
        cloudControls.start('normal');
        sunControls.start('normal');
      },
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        cloudControls.start('animate');
        sunControls.start('animate');
      } else {
        onMouseEnter?.(e);
      }
    },
    [cloudControls, sunControls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        cloudControls.start('normal');
        sunControls.start('normal');
      } else {
        onMouseLeave?.(e);
      }
    },
    [cloudControls, sunControls, onMouseLeave]
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
        className="lucide lucide-cloud-sun"
      >
        <motion.g
          variants={cloudVariants}
          animate={cloudControls}
          initial="normal"
        >
          <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
        </motion.g>
        {[
          'M12 2v2',
          'm4.93 4.93 1.41 1.41',
          'M20 12h2',
          'm19.07 4.93-1.41 1.41',
          'M15.947 12.65a4 4 0 0 0-5.925-4.128',
        ].map((d, index) => (
          <motion.path
            key={d}
            d={d}
            animate={sunControls}
            variants={sunVariants}
            custom={index + 1}
            initial="normal"
          />
        ))}
      </svg>
    </div>
  );
});

CloudSunIcon.displayName = 'CloudSunIcon';

export { CloudSunIcon };
