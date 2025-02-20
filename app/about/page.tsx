"use client";

import { Header } from "@/app/components/Header";

import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";

import blob from "@/app/assets/blob.png";

export default function About() {
	return (
		<div className="overflow-hidden flex flex-col h-dvh w-full">
			<Header />
			<main className="container flex flex-1 flex-col items-center justify-center overflow-hidden px-8 dark">
				<section className="z-20 flex flex-col items-center justify-center gap-[18px] sm:gap-6">
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
						New onboarding experience
					</Button>
					<div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
						<div className="bg-hero-section-title bg-clip-text bg-gradient-to-b from-[#3fafa8] to-black text-transparent ">
							Growth Meets Capital.
						</div>
					</div>
					<p className="text-center font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px]">
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
					<div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px] mt-64">
						<div className="text-4xl bg-clip-text text-white ">
							About the Event{" "}
						</div>
					</div>
				</section>
				<div className="pointer-events-none absolute inset-0 top-[-25%] z-10 scale-150 select-none sm:scale-125"></div>
				<div className="absolute top-[50%] z-0">
					<Image src={blob} alt="blob" />
				</div>
			</main>
		</div>
	);
}
