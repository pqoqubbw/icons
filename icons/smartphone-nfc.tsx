'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface SmartphoneNfcIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SmartphoneNfcIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  fadeOut: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
  fadeIn: (i: number) => ({
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      delay: i * 0.1,
    },
  }),
};

const SmartphoneNfcIcon = forwardRef<
  SmartphoneNfcIconHandle,
  SmartphoneNfcIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
      startAnimation: async () => {
        await controls.start('fadeOut');
        controls.start('fadeIn');
      },
      stopAnimation: () => controls.start('normal'),
    };
  });

  const handleMouseEnter = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        await controls.start('fadeOut');
        controls.start('fadeIn');
      } else {
        onMouseEnter?.(e);
      }
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start('normal');
      } else {
        onMouseLeave?.(e);
      }
    },
    [controls, onMouseLeave]
  );

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="7" height="12" x="2" y="6" rx="1" />
        <motion.path
          d="M13 8.32a7.43 7.43 0 0 1 0 7.36"
          initial={{ opacity: 1 }}
          variants={PATH_VARIANTS}
          animate={controls}
          custom={0}
        />
        <motion.path
          d="M16.46 6.21a11.76 11.76 0 0 1 0 11.58"
          initial={{ opacity: 1 }}
          variants={PATH_VARIANTS}
          animate={controls}
          custom={1}
        />
        <motion.path
          d="M19.91 4.1a15.91 15.91 0 0 1 .01 15.8"
          initial={{ opacity: 1 }}
          variants={PATH_VARIANTS}
          animate={controls}
          custom={2}
        />
      </svg>
    </div>
  );
});

SmartphoneNfcIcon.displayName = 'SmartphoneNfcIcon';

export { SmartphoneNfcIcon };
