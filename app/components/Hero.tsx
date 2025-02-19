"use client";

import { ArrowRight } from "lucide-react";
import { easeInOut, motion, useScroll, useTransform } from "framer-motion";

import Image from "next/image";
import blob from "@/app/assets/blob.png";
import blob2sm from "@/app/assets/blob2sm.png";
import blob2 from "@/app/assets/blob2.png";
import Contrarian_logo_white from "@/app/assets/Contrarian_logo_white.png";
import BBVA_logo_white from "@/app/assets/BBVA_logo_white.png";

import { useRef } from "react";

import ScrollingBanner from "./scrolling-banner";

const logos = [
	{
		key: "logo-1",
		logo: Contrarian_logo_white,
	},
	{
		key: "logo-2",
		logo: BBVA_logo_white,
	},
];

export const Hero = () => {
	// Scroll function
	const scrollToAnalysis = () => {
		const analysisSection = document.getElementById("analysis-section");
		if (analysisSection) {
			const yOffset = -140; // Leave 50px above
			const yPosition =
				analysisSection.getBoundingClientRect().top + window.scrollY + yOffset;
			window.scrollTo({ top: yPosition, behavior: "smooth" });
		}
	};

	return (
		<section className="pt-8 pb-10 md:pt-5 md:pb-48 bg-[radial-gradient(ellipse_120%_105%_at_bottom_left,#3fafa8,black)] overflow-x-clip">
			<div className="container relative mt-44 mb-80">
				<div className="md:flex items-center pb-5">
					<div className="md:w-[478px]">
						<div className="text-sm inline-flex border border-[#fff]/25 px-3 py-1 rounded-lg -tracking-tight text-white/50">
							Testing in progress
						</div>
						<h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-[#3fafa8] to-white text-transparent bg-clip-text mt-6">
							Growth Meets Capital Demo
						</h1>
						<p className="text-xl text-white tracking-tight mt-6">
							This is a place where investors and and startups can fill out the
							forms
						</p>

						<div className="flex gap-10 items-center mt-[80px] ">
							<button
								onClick={scrollToAnalysis}
								className="px-8 pr-12 custom-btn custom-btn-primary relative flex items-center justify-between group hover:bg-[#151515] duration-300 "
							>
								<Image
									src={blob}
									alt="OpenAI logo"
									className="h-7 w-7 ease absolute left-[17px] translate-x-0 opacity-100 transition duration-300 group-hover:-translate-x-full group-hover:scale-x-50 group-hover:opacity-0 group-hover:blur-sm"
								/>
								<span className="ease translate-x-6 transition duration-300 group-hover:-translate-x-1">
									Fill out the form
								</span>
								<ArrowRight className="h-5 w-5 ease absolute right-4 translate-x-full scale-x-50 opacity-0 blur-sm transition duration-300 group-hover:translate-x-0 group-hover:scale-x-100 group-hover:opacity-100 group-hover:blur-none" />
							</button>
							<button
								onClick={scrollToAnalysis}
								className="px-8 custom-btn custom-btn-text relative flex items-center justify-between group duration-200"
							>
								<Image
									src={blob2sm}
									alt="OpenAI logo"
									className="h-7 w-7 ease absolute left-[8px] translate-x-0 opacity-100 transition duration-300 group-hover:-translate-x-full group-hover:scale-x-50 group-hover:opacity-0 group-hover:blur-sm"
								/>
								<span className="ease translate-x-3 transition duration-300 group-hover:-translate-x-4">
									Discover participants
								</span>
								<ArrowRight className="h-5 w-5 ease absolute right-4 translate-x-full scale-x-50 opacity-0 blur-sm transition duration-300 group-hover:translate-x-0 group-hover:scale-x-100 group-hover:opacity-100 group-hover:blur-none" />
							</button>
						</div>
					</div>

					<motion.img
						src={blob2.src}
						alt="img"
						className="md:block md:absolute md:h-[1000px] md:w-auto md:max-w-none md:-left-80 lg:left-[700px] hidden hover:opacity-65 duration-300"
						animate={{ translateY: [-100, -280] }}
						transition={{
							repeat: Infinity,
							repeatType: "mirror",
							duration: 3,
							ease: easeInOut,
						}}
					/>
				</div>
			</div>
			<div className="pb-10 bg-black">
				<section className=" w-screen left-0 right-0 bottom-10 mt-36 pt-16 pb-8">
					<ScrollingBanner shouldPauseOnHover gap="80px">
						{Array.from({ length: 20 }, (_, i) => logos[i % logos.length]).map(
							({ key, logo }, index) => (
								<div
									key={`${key}-${index}`}
									className="flex items-center justify-center text-foreground"
									style={{ minWidth: "200px" }}
								>
									<Image src={logo} alt={key} />
								</div>
							)
						)}
					</ScrollingBanner>
				</section>
			</div>
		</section>
	);
};
