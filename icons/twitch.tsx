'use client';

import { motion, useAnimation } from 'motion/react';
import type { Variants } from 'motion/react';

const pathVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: 'linear',
      opacity: { duration: 0.1 },
    },
  },
};

const lineVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: 'linear',
      opacity: { duration: 0.1 },
    },
  },
};

const TwitchIcon = () => {
  const pathControls = useAnimation();
  const line1Controls = useAnimation();
  const line2Controls = useAnimation();

  const handleMouseEnter = () => {
    pathControls.start('animate');
    line1Controls.start('animate');
    line2Controls.start('animate');
  };

  const handleMouseLeave = () => {
    pathControls.start('normal');
    line1Controls.start('normal');
    line2Controls.start('normal');
  };

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        <motion.path
          variants={pathVariants}
          initial="normal"
          animate={pathControls}
          d="M21 2H3v16h5v4l4-4h5l4-4V2z"
        />
        <motion.path
          variants={lineVariants}
          initial="normal"
          animate={line1Controls}
          d="M11 11V7"
        />
        <motion.path
          variants={lineVariants}
          initial="normal"
          animate={line2Controls}
          d="M16 11V7"
        />
      </svg>
    </div>
  );
};

export { TwitchIcon };
