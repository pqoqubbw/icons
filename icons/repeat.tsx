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

export interface RepeatIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface RepeatIconProps extends HTMLAttributes<HTMLDivElement> {
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

const RepeatIcon = forwardRef<RepeatIconHandle, RepeatIconProps>(
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
          <motion.path
            d="M3 11v-1a4 4 0 0 1 4-4h14"
            variants={DRAW_VARIANTS}
            custom={0}
          />
          <motion.path d="m17 2 4 4-4 4" variants={DRAW_VARIANTS} custom={1} />
          <motion.path
            d="M21 13v1a4 4 0 0 1-4 4H3"
            variants={DRAW_VARIANTS}
            custom={0}
          />
          <motion.path d="m7 22-4-4 4-4" variants={DRAW_VARIANTS} custom={1} />
        </motion.svg>
      </div>
    );
  }
);

RepeatIcon.displayName = 'RepeatIcon';

export { RepeatIcon };
