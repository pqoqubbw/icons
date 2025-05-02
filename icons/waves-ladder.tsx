'use client';

import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface WavesLadderIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WavesLadderIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const WavesLadderIcon = forwardRef<WavesLadderIconHandle, WavesLadderIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('animate');
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('normal');
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
          <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <motion.g
            initial={{ y: 0, opacity: 1 }}
            variants={{
              normal: { y: 0, opacity: 1 },
              animate: {
                y: [13, 0],
                opacity: [0, 0, 1],
                transition: { duration: 1, times: [0, 0.5, 1], repeat: 0 },
              },
            }}
            animate={controls}
          >
            <path d="M19 5a2 2 0 0 0-2 2v11" />
            <path d="M7 13h10" />
            <path d="M7 9h10" />
            <path d="M9 5a2 2 0 0 0-2 2v11" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

WavesLadderIcon.displayName = 'WavesLadderIcon';
export { WavesLadderIcon };
