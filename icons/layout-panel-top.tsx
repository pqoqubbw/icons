'use client';

import { useAnimation, motion } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface LayoutPanelTopIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LayoutPanelTopIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LayoutPanelTopIcon = forwardRef<
  LayoutPanelTopIconHandle,
  LayoutPanelTopIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        <motion.rect
          width="18"
          height="7"
          x="3"
          y="3"
          rx="1"
          initial="normal"
          animate={controls}
          variants={{
            normal: { opacity: 1, translateY: 0 },
            animate: {
              opacity: [0, 1],
              translateY: [-5, 0],
              transition: {
                opacity: { duration: 0.5, times: [0.2, 1] },
                duration: 0.5,
              },
            },
          }}
        />
        <motion.rect
          width="7"
          height="7"
          x="3"
          y="14"
          rx="1"
          initial="normal"
          animate={controls}
          variants={{
            normal: { opacity: 1, translateX: 0 },
            animate: {
              opacity: [0, 1],
              translateX: [-10, 0],
              transition: {
                opacity: { duration: 0.7, times: [0.5, 1] },
                translateX: { delay: 0.3 },
                duration: 0.5,
              },
            },
          }}
        />
        <motion.rect
          width="7"
          height="7"
          x="14"
          y="14"
          rx="1"
          initial="normal"
          animate={controls}
          variants={{
            normal: { opacity: 1, translateX: 0 },
            animate: {
              opacity: [0, 1],
              translateX: [10, 0],
              transition: {
                opacity: { duration: 0.8, times: [0.5, 1] },
                translateX: { delay: 0.4 },
                duration: 0.5,
              },
            },
          }}
        />
      </svg>
    </div>
  );
});

LayoutPanelTopIcon.displayName = 'LayoutPanelTopIcon';

export { LayoutPanelTopIcon };
