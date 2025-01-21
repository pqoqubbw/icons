'use client';

import type { Transition } from 'motion/react';
import { motion, useAnimation } from 'motion/react';

const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 160,
  damping: 17,
  mass: 1,
};

const FrameIcon = () => {
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
          variants={{
            animate: { translateY: -4 },
            normal: {
              translateX: 0,
              rotate: 0,
              translateY: 0,
            },
          }}
          animate={controls}
          transition={defaultTransition}
          x1={22}
          x2={2}
          y1={6}
          y2={6}
        />
        <motion.line
          variants={{
            animate: { translateY: 4 },
            normal: {
              translateX: 0,
              rotate: 0,
              translateY: 0,
            },
          }}
          animate={controls}
          transition={defaultTransition}
          x1={22}
          x2={2}
          y1={18}
          y2={18}
        />
        <motion.line
          variants={{
            animate: { translateX: -4 },
            normal: {
              translateX: 0,
              rotate: 0,
              translateY: 0,
            },
          }}
          animate={controls}
          transition={defaultTransition}
          x1={6}
          x2={6}
          y1={2}
          y2={22}
        />
        <motion.line
          variants={{
            animate: { translateX: 4 },
            normal: {
              translateX: 0,
              rotate: 0,
              translateY: 0,
            },
          }}
          animate={controls}
          transition={defaultTransition}
          x1={18}
          x2={18}
          y1={2}
          y2={22}
        />
      </svg>
    </div>
  );
};

export { FrameIcon };
