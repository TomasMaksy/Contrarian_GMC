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
			className="group relative w-[420px] bg-transparent shadow-large"
			radius="lg"
			onMouseMove={onMouseMove}
		>
			<LazyMotion features={domAnimation}>
				<m.div
					className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-250 group-hover:opacity-100"
					style={{
						background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(10, 109, 173, 0),
              transparent 80%
            )
          `, // <- Add your own color here
					}}
				/>
			</LazyMotion>

			<CardBody className="pt-4 flex flex-col items-center align-middle text-center justify-center py-4 gap-4 p-4">
				<p className="lg:text-3xl sm:text-3xl text-neutral-50 font-extrabold text-wrap">
					Day activities
				</p>
				<p className="align-middle font-black lg:text-lg sm:text-sm text-neutral-400 tracking-wider pt-2 text-center">
					When:
					<span className="font-normal tracking-normal">
						<br /> Day 1 (April 9) 9:30 AM to 6 PM{" "}
					</span>
					<br />
					<br />
					Where:
					<span className="font-normal tracking-normal">
						<br /> Euskalduna Conference Centre
					</span>
				</p>
			</CardBody>
		</Card>
	);
}
