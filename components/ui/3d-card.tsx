"use client";

import { cn } from "@/lib/utils";
import React, {
	createContext,
	useState,
	useContext,
	useRef,
	useEffect,
	useCallback,
} from "react";

const MouseEnterContext = createContext<
	[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
	children,
	className,
	containerClassName,
}: {
	children?: React.ReactNode;
	className?: string;
	containerClassName?: string;
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isMouseEntered, setIsMouseEntered] = useState(false);
	const [isLargeScreen, setIsLargeScreen] = useState(true);

	// Check screen size on mount & resize
	useEffect(() => {
		const checkScreenSize = () => {
			setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint in Tailwind
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.style.transform = isLargeScreen
				? `rotateY(-9.5deg) rotateX(10.5deg)`
				: `rotateY(0deg) rotateX(0deg)`;
		}
	}, [isLargeScreen]);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current || !isLargeScreen) return;
		const { left, top, width, height } =
			containerRef.current.getBoundingClientRect();
		const x = (e.clientX - left - width / 2) / 25;
		const y = (e.clientY - top - height / 2) / 25;

		containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
	};

	const handleMouseEnter = () => {
		if (!isLargeScreen) return;
		setIsMouseEntered(true);
	};

	const handleMouseLeave = () => {
		if (!containerRef.current || !isLargeScreen) return;
		setIsMouseEntered(false);
		containerRef.current.style.transform = `rotateY(-9.5deg) rotateX(10.5deg)`;
	};

	return (
		<MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
			<div
				className={cn(
					"py-2 flex items-center justify-center",
					containerClassName
				)}
				style={{ perspective: "1000px" }}
			>
				<div
					ref={containerRef}
					onMouseEnter={handleMouseEnter}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					className={cn(
						"flex items-center justify-center relative transition-all duration-200 ease-linear",
						className
					)}
					style={{
						transformStyle: "preserve-3d",
						transform: isLargeScreen
							? "rotateY(-9.5deg) rotateX(10.5deg)"
							: "rotateY(0deg) rotateX(0deg)",
					}}
				>
					{children}
				</div>
			</div>
		</MouseEnterContext.Provider>
	);
};

export const CardBody = ({
	children,
	className,
	ref,
}: {
	children: React.ReactNode;
	className?: string;
	ref?: React.Ref<HTMLDivElement>;
}) => {
	return (
		<div
			ref={ref}
			className={cn(
				"h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
				className
			)}
		>
			{children}
		</div>
	);
};

export const CardItem = ({
	as: Tag = "div",
	children,
	className,
	translateX = 0,
	translateY = 0,
	translateZ = 0,
	rotateX = 0,
	rotateY = 0,
	rotateZ = 0,
	...rest
}: {
	as?: React.ElementType;
	children: React.ReactNode;
	className?: string;
	translateX?: number | string;
	translateY?: number | string;
	translateZ?: number | string;
	rotateX?: number | string;
	rotateY?: number | string;
	rotateZ?: number | string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isMouseEntered] = useMouseEnter();
	const [isLargeScreen, setIsLargeScreen] = useState(true);

	// Check screen size on mount & resize
	useEffect(() => {
		const checkScreenSize = () => {
			setIsLargeScreen(window.innerWidth >= 1024);
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	const handleAnimations = useCallback(() => {
		if (!ref.current) return;
		if (isLargeScreen && isMouseEntered) {
			ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
		} else {
			ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(80px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
		}
	}, [
		isLargeScreen,
		isMouseEntered,
		translateX,
		translateY,
		translateZ,
		rotateX,
		rotateY,
		rotateZ,
	]);

	useEffect(() => {
		handleAnimations();
	}, [handleAnimations]);

	return (
		<Tag
			ref={ref}
			className={cn("w-fit transition duration-200 ease-linear ", className)}
			style={{
				transform: isLargeScreen
					? "translateX(0px) translateY(0px) translateZ(80px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)"
					: "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
			}}
			{...rest}
		>
			{children}
		</Tag>
	);
};

// Create a hook to use the context
export const useMouseEnter = () => {
	const context = useContext(MouseEnterContext);
	if (context === undefined) {
		throw new Error("useMouseEnter must be used within a MouseEnterProvider");
	}
	return context;
};
