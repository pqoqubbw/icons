'use client';
import React from 'react';
import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'framer-motion';

const leftHalfVariants: Variants = {
  normal: {
    rotate: 0,
    x: 0,
    opacity: 1,
  },
  animate: {
    rotate: -3,
    x: -2,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};
const rightHalfVariants: Variants = {
  normal: {
    rotate: 0,
    x: 0,
    opacity: 1,
  },
  animate: {
    rotate:3,
    x: 2,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};
const HeartCrackIcon = () => {
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
      >
        <motion.path
          d="M12 5C10.5 3.5 9.26 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7 L11 13 L13 11 L10 8 L12 5"
          variants={leftHalfVariants}
        />
        <motion.path
          d="M12 5c1.5-1.5 2.74-2 4.5-2A5.5 5.5 0 0 1 22 8.5c0 2.3-1.5 4.05-3 5.5l-7 7 L13 13 L11 11 L14 8 L12 5"
          variants={rightHalfVariants}
        />
      </motion.svg>
    </div>
  );
};

export { HeartCrackIcon };
