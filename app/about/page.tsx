"use client";

import { Header } from "@/app/components/Header";
import { Info } from "@/app/about/info";

import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";

import blob from "@/app/assets/blob.png";
import blob2 from "@/app/assets/blob2sm.png";

import Link from "next/link";
import Footer from "../components/Footer";

import { Image as HeroImage } from "@heroui/react";

export default function About() {
	return (
		<div className="overflow-hidden flex flex-col w-full">
			<Header />
			<main className="container flex flex-1 flex-col items-center overflow-hidden dark ">
				<section className="z-20 flex flex-col items-center justify-center -mt-12 gap-[18px] sm:gap-6 h-[calc(100vh-30px)] ">
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
						<div className="bg-hero-section-title bg-clip-text bg-gradient-to-b from-[#3fafa8] to-black text-transparent sm:scale-90 md:scale-100">
							Growth Meets Capital
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
						>
							See Participants
						</Button>
					</div>
					<section className="flex justify-center flex-row pt-24 flex-wrap ">
						<HeroImage
							isBlurred
							alt="HeroUI Album Cover"
							className="m-5 md:w-56 h-auto sm:w-36"
							src={"photos/GMC-07.jpeg"}
						/>
						<HeroImage
							isBlurred
							alt="HeroUI Album Cover"
							className="m-5 md:w-56 h-auto sm:w-36"
							src={"photos/GMC-03.jpeg"}
						/>
						<HeroImage
							isBlurred
							alt="HeroUI Album Cover"
							className="m-5 md:w-56 h-auto sm:w-36"
							src={"photos/GMC-10.jpeg"}
						/>
						<HeroImage
							isBlurred
							alt="HeroUI Album Cover"
							className="m-5 md:w-56 h-auto sm:w-36"
							src={"photos/GMC-05.jpeg"}
						/>
					</section>
				</section>
				<div className=" overflow-hidden">
					<div className="absolute top-20 left-2/3 w-full overflow-hidden">
						<Image
							src={blob}
							alt="blob"
							className="w-[800px] h-[750px] z-0 opacity-65"
						/>
					</div>
					<div className="absolute -top-2/4 md:-left-1/3 sm:-left-2/3 w-full overflow-hidden">
						<Image
							src={blob2}
							alt="blob"
							className="w-[1200px] h-[1800px] z-0 opacity-55"
						/>
					</div>
				</div>
			</main>

			<Info />
			<Footer />
		</div>
	);
}
