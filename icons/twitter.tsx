'use client';

import { motion, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';

const pathVariants: Variants = {
    normal: {
        opacity: 1,
        pathLength: 1,
        pathOffset: 0,
        transition: {
            duration: 0.4,
            opacity: { duration: 0.1 },
        },
    },
    animate: {
        opacity: [0, 1],
        pathLength: [0, 1],
        pathOffset: [1, 0],
        transition: {
            duration: 0.6,
            ease: 'linear',
            opacity: { duration: 0.1 },
        },
    },
};

const TwitterXIcon = () => {
    const pathControls = useAnimation();

    const handleMouseEnter = () => {
        pathControls.start('animate');
    };

    const handleMouseLeave = () => {
        pathControls.start('normal');
    };

    return (
        <div
            className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1668.56 1221.19"
                width="28"
                height="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="50"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <motion.path
                    variants={pathVariants}
                    initial="normal"
                    animate={pathControls}
                    d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99
          h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
                    transform="translate(52.39 -25.059)"
                />
            </svg>
        </div>
    );
};

export { TwitterXIcon };

