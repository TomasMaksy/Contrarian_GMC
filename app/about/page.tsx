"use client";
import React from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import blob from "@/app/assets/blob.png";
import blob2 from "@/app/assets/blob2sm.png";

import Link from "next/link";

import { Image as HeroImage } from "@heroui/react";
import { Info } from "./info";
import WaitlistForm from "../landing/waitlist-form";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleOpen = () => {
		onOpen();
	};

	const { scrollYProgress } = useScroll();
	const translateY = useTransform(scrollYProgress, [0, 1], [-1800, -500]);
	const translateY2 = useTransform(scrollYProgress, [0, 1], [-2000, -200]);

	return (
		<main className="dark h-max bg-black relative">
			{/* <Header /> */}
			<main className="bg-black flex flex-1 flex-col items-center overflow-hidden dark relative py-5">
				<section className="z-20 flex flex-col items-center justify-center  gap-[18px] sm:gap-6 h-max py-24 ">
					<Link
						href={"https://energytechsummit.com/"}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button
							className="h-9 overflow-hidden border-1 border-default-100 bg-default-50 px-[18px] py-2 text-small font-normal leading-5 text-default-500"
							endContent={
								<Icon
									className="flex-none outline-none [&>path]:stroke-[2]"
									icon="solar:arrow-right-linear"
									width={20}
								/>
							}
							radius="full"
							variant="bordered"
						>
							Energy Tech Summit
						</Button>
					</Link>
					<div className="text-center font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
						<div className="bg-hero-section-title bg-clip-text bg-gradient-to-tr from-gray-300 to-[#ffffff] text-transparent sm:scale-90 md:scale-100 leading-[0.9] text-5xl">
							What is Growth Meets Capital?
						</div>
					</div>
					<p className="text-center font-normal leading-7 text-default-500 w-[480px] sm:w-[370px] sm:text-[18px]">
						Invite-only side event of Energy Tech Summit bringing leading growth
						investors and entrepreneurs together under one roof.
					</p>
					<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
						<Button
							className="h-10 w-[163px] bg-default-foreground px-[16px] py-[10px] text-small font-medium leading-5 text-background"
							radius="full"
							variant="shadow"
							onPress={handleOpen}
						>
							Request Invite
						</Button>

						<Button
							className="h-10 w-[163px] border-1 border-default-100 px-[16px] py-[10px] text-small font-medium leading-5"
							endContent={
								<span className="pointer-events-none flex h-[22px] w-[22px] items-center justify-center rounded-full bg-default-100">
									<Icon
										className="text-default-500 [&>path]:stroke-[1.5]"
										icon="solar:arrow-right-linear"
										width={16}
									/>
								</span>
							}
							radius="full"
							variant="bordered"
							onPress={() => {
								window.location.href = "/participants"; // This opens in a new tab
							}}
						>
							See Participants
						</Button>
					</div>
					<section className="flex justify-center flex-row pt-24 flex-wrap ">
						<HeroImage
							isBlurred
							className="m-5 md:w-56 h-auto sm:w-36"
							src={"photos/GMC-07.jpeg"}
						/>
						<HeroImage
							isBlurred
							className="m-5 md:w-56 h-auto sm:w-36"
							src={"photos/GMC-03.jpeg"}
						/>
						<HeroImage
							isBlurred
							className="m-5 md:w-56 h-auto sm:w-36"
							src={"photos/GMC-10.jpeg"}
						/>
						<HeroImage
							isBlurred
							className="m-5 md:w-56 h-auto sm:w-36"
							src={"photos/GMC-05.jpeg"}
						/>
					</section>
				</section>

				<motion.img
					src={blob.src}
					alt="blob green"
					width={800}
					height={800}
					className=" block absolute -left-[300] sm:-bottom-[900] md:top-[1000] sm:opacity-55 md:opacity-100"
					style={{ translateY: translateY }}
				/>

				<motion.img
					src={blob2.src}
					alt="blob blue"
					width={2300}
					height={2300}
					className="hidden md:block md:absolute md:top-[900px] md:-right-[800px]"
					style={{ translateY: translateY2 }}
				/>
			</main>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				backdrop="blur"
				size="lg"
				placement="center"
				scrollBehavior="outside"
			>
				<ModalContent>
					<main>
						<ModalBody>
							{" "}
							<WaitlistForm onClose={onClose} />
						</ModalBody>
					</main>
				</ModalContent>
			</Modal>

			<Info />
			{/* <Footer /> */}
		</main>
	);
}
