'use client';

import { motion, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';

const outerVariants: Variants = {
  normal: { opacity: 1, scale: 1 },
  animate: {
    opacity: [1, 0.8, 1],
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.4,
    },
  },
};

const screenVariants: Variants = {
  normal: { fill: 'rgba(0, 0, 0, 0)' },
  animate: {
    fill: ['#ccc', '#999', '#ccc'],
    transition: {
      duration: 0.4,
    },
  },
};

const MobileIcon = () => {
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
        <motion.rect
          x="6"
          y="2"
          width="12"
          height="20"
          rx="2"
          ry="2"
          variants={outerVariants}
          animate={controls}
        />

        <motion.rect
          x="8"
          y="4"
          width="8"
          height="14"
          rx="1"
          ry="1"
          variants={screenVariants}
          animate={controls}
        />

        <circle cx="12" cy="19" r="1" />
      </svg>
    </div>
  );
};

export { MobileIcon };
