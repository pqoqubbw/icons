'use client';

import { motion, useAnimation, Variants } from 'framer-motion';

const lineVariants: Variants = {
  normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
  },
};

const ItalicIcon = () => {
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
          transition={{ duration: 0.2 }}
          variants={lineVariants}
          animate={controls}
          x1="19"
          x2="10"
          y1="4"
          y2="4"
        />
        <motion.line
          transition={{ duration: 0.2 }}
          variants={lineVariants}
          animate={controls}
          x1="14"
          x2="5"
          y1="20"
          y2="20"
        />
        <motion.line
          transition={{
            delay: 0.1,
            duration: 0.4,
          }}
          variants={{
            normal: { pathLength: 1, pathOffset: 0 },
            animate: {
              pathLength: [0, 1],
              pathOffset: [1, 0],
            },
          }}
          animate={controls}
          x1="15"
          x2="9"
          y1="4"
          y2="20"
        />
      </svg>
    </div>
  );
};

export { ItalicIcon };
