'use client';

import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface FileStackIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FileStackIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FileStackIcon = forwardRef<FileStackIconHandle, FileStackIconProps>(
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
        if (!isControlledRef.current) {
          controls.start('animate');
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
          <motion.path
            d="M21 7h-3a2 2 0 0 1-2-2V2"
            variants={{
              normal: { translateX: 0, translateY: 0 },
              animate: { translateX: -4, translateY: 4 },
            }}
            animate={controls}
          />
          <motion.path
            d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z"
            variants={{
              normal: { translateX: 0, translateY: 0 },
              animate: { translateX: -4, translateY: 4 },
            }}
            animate={controls}
          />
          <path d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15" />
          <motion.path
            d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11"
            variants={{
              normal: { translateX: 0, translateY: 0 },
              animate: { translateX: 4, translateY: -4 },
            }}
            animate={controls}
          />
        </svg>
      </div>
    );
  }
);

FileStackIcon.displayName = 'FileStackIcon';

export { FileStackIcon };
