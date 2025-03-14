"use client";

import { ArrowRight } from "lucide-react";
import { easeInOut, motion, useScroll, useTransform } from "framer-motion";
import blob from "@/app/assets/blob.png";
import blob2sm from "@/app/assets/blob2sm.png";
import blob2 from "@/app/assets/blob2.png";

// import ScrollingBanner from "@/app/about/scrollingBanner";
import Link from "next/link";
// import About from "../about/page";

import contrarian_white from "@/app/assets/Contrarian_logo_white.png";
import bbva_white from "@/app/assets/BBVA_logo_white.png";

import { Image } from "@heroui/react";
import NImage from "next/image";
export const Hero = () => {
	const { scrollYProgress } = useScroll();
	const translateY = useTransform(scrollYProgress, [0, 1], [15, -1000]);

	return (
		<>
			<section className="min-h-screen w-full pt-8 bg-[radial-gradient(ellipse_120%_90%_at_top_left,#3fafa8,black)] overflow-x-clip flex flex-col items-center justify-center z-0">
				<div className="container relative">
					<div className="flex items-center pb-5 lg:flex-row sm:flex-col justify-between sm:mt-12 md:scale-100 sm:scale-90">
						<div className="md:w-[478px] ">
							<div className=" text-sm inline-flex border border-[#fff]/25 px-3 py-1 rounded-lg -tracking-tight text-white/50 w-max ">
								Plan your meetings
							</div>
							<h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-br from-[#ffffff] to-gray-500 text-transparent bg-clip-text mt-6">
								Growth Meets Capital
							</h1>
							<p className="text-xl text-default-600 tracking-tight mt-6">
								Connect with the right people and maximize your meetings. Share
								your top preferences, and let our smart algorithm match you with
								the most relevant startups or investors.{" "}
							</p>

							<div className="flex gap-10 items-center mt-[40px] ">
								<Link href="/fillout">
									<button className="px-8 pr-12 custom-btn custom-btn-primary relative flex items-center justify-between group hover:bg-[#151515] duration-300 ">
										<NImage
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
									<button className="px-8 custom-btn custom-btn-text relative flex items-center justify-between group duration-200">
										<NImage
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
						<div className="lg:hidden sm:scale-75 md:scale-100 mt-12">
							<div className="text-sm rounded-lg -tracking-tight text-white/50 mb-4 w-full text-start ml-2">
								Powered by
							</div>
							<div className="w-max flex flex-row items-center -mr-1 backdrop-blur-2xl shadow-2xl duration-300 z-50 border border-[#fff]/25 px-5 py-6 rounded-lg ">
								<a
									href="https://www.cventures.vc/"
									target="_blank"
									rel="noopener noreferrer"
									className="block "
								>
									<Image
										src={contrarian_white.src}
										alt="Contrarian Ventures"
										className="-ml-2 z-50 mt-2 "
										width={250}
										isBlurred
									/>
								</a>

								<a
									href="https://www.bbva.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="block"
								>
									<Image
										src={bbva_white.src}
										alt="Contrarian Ventures"
										width={200}
										isBlurred
										className=""
									/>
								</a>
							</div>
						</div>
						<motion.div
							className="items-center flex flex-col justify-center lg:scale-100 md:scale-60 z-50 sm:mt-12 lg:-mt-24 sm:hidden lg:block"
							style={{ translateY: translateY }}
						>
							<div className="shadow-2xl">
								<div className="text-sm rounded-lg -tracking-tight text-white/50 mb-4 w-full text-start ml-2">
									Powered by
								</div>
								<div className="w-max flex flex-col items-center -mr-1 relative backdrop-blur-3xl shadow-2xl  h-full opacity-75 hover:opacity-100 duration-300 z-50 border border-[#fff]/25 px-5 py-6 rounded-lg ">
									<a
										href="https://www.cventures.vc/"
										target="_blank"
										rel="noopener noreferrer"
										className="block "
									>
										<Image
											src={contrarian_white.src}
											alt="Contrarian Ventures"
											className="-ml-2 z-50 "
											width={400}
											isBlurred
										/>
									</a>

									<a
										href="https://www.bbva.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="block"
									>
										<Image
											src={bbva_white.src}
											alt="Contrarian Ventures"
											width={350}
											isBlurred
											className=""
										/>
									</a>
								</div>
							</div>
						</motion.div>

						<motion.img
							src={blob2.src}
							alt="img"
							className="md:block md:absolute md:h-[1000px] md:w-auto md:max-w-none md:left-80 lg:left-[700px] hidden z-0 duration-300"
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
			</section>

			{/* <ScrollingBanner />
			<About /> */}
		</>
	);
};
