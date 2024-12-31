'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';

const swapTransition: Transition = {
  type: 'spring',
  stiffness: 240,
  damping: 24,
};

const swapVariants: Variants = {
  normal: {
    translateY: 0,
  },
  animate: (custom: number) => ({
    translateY: custom * 10,
  }),
};

const ArrowDownAZIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 16 4 4 4-4" />
        <path d="M7 20V4" />
        <motion.g
          variants={swapVariants}
          initial="normal"
          animate={controls}
          custom={1}
          transition={swapTransition}
        >
          <path d="M20 8h-5" />
          <path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10" />
        </motion.g>
        <motion.path
          d="M15 14h5l-5 6h5"
          variants={swapVariants}
          initial="normal"
          animate={controls}
          custom={-1}
          transition={swapTransition}
        />
      </svg>
    </div>
  );
};

export { ArrowDownAZIcon };
