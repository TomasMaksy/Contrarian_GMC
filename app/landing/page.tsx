"use client";
import React from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";

import blob from "@/app/assets/blob.png";
import blob2 from "@/app/assets/blob2sm.png";

import Link from "next/link";

import { Image as HeroImage } from "@heroui/react";
import { Info } from "./info";
import ScrollingBanner from "./scrollingBanner";
import Participants from "../participants/components/hero";

export default function About() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleOpen = () => {
		onOpen();
	};

	return (
		<main className="dark  bg-black relative">
			{/* <Header /> */}
			<main className="bg-black flex flex-1 flex-col items-center overflow-hidden dark relative min-h-screen justify-center">
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
						<div className="bg-hero-section-title bg-clip-text bg-gradient-to-tr from-gray-300 to-[#ffffff] text-transparent sm:scale-90 md:scale-100 leading-[0.9]">
							Growth Meets Capital
						</div>
					</div>
					<p className="text-center font-normal leading-7 text-default-600 w-[480px] sm:w-[370px] sm:text-[18px]">
						Invite-only side event of Energy Tech Summit bringing leading growth
						investors and entrepreneurs together under one roof.
					</p>
					<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
						<Button
							className="h-10 w-[263px] bg-default-foreground px-[16px] py-[10px] text-small font-medium leading-5 text-background"
							radius="full"
							variant="shadow"
							onPress={handleOpen}
						>
							Request Invite
						</Button>

						{/* <Button
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
						</Button> */}
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

				<Image
					src={blob}
					alt="blob"
					className=" absolute bottom-28 right-2/3 w-[1200px] h-[1250px] z-0 opacity-65"
				/>

				<Image
					src={blob2}
					alt="blob"
					className="absolute left-1/3 -top-1/3 w-[2600px] h-[2000px] z-0 opacity-70 "
				/>
			</main>
			<ScrollingBanner />

			<Info />
			{/* <Footer /> */}
			<Participants />

			<Modal isOpen={isOpen} size="2xl" onClose={onClose} backdrop="blur">
				<ModalContent>
					<main id="schedule-template">
						<ModalHeader className="">
							<div className="flex flex-row gap-5 justify-between align-middle items-center w-full ">
								<h2 className="text-xl font-bold">FORM </h2>
								<div className="flex gap-4"></div>
							</div>
						</ModalHeader>
						<ModalBody>
							<iframe
								src="https://airtable.com/app2cbs31SmE8wf5V/shr6MGgNCgCgaiJgJ"
								width="100%"
								height="800px"
							></iframe>
						</ModalBody>
					</main>
				</ModalContent>
			</Modal>
		</main>
	);
}
