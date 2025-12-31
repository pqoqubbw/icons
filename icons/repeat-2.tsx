'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface Repeat2IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Repeat2IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DRAW_VARIANTS: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: i === 0 ? 0 : 0.2,
      duration: 0.25,
      ease: 'easeOut',
    },
  }),
};

const Repeat2Icon = forwardRef<Repeat2IconHandle, Repeat2IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const [hovered, setHovered] = useState(false);
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
        onMouseEnter={(e) => {
          setHovered(true);
          handleMouseEnter(e);
        }}
        onMouseLeave={(e) => {
          setHovered(false);
          handleMouseLeave(e);
        }}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          key={hovered ? 'hover' : 'idle'}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="hidden"
          animate="show"
        >
          <motion.path d="m2 9 3-3 3 3" variants={DRAW_VARIANTS} custom={1} />
          <motion.path
            d="M13 18H7a2 2 0 0 1-2-2V6"
            variants={DRAW_VARIANTS}
            custom={0}
          />
          <motion.path d="m22 15-3 3-3-3" variants={DRAW_VARIANTS} custom={1} />
          <motion.path
            d="M11 6h6a2 2 0 0 1 2 2v10"
            variants={DRAW_VARIANTS}
            custom={0}
          />
        </motion.svg>
      </div>
    );
  }
);

Repeat2Icon.displayName = 'Repeat2Icon';

export { Repeat2Icon };
