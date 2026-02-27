"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface AlertTriangleIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AlertTriangleIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const CONTAINER_VARIANTS: Variants = {
	normal: {
		rotate: 0,
		scale: 1
	},
	animate: {
		rotate: [0, -8, 8, -8, 8, 0],
		scale: [1, 1.1, 1],
		transition: {
			duration: 0.5,
			delay: 0.6,
			ease: "easeInOut",
		},
	},
};

const TRIANGLE_VARIANTS: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.4,
			ease: "easeOut",
		},
	},
};

const EXCLAMATION_LINE_VARIANTS: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.3,
			delay: 0.3,
			ease: "easeOut",
		},
	},
};

const EXCLAMATION_DOT_VARIANTS: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.2,
			delay: 0.5,
			ease: "easeOut",
		},
	},
};

const AlertTriangleIcon = forwardRef<AlertTriangleIconHandle, AlertTriangleIconProps>(
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
						d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
						variants={TRIANGLE_VARIANTS}
					/>
					<motion.path
						d="M12 9v4"
						variants={EXCLAMATION_LINE_VARIANTS}
					/>
					<motion.path
						d="M12 17h.01"
						variants={EXCLAMATION_DOT_VARIANTS}
					/>
				</motion.svg>
			</div>
		);
	}
);

AlertTriangleIcon.displayName = "AlertTriangleIcon";

export { AlertTriangleIcon };