"use client";

import type { CardProps } from "@heroui/react";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import {
	m,
	useMotionValue,
	domAnimation,
	LazyMotion,
	useMotionTemplate,
} from "framer-motion";

export default function Card1(props: CardProps) {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const cardRef = React.useRef<HTMLDivElement>(null);

	function onMouseMove({
		clientX,
		clientY,
	}: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		if (!cardRef?.current) return;

		const { left, top } = cardRef.current?.getBoundingClientRect();

		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	return (
		<Card
			{...props}
			ref={cardRef}
			className="group relative w-[420px] bg-black-900 shadow-large"
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
              rgba(56, 189, 158, 0),
              transparent 80%
            )
          `, // <- Add your own color here
					}}
				/>
			</LazyMotion>

			<CardBody className="pt-4 flex flex-col items-center align-middle text-center justify-top gap-2 p-4 scrollbar-hide">
				<p className="lg:text-7xl sm:text-3xl text-neutral-50 font-extrabold">
					10
				</p>
				<p className="align-middle font-normal lg:text-xl sm:text-xs text-neutral-400 tracking-normal">
					MEETINGS{" "}
				</p>
			</CardBody>
		</Card>
	);
}
