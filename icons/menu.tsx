'use client';

import { motion, useAnimation, Variants } from 'framer-motion';

const lineVariants: Variants = {
  normal: {
    rotate: 0,
    y: 0,
    opacity: 1,
  },
  animate: (custom: number) => ({
    rotate: custom === 1 ? 45 : custom === 3 ? -45 : 0,
    y: custom === 1 ? 6 : custom === 3 ? -6 : 0,
    opacity: custom === 2 ? 0 : 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  }),
};

const MenuIcon = () => {
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
        <motion.line
          x1="4"
          y1="6"
          x2="20"
          y2="6"
          variants={lineVariants}
          animate={controls}
          custom={1}
        />
        <motion.line
          x1="4"
          y1="12"
          x2="20"
          y2="12"
          variants={lineVariants}
          animate={controls}
          custom={2}
        />
        <motion.line
          x1="4"
          y1="18"
          x2="20"
          y2="18"
          variants={lineVariants}
          animate={controls}
          custom={3}
        />
      </svg>
    </div>
  );
};

export { MenuIcon };
