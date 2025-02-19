'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';

const pathVariants: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const SunDimIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-sun-dim"
      >
        <circle cx="12" cy="12" r="4" />
        {[
          'M12 4h.01',
          'M20 12h.01',
          'M12 20h.01',
          'M4 12h.01',
          'M17.657 6.343h.01',
          'M17.657 17.657h.01',
          'M6.343 17.657h.01',
          'M6.343 6.343h.01',
        ].map((d, index) => (
          <motion.path
            key={d}
            d={d}
            animate={controls}
            variants={pathVariants}
            custom={index + 1}
          />
        ))}
      </svg>
    </div>
  );
};

export { SunDimIcon };
