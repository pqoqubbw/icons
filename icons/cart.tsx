'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';

const cartVariants: Variants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.1,
    y: [0, -5, 0],
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
      y: { repeat: 1, delay: 0.1, duration: 0.4 },
    },
  },
};

const CartIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => {
        controls.start('hover');
      }}
      onMouseLeave={() => {
        controls.start('normal');
      }}
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
        variants={cartVariants}
        animate={controls}
        transition={{ duration: 0.2 }}
      >
        <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" />
      </motion.svg>
    </div>
  );
};

export { CartIcon };
