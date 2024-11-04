'use client';

import { motion, Transition, useAnimation } from 'framer-motion';

const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 160,
  damping: 17,
  mass: 1,
};

const GaugeIcon = () => {
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
        <motion.path
          d="m12 14 4-4"
          variants={{
            animate: { translateX: 0.5, translateY: 3, rotate: 72 },
            normal: {
              translateX: 0,
              rotate: 0,
              translateY: 0,
            },
          }}
          animate={controls}
          transition={defaultTransition}
        />
        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
      </svg>
    </div>
  );
};

export { GaugeIcon };
