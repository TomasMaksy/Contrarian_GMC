"use client";

import Card1 from "@/app/landing/components/card1";
import Card2 from "@/app/landing/components/card2";
import Card3 from "@/app/landing/components/card3";
import Card4 from "@/app/landing/components/card4";
import Card5t from "@/app/landing/components/card5t1";
import Card6t from "@/app/landing/components/card6t1";
import { motion, useScroll, useTransform } from "framer-motion";
import blob2 from "@/app/assets/blob2sm.png";

export const Info = () => {
	const { scrollYProgress } = useScroll();

	const translateY = useTransform(scrollYProgress, [0, 1], [-2000, -1100]);

	return (
		<main className="dark relative overflow-hidden flex flex-col gap-12">
			<section className="text-2xl bg-clip-text text-white flex flex-col items-center mb-5 pt-24 tracking-tight">
				<p className="z-10 mb-5 font-semibold">About the Event </p>

				<p className="text-center font-normal sm:text-[18px] text-default-600 tracking-normal z-10 md:px-64 sm:px-12  max-w-screen-lg ">
					Growth Meets Capital is a networking rendezvous for the most
					influential growth investors and startups currently leading the
					climate charge. Hosted by Contrarian Ventures and BBVA, this is your
					access to deal-making opportunities you won’t find anywhere else.
				</p>
			</section>

			<section className="flex justify-center flex-row md:gap-5 sm:gap-1 md:mx-40 sm:mx-4 mb-24 ">
				<Card1 />
				<Card2 />
				<Card3 />
				<Card4 />
			</section>

			<section className=" relative py-36 overflow-hidden">
				<div className="text-center text-[clamp(40px,10vw,44px)] font-normal leading-[1.2] tracking-[-0.01em] sm:text-[64px]  flex flex-col justify-center align-middle">
					<div className="flex justify-center flex-row gap-5 md:mx-24 sm:mx-4">
						<Card5t />
						<Card6t />
					</div>
					<motion.img
						src={blob2.src}
						alt="blob blue"
						width={1400}
						className="hidden md:block md:absolute md:top-[900px] md:right-[900px]"
						style={{ translateY: translateY }}
					/>
				</div>
			</section>
		</main>
	);
};
