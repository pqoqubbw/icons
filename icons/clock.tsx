"use client";

import { motion, useAnimation, Variants } from "framer-motion";

const handVariants: Variants = {
  normal: {
    rotate: 0,
    originX: "50%",
    originY: "50%",
  },
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const minuteHandVariants: Variants = {
  normal: {
    rotate: 0,
    originX: "50%",
    originY: "50%",
  },
  animate: {
    rotate: 45,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const ClockIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
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
        <circle cx="12" cy="12" r="10" />
        <motion.line
          x1="12"
          y1="12"
          x2="12"
          y2="6"
          variants={handVariants}
          animate={controls}
          initial="normal"
        />
        <motion.line
          x1="12"
          y1="12"
          x2="16"
          y2="12"
          variants={minuteHandVariants}
          animate={controls}
          initial="normal"
        />
      </svg>
    </div>
  );
};

export { ClockIcon };
