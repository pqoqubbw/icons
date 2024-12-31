'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';

const rectVariants: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.4,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
};

const VibrateIcon = () => {
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
        <path d="m2 8 2 2-2 2 2 2-2 2" />
        <path d="m22 8-2 2 2 2-2 2 2 2" />
        <motion.rect
          width="8"
          height="14"
          x="8"
          y="5"
          rx="1"
          variants={rectVariants}
          animate={controls}
        />
      </svg>
    </div>
  );
};

export { VibrateIcon };
