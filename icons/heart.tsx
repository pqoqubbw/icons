'use client';
import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';

const pulseVariants: Variants = {
  normal: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

const HeartIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial="normal"
        animate={controls}
        variants={pulseVariants}
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </motion.svg>
    </div>
  );
};

export { HeartIcon };
