"use client";

import type { CardProps } from "@heroui/react";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { useMotionValue } from "framer-motion";

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
			className="group relative w-full bg-transparent shadow-none border-none"
			radius="lg"
			onMouseMove={onMouseMove}
		>
			<CardBody className="pt-4 flex flex-col items-center align-top text-center justify-start py-4 gap-4 p-4">
				<p className="lg:text-3xl sm:text-xl text-neutral-50 font-extrabold">
					Evening dinner
				</p>
				<p className="align-middle font-black lg:text-lg sm:text-sm text-neutral-400 tracking-tight pt-2">
					When: <br />{" "}
					<span className="font-normal tracking-normal ">
						Day 1 (April 9) 8 PM to 10 PM{" "}
					</span>
					<br />
					<br />
					Where: <br />
					<span className="font-normal tracking-normal">TBC </span>
				</p>
			</CardBody>
		</Card>
	);
}
