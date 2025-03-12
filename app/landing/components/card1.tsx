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
			<CardBody className="pt-4 flex flex-col items-center align-middle text-center justify-top gap-2 p-4 scrollbar-hide">
				<p className="lg:text-7xl sm:text-3xl text-neutral-50 font-extrabold">
					1
				</p>
				<p className="align-middle font-normal lg:text-xl sm:text-xs text-neutral-400 tracking-normal">
					DEDICATED AREA{" "}
				</p>
			</CardBody>
		</Card>
	);
}
