'use client';

import { AnimatePresence, motion, useAnimation } from 'motion/react';
import { useEffect, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface GripVerticalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GripVerticalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CIRCLES = [
  { cx: 9, cy: 5 }, // Top left
  { cx: 15, cy: 5 }, // Top right
  { cx: 9, cy: 12 }, // Middle left
  { cx: 15, cy: 12 }, // Middle right
  { cx: 9, cy: 19 }, // Bottom left
  { cx: 15, cy: 19 }, // Bottom right
];

const GripVerticalIcon = forwardRef<
  GripVerticalIconHandle,
  GripVerticalIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: async () => setIsHovered(true),
      stopAnimation: () => setIsHovered(false),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        setIsHovered(true);
      } else {
        onMouseEnter?.(e);
      }
    },
    [onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        setIsHovered(false);
      } else {
        onMouseLeave?.(e);
      }
    },
    [onMouseLeave]
  );

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
        <AnimatePresence>
          {CIRCLES.map((circle, index) => (
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
    </div>
  );
});

GripVerticalIcon.displayName = 'GripVerticalIcon';

export { GripVerticalIcon };
