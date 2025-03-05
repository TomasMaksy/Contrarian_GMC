"use client";

import Card1 from "@/app/about/card1";
import Card2 from "@/app/about/card2";
import Card3 from "@/app/about/card3";
import Card4 from "@/app/about/card4";
import Card5t from "@/app/about/card5t1";
import Card6t from "@/app/about/card6t1";

export const Info = () => {
	return (
		<main className="dark relative overflow-hidden ">
			<section className="text-2xl bg-clip-text text-white flex flex-col items-center mb-5 pt-12 tracking-tight">
				<p className="z-10 mb-5">About the Event </p>

				<p className="text-center font-normal sm:text-[18px] text-default-500 tracking-normal z-10 md:px-64 sm:px-12 pb-24">
					Growth Meets Capital is a networking rendezvous for the most
					influential growth investors and startups currently leading the
					climate charge. Hosted by our partners Contrarian Ventures and BBVA,
					this is your access to deal-making opportunities you won’t find
					anywhere else.
				</p>
			</section>

			<section className="flex justify-center flex-row md:gap-5 sm:gap-1 md:mx-24 sm:mx-4 mb-24 ">
				<Card1 />
				<Card2 />
				<Card3 />
				<Card4 />
			</section>

			<section className="md:pt-20 bg-[radial-gradient(ellipse_60%_900%_at_left,rgba(10,109,173,0.6),black)]  overflow-x-clip">
				<div className="text-center text-[clamp(40px,10vw,44px)] font-normal leading-[1.2] tracking-[-0.01em] sm:text-[64px]  flex flex-col justify-center align-middle">
					<div className=" z-10">
						<div className="text-2xl bg-clip-text text-white flex flex-col items-center z-10 mt-2 "></div>
					</div>
					<div className="flex justify-center flex-row gap-5 md:mx-24 sm:mx-4 mb-24 ">
						<Card5t />
						<Card6t />
					</div>
				</div>
			</section>
		</main>
	);
};
