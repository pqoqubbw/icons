"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps, Variants } from "motion/react";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
} from "react";

export interface UnlinkIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface UnlinkIconProps extends HTMLMotionProps<"div"> {
    size?: number;
}

const UnlinkIcon = forwardRef<UnlinkIconHandle, UnlinkIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
        const topLineControls = useAnimation();
        const bottomLineControls = useAnimation();
        const sparksControls = useAnimation();
        const chainControls = useAnimation();
        const reduced = useReducedMotion();
        const isControlled = useRef(false);

        useImperativeHandle(ref, () => {
            isControlled.current = true;
            return {
                startAnimation: () => {
                    if (reduced) {
                        topLineControls.start("normal");
                        bottomLineControls.start("normal");
                        sparksControls.start("normal");
                        chainControls.start("normal");
                    } else {
                        topLineControls.start("animate");
                        bottomLineControls.start("animate");
                        sparksControls.start("animate");
                        chainControls.start("animate");
                    }
                },
                stopAnimation: () => {
                    topLineControls.start("normal");
                    bottomLineControls.start("normal");
                    sparksControls.start("normal");
                    chainControls.start("normal");
                },
            };
        });

        const handleEnter = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (reduced) return;
                if (!isControlled.current) {
                    topLineControls.start("animate");
                    bottomLineControls.start("animate");
                    sparksControls.start("animate");
                    chainControls.start("animate");
                }
                onMouseEnter?.(e);
            },
            [topLineControls, bottomLineControls, sparksControls, chainControls, onMouseEnter, reduced]
        );

        const handleLeave = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (!isControlled.current) {
                    topLineControls.start("normal");
                    bottomLineControls.start("normal");
                    sparksControls.start("normal");
                    chainControls.start("normal");
                }
                onMouseLeave?.(e);
            },
            [topLineControls, bottomLineControls, sparksControls, chainControls, onMouseLeave]
        );

        const bounceVariants: Variants = {
            normal: { y: 0, rotate: 0 },
            animate: {
                y: [0, -2, 2, -2, 0],
                rotate: [0, 5, -2, 0],
                transition: { duration: 0.8, ease: "easeInOut" },
            },
        };

        const sparksVariants: Variants = {
            normal: { opacity: 1, pathLength: 1 },
            animate: {
                pathLength: [0, 1],
                x: [0, 2, 4, -2, 4, 0],
                opacity: [0, 1, 0, 1],
                transition: { duration: 0.5, ease: "easeInOut" },
            },
        };

        const chainVariants: Variants = {
            normal: { scale: 1, rotate: 0 },
            animate: {
                scale: [1, 1.2, 0.95, 1],
                rotate: [0, -33, 13, -10, 2, 0],
                transition: { duration: 0.5, ease: "easeInOut", stiffness: 300, damping: 15 },
            },
        };

        return (
            <motion.div
                className={cn("inline-flex items-center justify-center", className)}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
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
                        d="m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"
                        variants={chainVariants}
                        initial="normal"
                        animate={chainControls}
                    />

                    <motion.path
                        d="m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"
                        variants={chainVariants}
                        initial="normal"
                        animate={chainControls}
                    />

                    <motion.line
                        x1="8"
                        x2="8"
                        y1="2"
                        y2="5"
                        variants={bounceVariants}
                        initial="normal"
                        animate={topLineControls}
                    />

                    <motion.line
                        x1="2"
                        x2="5"
                        y1="8"
                        y2="8"
                        variants={sparksVariants}
                        initial="normal"
                        animate={sparksControls}
                    />

                    <motion.line
                        x1="16"
                        x2="16"
                        y1="19"
                        y2="22"
                        variants={bounceVariants}
                        initial="normal"
                        animate={bottomLineControls}
                    />

                    <motion.line
                        x1="19"
                        x2="22"
                        y1="16"
                        y2="16"
                        variants={sparksVariants}
                        initial="normal"
                        animate={sparksControls}
                    />
                </svg>
            </motion.div>
        );
    }
);

UnlinkIcon.displayName = "UnlinkIcon";
export { UnlinkIcon };