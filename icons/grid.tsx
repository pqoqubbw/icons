'use client';

import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const circles = [
  { cx: 19, cy: 5 }, // Top right
  { cx: 12, cy: 5 }, // Top middle
  { cx: 19, cy: 12 }, // Middle right
  { cx: 5, cy: 5 }, // Top left
  { cx: 12, cy: 12 }, // Center
  { cx: 19, cy: 19 }, // Bottom right
  { cx: 5, cy: 12 }, // Middle left
  { cx: 12, cy: 19 }, // Bottom middle
  { cx: 5, cy: 19 }, // Bottom left
];

const GridIcon = () => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const animateCircles = async () => {
      if (isHovered) {
        await controls.start((i) => ({
          opacity: 0.3,
          transition: {
            delay: i * 0.1,
            duration: 0.2,
          },
        }));
        await controls.start((i) => ({
          opacity: 1,
          transition: {
            delay: i * 0.1,
            duration: 0.2,
          },
        }));
      }
    };

    animateCircles();
  }, [isHovered, controls]);

  return (
    <motion.div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        <AnimatePresence>
          {circles.map((circle, index) => (
            <motion.circle
              key={`${circle.cx}-${circle.cy}`}
              cx={circle.cx}
              cy={circle.cy}
              r="1"
              initial="initial"
              variants={{
                initial: {
                  opacity: 1,
                },
              }}
              animate={controls}
              exit="initial"
              custom={index}
            />
          ))}
        </AnimatePresence>
      </svg>
    </motion.div>
  );
};

export { GridIcon };
