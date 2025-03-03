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

import contrarian_logo from "@/app/assets/Contrarian_logo_white.png";
import bbva_logo from "@/app/assets/BBVA_logo_white.png";

export default function About() {
	return (
		<main className="dark h-screen overflow-y-auto bg-black relative overflow-hidden">
			<Header />
			<main className="flex flex-1 flex-col items-center overflow-hidden dark relative">
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
							variant="shadow"
						>
							Request Invite
						</Button>
						<Link href={"/participants"}>
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
						</Link>
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
			<section className="md:pt-5 bg-[radial-gradient(ellipse_70%_150%_at_top,#3fafa8,black)] overflow-x-clip bg-opacity-70">
				<div className="text-center text-[clamp(40px,10vw,44px)] font-normal leading-[1.2] tracking-[-0.01em] sm:text-[64px]  flex flex-col justify-center align-middle">
					<div className=" z-10">
						<div className="text-2xl bg-clip-text text-white flex flex-col items-center z-10 mt-2 ">
							<p className="z-10 mb-5">Hosted by </p>
						</div>
					</div>
					<div className="flex flex-row mb-16 items-center justify-center md:px-46 z-10 md:gap-36 sm:gap-12">
						<Image
							src={contrarian_logo}
							alt="Contrarian Ventures Logo"
							className="md:h-16 w-auto sm:h-12 z-10"
						/>
						<Image
							src={bbva_logo}
							alt="BBVA Logo"
							className="md:h-16 w-auto sm:h-12 z-10"
						/>
					</div>
				</div>
			</section>

			<Info />
			<Footer />
		</main>
	);
}
