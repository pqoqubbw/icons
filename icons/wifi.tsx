'use client';

import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface WifiIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WifiIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const WIFI_LEVELS = [
  { d: 'M12 20h.01', initialOpacity: 1, delay: 0 },
  { d: 'M8.5 16.429a5 5 0 0 1 7 0', initialOpacity: 1, delay: 0.1 },
  { d: 'M5 12.859a10 10 0 0 1 14 0', initialOpacity: 1, delay: 0.2 },
  { d: 'M2 8.82a15 15 0 0 1 20 0', initialOpacity: 1, delay: 0.3 },
];

const WifiIcon = forwardRef<WifiIconHandle, WifiIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();

    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: async () => {
          await controls.start('fadeOut');
          controls.start('fadeIn');
        },
        stopAnimation: () => controls.start('fadeIn'),
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
        controls.start('fadeIn');
        onMouseLeave?.(e);
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
          {WIFI_LEVELS.map((level, index) => (
            <motion.path
              key={index}
              d={level.d}
              initial={{ opacity: level.initialOpacity }}
              animate={controls}
              variants={{
                fadeOut: {
                  opacity: index === 0 ? 1 : 0,
                  transition: { duration: 0.2 },
                },
                fadeIn: {
                  opacity: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: level.delay,
                  },
                },
              }}
            />
          ))}
        </svg>
      </div>
    );
  }
);

WifiIcon.displayName = 'WifiIcon';

export { WifiIcon };
