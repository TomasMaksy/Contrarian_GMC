"use client";

import type { CardProps } from "@heroui/react";

import React from "react";
import { Card, CardBody, Image, CardHeader } from "@heroui/react";
import {
	m,
	useMotionValue,
	domAnimation,
	LazyMotion,
	useMotionTemplate,
} from "framer-motion";

export default function Card1(props: CardProps) {
	let mouseX = useMotionValue(0);
	let mouseY = useMotionValue(0);

	const cardRef = React.useRef<HTMLDivElement>(null);

	function onMouseMove({
		clientX,
		clientY,
	}: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		if (!cardRef?.current) return;

		let { left, top } = cardRef.current?.getBoundingClientRect();

		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	return (
		<Card
			{...props}
			ref={cardRef}
			className="group relative w-[420px] bg-neutral-900 shadow-large"
			radius="lg"
			onMouseMove={onMouseMove}
		>
			<LazyMotion features={domAnimation}>
				<m.div
					className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-250 group-hover:opacity-100"
					style={{
						background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(56, 189, 158, 0.2),
              transparent 80%
            )
          `, // <- Add your own color here
					}}
				/>
			</LazyMotion>

			<CardBody className="pt-4 flex flex-col items-center align-middle text-center justify-between py-4">
				<p className="lg:text-7xl sm:text-5xl text-neutral-50 font-extrabold">
					50
				</p>
				<p className="align-middle font-medium lg:text-xl sm:text-sm text-neutral-400">
					SERIES A+ STAGE STARTUPS
				</p>
			</CardBody>
		</Card>
	);
}
