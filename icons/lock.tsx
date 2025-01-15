'use client';
import React from 'react';
import { motion, useAnimation } from 'framer-motion';

const pathVariants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    y: 0,
  },
  animate: {
    pathLength: [1, 0.8, 1],
    opacity: 1,
    y: [-2, 0],
    transition: {
      duration: 1.2,
      ease: [0.4, 0, 0.2, 1],
      times: [0, 0.5, 1],
      bounce: 0,
    },
  },
};

const bodyVariants = {
  normal: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  animate: {
    opacity: 1,
    scale: [1, 0.95, 1],
    y: [0, 2, 0],
    transition: {
      duration: 1.2,
      ease: [0.4, 0, 0.2, 1],
      times: [0, 0.5, 1],
      bounce: 0,
    },
  },
};

const LockIcon = () => {
  const controls = useAnimation();

  const isAnimating = React.useRef(false);

  const handleMouseEnter = async () => {
    if (!isAnimating.current) {
      isAnimating.current = true;
      await controls.start('animate');
      await controls.start('normal');
      isAnimating.current = false;
    }
  };

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.rect
          width="18"
          height="11"
          x="7"
          y="15"
          rx="2"
          ry="2"
          initial="normal"
          animate={controls}
          variants={bodyVariants}
        />
        <motion.path
          d="M10 15V9a6 6 0 0 1 12 0v6"
          initial="normal"
          animate={controls}
          variants={pathVariants}
        />
      </svg>
    </div>
  );
};

export  {LockIcon};
