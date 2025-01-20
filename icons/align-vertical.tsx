'use client';

import type { Transition } from 'motion/react';
import { motion, useAnimation } from 'motion/react';

const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 160,
  damping: 17,
  mass: 1,
};

const AlignVerticalIcon = () => {
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
          variants={{
            normal: { scaleY: 1 },
            animate: { scaleY: 0.8 },
          }}
          animate={controls}
          width="10"
          height="6"
          x="7"
          y="9"
          rx="2"
          transition={defaultTransition}
        />
        <motion.path
          variants={{
            normal: { translateY: 0, scaleX: 1 },
            animate: {
              translateY: -2,
              scaleX: 0.9,
            },
          }}
          animate={controls}
          transition={defaultTransition}
          d="M22 20H2"
        />
        <motion.path
          variants={{
            normal: { translateY: 0, scaleX: 1 },
            animate: {
              translateY: 2,
              scaleX: 0.9,
            },
          }}
          animate={controls}
          transition={defaultTransition}
          d="M22 4H2"
        />
      </svg>
    </div>
  );
};

export { AlignVerticalIcon };
