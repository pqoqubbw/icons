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

const TelegramIcon = () => {
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
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <motion.path
                    variants={pathVariants}
                    initial="normal"
                    animate={pathControls}
                    d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z"
                />
            </svg>
        </div>
    );
};

export { TelegramIcon };

