'use client';

import { motion, useAnimation } from 'framer-motion';

const SmartphoneChargingIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => {
        controls.start('animate');
      }}
      onMouseLeave={() => {
        controls.start('normal');
      }}
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
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <motion.path
          d="M12.667 8 10 12h4l-2.667 4"
          variants={{
            normal: { opacity: 1 },
            animate: {
              opacity: [1, 0.4, 1],
              transition: {
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            },
          }}
          initial="normal"
          animate={controls}
        />
      </svg>
    </div>
  );
};

export { SmartphoneChargingIcon };
