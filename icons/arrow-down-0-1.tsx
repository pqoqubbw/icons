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

const ArrowDown01con = () => {
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
        <motion.rect
          x="15"
          y="4"
          width="4"
          height="6"
          ry="2"
          variants={swapVariants}
          initial="normal"
          animate={controls}
          custom={1}
          transition={swapTransition}
        />
        <motion.g
          variants={swapVariants}
          initial="normal"
          animate={controls}
          custom={-1}
          transition={swapTransition}
        >
          <path d="M17 20v-6h-2" />
          <path d="M15 20h4" />
        </motion.g>
      </svg>
    </div>
  );
};

export { ArrowDown01con };
