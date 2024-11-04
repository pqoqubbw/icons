'use client';

import { cubicBezier, motion, useAnimation } from 'framer-motion';

const customEasing = cubicBezier(0.25, 0.1, 0.25, 1);

const UndoIcon = () => {
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
          transition={{
            duration: 0.6,
            ease: customEasing,
          }}
          variants={{
            normal: { translateX: 0, translateY: 0, rotate: 0 },
            animate: {
              translateX: [0, 2.1, 0],
              translateY: [0, -1.4, 0],
              rotate: [0, 12, 0],
            },
          }}
          animate={controls}
          d="M3 7v6h6"
        />
        <motion.path
          transition={{
            duration: 0.6,
            ease: customEasing,
          }}
          variants={{
            normal: { pathLength: 1 },
            animate: { pathLength: [1, 0.8, 1] },
          }}
          animate={controls}
          d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"
        />
      </svg>
    </div>
  );
};

export { UndoIcon };
