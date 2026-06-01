"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface UserRoundCogIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserRoundCogIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const COG_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: 180 },
};

const COG_TRANSITION = {
  transition: { type: "spring", stiffness: 50, damping: 10 },
};
const UserRoundCogIcon = forwardRef<
  UserRoundCogIconHandle,
  UserRoundCogIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseEnter?.(e);
      } else {
        controls.start("animate");
      }
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseLeave?.(e);
      } else {
        controls.start("normal");
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
        fill="none"
        height="24"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 21a8 8 0 0 1 10.434-7.62" />
        <circle cx="10" cy="8" r="5" />
        <motion.g
          animate={controls}
          transition={COG_TRANSITION}
          variants={COG_VARIANTS}
        >
          <circle cx="18" cy="18" r="3" />

          <path d="m14.305 19.53.923-.382" />
          <path d="m15.228 16.852-.923-.383" />
          <path d="m16.852 15.228-.383-.923" />
          <path d="m16.852 20.772-.383.924" />
          <path d="m19.148 15.228.383-.923" />
          <path d="m19.53 21.696-.382-.924" />
          <path d="m20.772 16.852.924-.383" />
          <path d="m20.772 19.148.924.383" />
        </motion.g>
      </svg>
    </div>
  );
});

UserRoundCogIcon.displayName = "UserRoundCogIcon";

export { UserRoundCogIcon };
