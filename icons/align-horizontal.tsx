'use client';

import type { Transition } from 'motion/react';
import { motion, useAnimation } from 'motion/react';

const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 160,
  damping: 17,
  mass: 1,
};

const AlignHorizontalIcon = () => {
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
            normal: { scaleX: 1 },
            animate: { scaleX: 0.85 },
          }}
          animate={controls}
          transition={defaultTransition}
          width="6"
          height="10"
          x="9"
          y="7"
          rx="2"
        />
        <motion.path
          d="M4 22V2"
          variants={{
            normal: { translateX: 0, scaleY: 1 },
            animate: {
              translateX: 2,
              scaleY: 0.9,
            },
          }}
          animate={controls}
          transition={defaultTransition}
        />
        <motion.path
          d="M20 22V2"
          variants={{
            normal: { translateX: 0, scaleY: 1 },
            animate: {
              translateX: -2,
              scaleY: 0.9,
            },
          }}
          animate={controls}
          transition={defaultTransition}
        />
      </svg>
    </div>
  );
};

export { AlignHorizontalIcon };
