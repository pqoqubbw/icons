'use client';

import { AnimatePresence, motion, useAnimation } from 'motion/react';
import {
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export interface CalendarDaysIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const DOTS = [
  { cx: 8, cy: 14 },
  { cx: 12, cy: 14 },
  { cx: 16, cy: 14 },
  { cx: 8, cy: 18 },
  { cx: 12, cy: 18 },
  { cx: 16, cy: 18 },
];

const CalendarDaysIcon = forwardRef<
  CalendarDaysIconHandle,
  HTMLAttributes<HTMLDivElement>
>(({ onMouseEnter, onMouseLeave, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
      startAnimation: () => setIsHovered(true),
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
    const animateDots = async () => {
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

    animateDots();
  }, [isHovered, controls]);

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
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
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
        <AnimatePresence>
          {DOTS.map((dot, index) => (
            <motion.circle
              key={`${dot.cx}-${dot.cy}`}
              cx={dot.cx}
              cy={dot.cy}
              r="1"
              fill="currentColor"
              stroke="none"
              initial={{ opacity: 1 }}
              animate={controls}
              exit={{ opacity: 1 }}
              custom={index}
            />
          ))}
        </AnimatePresence>
      </svg>
    </div>
  );
});

CalendarDaysIcon.displayName = 'CalendarDaysIcon';

export { CalendarDaysIcon };
