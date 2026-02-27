"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface PackageIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface PackageIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const CONTAINER_VARIANTS: Variants = {
	normal: {
		y: 0,
		scaleY: 1,
		scaleX: 1
	},
	animate: {
		y: [-8, 0, -3, 0],
		scaleY: [1, 0.85, 1.05, 1],
		scaleX: [1, 1.05, 0.95, 1],
		transition: {
			duration: 0.6,
			delay: 0.3,
			ease: "easeOut",
			times: [0, 0.4, 0.7, 1],
		},
	},
};

const PATH_VARIANTS: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.4,
			delay: custom * 0.15,
			ease: "easeInOut",
		},
	}),
};

const PackageIcon = forwardRef<PackageIconHandle, PackageIconProps>(
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
				<motion.svg
					animate={controls}
					fill="none"
					height={size}
					initial="normal"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					variants={CONTAINER_VARIANTS}
					viewBox="0 0 24 24"
					width={size}
					xmlns="http://www.w3.org/2000/svg"
				>
					<motion.path
						custom={0}
						d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
						variants={PATH_VARIANTS}
					/>
					<motion.path
						custom={1}
						d="m3.3 7 8.7 5 8.7-5"
						variants={PATH_VARIANTS}
					/>
					<motion.path
						custom={2}
						d="M12 22V12"
						variants={PATH_VARIANTS}
					/>
					<motion.path
						custom={3}
						d="m7.5 4.27 9 5.15"
						variants={PATH_VARIANTS}
					/>
				</motion.svg>
			</div>
		);
	}
);

PackageIcon.displayName = "PackageIcon";

export { PackageIcon };