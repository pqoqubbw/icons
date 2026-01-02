"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface AnnoyedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AnnoyedIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const AnnoyedIcon = forwardRef<AnnoyedIconHandle, AnnoyedIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        if (!isControlledRef.current) controls.start("animate");
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start("normal");
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

    const faceVariants: Variants = {
      normal: {
        scale: 1,
        transition: { duration: 0.2, ease: "easeOut" },
      },
      animate: {
        scale: 1.05,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
    };

    const mouthVariants: Variants = {
      normal: {
        scaleX: 1,
        y: 0,
        transition: { duration: 0.2, ease: "easeOut" },
      },
      animate: {
        scaleX: 0.8,
        y: 1,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
    };

    const leftEyebrowVariants: Variants = {
      normal: {
        rotate: 0,
        y: 0,
        x: 0,
        transition: { duration: 0.2, ease: "easeOut" },
      },
      animate: {
        rotate: 15,
        y: -1,
        x: -0.5,
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      },
    };

    const rightEyebrowVariants: Variants = {
      normal: {
        rotate: 0,
        y: 0,
        x: 0,
        transition: { duration: 0.2, ease: "easeOut" },
      },
      animate: {
        rotate: 15,
        y: -1,
        x: 0.5,
        transition: {
          duration: 0.25,
          ease: "easeOut",
          delay: 0.05,
        },
      },
    };

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          animate={controls}
          fill="none"
          height={size}
          initial="normal"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          variants={faceVariants}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" />
          <motion.path
            animate={controls}
            d="M8 15h8"
            initial="normal"
            variants={mouthVariants}
          />
          <motion.path
            animate={controls}
            d="M8 9h2"
            initial="normal"
            variants={leftEyebrowVariants}
          />
          <motion.path
            animate={controls}
            d="M14 9h2"
            initial="normal"
            variants={rightEyebrowVariants}
          />
        </motion.svg>
      </div>
    );
  }
);

AnnoyedIcon.displayName = "AnnoyedIcon";

export { AnnoyedIcon };
