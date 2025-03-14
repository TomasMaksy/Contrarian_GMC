"use client";
import React from "react";
import {
	Button,
	// Divider,
	// Image,
	Modal,
	ModalContent,
	useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import blob from "@/app/assets/blob.png";
import blob2 from "@/app/assets/blob2sm.png";

import Link from "next/link";

import { Image as HeroImage } from "@heroui/react";
// import { Info } from "./info";
import ScrollingBanner2 from "../components/scrolling-banner";
// import ScrollingBanner from "./scrollingBanner";
// import Participants from "../participants/components/hero";
import WaitlistForm from "./waitlist-form";

import { motion, useScroll, useTransform } from "framer-motion";

const imageSources = [
	"photos/GMC-07.jpeg",
	"photos/GMC-03.jpeg",
	"photos/GMC-10.jpeg",
	"photos/GMC-05.jpeg",
	"photos/GMC-02.jpeg",
	"photos/GMC-01.jpeg",
	"photos/GMC-06.jpeg",
	"photos/GMC-08.jpeg",
	"photos/GMC-09.jpeg",
	"photos/GMC-07.jpeg",
	"photos/GMC-03.jpeg",
	"photos/GMC-10.jpeg",
	"photos/GMC-05.jpeg",
	"photos/GMC-02.jpeg",
	"photos/GMC-01.jpeg",
];

import Card1 from "@/app/landing/components/card1";
import Card2 from "@/app/landing/components/card2";
import Card3 from "@/app/landing/components/card3";
import Card4 from "@/app/landing/components/card4";
import Card5t from "@/app/landing/components/card5t1";
import Card6t from "@/app/landing/components/card6t1";

export default function About() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleOpen = () => {
		// Disable scrolling on the parent
		document.body.style.overflow = "hidden";
		onOpen();
	};

	const handleClose = () => {
		// Enable scrolling on the parent again
		document.body.style.overflow = "";
		onClose();
	};

	const { scrollYProgress } = useScroll();

	const translateY = useTransform(scrollYProgress, [0, 1], [-900, 100]);
	const translateY2 = useTransform(scrollYProgress, [0, 1], [-600, -300]);
	const translateY3 = useTransform(scrollYProgress, [0, 1], [-100, -600]);

	return (
		<main className="dark bg-black scrollbar-hide overflow-hidden relative">
			<main className="bg-black flex flex-1 flex-col items-center overflow-hidden dark relative  justify-between sm:pt-12 h-full">
				<section className="z-20 flex flex-col items-center justify-center gap-[18px] sm:gap-6 h-max py- md:pb-12 md:scale-100 sm:scale-90">
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
						<div className="bg-hero-section-title bg-clip-text bg-gradient-to-tl from-gray-500 to-[#ffffff] text-transparent sm:scale-90 md:scale-100 leading-[0.9]">
							What is Growth Meets Capital?
						</div>
					</div>
					<p className="text-center font-normal leading-7 text-default-600 w-[480px] sm:w-[370px] sm:text-[18px]">
						Invite-only side event of Energy Tech Summit bringing leading growth
						investors and entrepreneurs together under one roof.
					</p>
					<div className=" mb-24 flex flex-col items-center justify-center gap-6 sm:flex-row">
						<Button
							className="md:h-12 md:w-[263px] sm:h-10 sm:w-[200] bg-default-foreground px-[16px] py-[10px] md:text-medium sm:text-tiny font-bold leading-5 text-background"
							radius="full"
							variant="shadow"
							onPress={handleOpen}
						>
							JOIN THE WAITLIST
						</Button>
					</div>
				</section>
				<section className=" flex-wrap z-40 pb-24">
					<div className="w-full max-w-screen-lg overflow-hidden">
						<ScrollingBanner2
							isReverse={false}
							isVertical={false}
							duration={150}
							gap="1rem"
							showShadow
						>
							{imageSources.map((src, index) => (
								<div
									key={index}
									className="md:w-60 sm:w-36 h-auto flex-shrink-0"
								>
									<HeroImage className="w-full h-auto" src={src} />
								</div>
							))}
						</ScrollingBanner2>
					</div>
				</section>
			</main>
			<main className="dark relative overflow-hidden flex flex-col gap-12 z-40 items-center">
				<section className="text-2xl bg-clip-text text-white flex flex-col items-center mb-5 pt-24 tracking-tight">
					<p className="z-10 mb-5 font-semibold">About the Event </p>

					<p className="text-center font-normal sm:text-[18px] text-default-600 tracking-normal z-10 md:px-64 sm:px-12  max-w-screen-lg ">
						Growth Meets Capital is a networking rendezvous for the most
						influential growth investors and startups currently leading the
						climate charge. Hosted by Contrarian Ventures and BBVA, this is your
						access to deal-making opportunities you won’t find anywhere else.
					</p>
				</section>

				<section className="flex justify-center flex-row md:gap-5 sm:gap-1 max-w-screen-lg sm:mb-12 md:mb-24 w-full ">
					<Card1 />
					<Card2 />
					<Card3 />
					<Card4 />
				</section>

				<div className="text-center w-full font-normal leading-[1.2] tracking-[-0.01em] sm:text-[64px] flex flex-col justify-center align-middle pt-12 pb-32 items-center gap-6">
					{/* <Divider className="bg-default-500 w-[800px]" /> */}
					<div className="flex justify-center flex-row md:gap-5 sm:gap-1 max-w-screen-md w-full">
						<Card5t />
						<Card6t />
					</div>
					{/* <Divider className="bg-default-500 w-[800px]" /> */}
				</div>
			</main>
			<motion.img
				src={blob.src}
				alt="blob green"
				width={1200}
				className=" block absolute  md:top-[800px] sm:top-[900px] md:right-[1000px] sm:-right-[200px] sm:opacity-55 md:opacity-100 z-10"
				style={{ translateY: translateY }}
			/>

			<motion.img
				src={blob2.src}
				alt="blob blue"
				width={1500}
				className="block absolute md:top-[700px] md:-right-[800px] sm:top-[1500px] sm:right-[200px]"
				style={{ translateY: translateY2 }}
			/>
			<motion.img
				src={blob2.src}
				alt="blob blue"
				width={1400}
				className="md:block md:absolute md:top-[1800px] md:right-[600px] z-0 sm:hidden opacity-30"
				style={{ translateY: translateY3 }}
			/>

			{/* <ScrollingBanner /> */}

			{/* <Info /> */}
			{/* <Footer /> */}
			{/* <Participants startups={[]} investors={[]} isDrawer={false} /> */}
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				backdrop="blur"
				size="xl"
				scrollBehavior="outside"
				placement="bottom"
			>
				<ModalContent className="h-auto overflow-y-auto">
					<WaitlistForm onClose={handleClose} />
				</ModalContent>
			</Modal>
		</main>
	);
}
