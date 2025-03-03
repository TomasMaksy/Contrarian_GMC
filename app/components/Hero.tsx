"use client";

import { ArrowRight } from "lucide-react";
import { easeInOut, motion } from "framer-motion";

import { Info } from "@/app/about/info";

import Image from "next/image";
import blob from "@/app/assets/blob.png";
import blob2sm from "@/app/assets/blob2sm.png";
import blob2 from "@/app/assets/blob2.png";
import Contrarian_logo_white from "@/app/assets/Contrarian_logo_white.png";
import BBVA_logo_white from "@/app/assets/BBVA_logo_white.png";

import ScrollingBanner from "./scrolling-banner";
import Link from "next/link";

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
		<>
			<section className="pt-8  md:pt-5 md:pb-12 bg-[radial-gradient(ellipse_120%_80%_at_bottom_left,#3fafa8,black)] overflow-x-clip flex flex-col items-center justify-between">
				<div className="container relative mt-28 md:mb-72 sm:mb-24">
					<div className="md:flex items-center pb-5">
						<div className="md:w-[478px]">
							<div className="text-sm inline-flex border border-[#fff]/25 px-3 py-1 rounded-lg -tracking-tight text-white/50">
								Plan your meetings
							</div>
							<h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-[#3fafa8] to-[#ffffff] text-transparent bg-clip-text mt-6">
								Growth Meets Capital
							</h1>
							<p className="text-xl text-default-500 tracking-tight mt-6">
								Connect with the right people and maximize your meetings. Share
								your top preferences, and let our smart algorithm match you with
								the most relevant startups or investors.{" "}
							</p>

							<div className="flex gap-10 items-center mt-[40px] ">
								<Link href="/fillout">
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
								</Link>
								<Link href={"/participants"}>
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
											See participants
										</span>
										<ArrowRight className="h-5 w-5 ease absolute right-4 translate-x-full scale-x-50 opacity-0 blur-sm transition duration-300 group-hover:translate-x-0 group-hover:scale-x-100 group-hover:opacity-100 group-hover:blur-none" />
									</button>
								</Link>
							</div>
						</div>

						<motion.img
							src={blob2.src}
							alt="img"
							className="md:block md:absolute md:h-[1000px] md:w-auto md:max-w-none md:left-80 lg:left-[700px] hidden hover:opacity-65 duration-300"
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
				<div className="pb-10 bg-black md:m-10">
					<section className=" w-screen left-0 right-0 bottom-10 pt-10 pb-1">
						<ScrollingBanner shouldPauseOnHover gap="80px">
							{Array.from(
								{ length: 40 },
								(_, i) => logos[i % logos.length]
							).map(({ key, logo }, index) => (
								<div
									key={`${key}-${index}`}
									className="flex items-center justify-center text-foreground"
									style={{ minWidth: "130px" }}
								>
									<Image src={logo} alt={key} />
								</div>
							))}
						</ScrollingBanner>
					</section>
				</div>
			</section>
			<Info />
		</>
	);
};
