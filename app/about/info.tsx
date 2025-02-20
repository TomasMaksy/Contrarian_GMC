"use client";

import Image from "next/image";
import Card1 from "@/app/about/card1";
import Card2 from "@/app/about/card2";
import Card3 from "@/app/about/card3";
import Card4 from "@/app/about/card4";

import contrarian_logo from "@/app/assets/Contrarian_logo_white.png";
import bbva_logo from "@/app/assets/BBVA_logo_white.png";

import blob from "@/app/assets/blob.png";

import { ScrollShadow } from "@heroui/react";

export const Info = () => {
	return (
		<>
			<section className="md:pt-5 bg-[radial-gradient(ellipse_70%_150%_at_top,#3fafa8,black)] overflow-x-clip bg-opacity-70">
				<div className="text-center text-[clamp(40px,10vw,44px)] font-normal leading-[1.2] tracking-[-0.01em] sm:text-[64px]  flex flex-col justify-center align-middle">
					<div className=" z-10">
						<div className="text-2xl bg-clip-text text-white flex flex-col items-center z-10 mt-2 ">
							<p className="z-10 mb-5">Hosted by </p>
						</div>
					</div>
					<div className="flex flex-row mb-10 items-center justify-center md:px-46 z-10 md:gap-36 sm:gap-12">
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

			<section className="text-2xl bg-clip-text text-white flex flex-col items-center mb-5 pt-12">
				<p className="z-10 mb-5">About the Event </p>

				<p className="text-center font-normal sm:text-[18px] text-default-400 tracking-normal z-10 md:px-64 sm:px-12 pb-24">
					Growth Meets Capital is a networking rendezvous for the most
					influential growth investors and startups currently leading the
					climate charge. Hosted by our partners Contrarian Ventures and BBVA,
					this is your access to deal-making opportunities you won’t find
					anywhere else.
				</p>
			</section>

			<section className="flex justify-center flex-row gap-5 md:mx-24 sm:mx-4 mb-24 ">
				<Card1 />
				<Card2 />
				<Card3 />
				<Card4 />
			</section>
		</>
	);
};
