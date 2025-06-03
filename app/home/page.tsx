"use client";
import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import Footer from "@/app/components/Footer";
import About from "@/app/about/page";
import { Image } from "@heroui/react";
import contrarian_white from "@/app/assets/Contrarian_logo_white.png";
import bbva_white from "@/app/assets/BBVA_logo_white.png";

export default function Home() {
	return (
		<main className="dark bg-black flex flex-col min-h-screen ">
			<div className="fixed z-50 top-0 justify-between w-full mb-4">
				<Header />
			</div>
			<Hero />
			<div className="w-full flex flex-col items-center justify-center mb-24 ml-3 mt-12">
				<div className="sm:scale-75 md:scale-100 ">
					<div className="text-sm rounded-lg -tracking-tight text-white/50  w-full text-center -ml-4">
						Hosted by
					</div>
					<div className="w-max flex flex-row items-center gap-6 duration-300 px-5 py-6 rounded-lg mr-8 opacity-80 hover:opacity-100 z-50 ">
						<a
							href="https://www.cventures.vc/"
							target="_blank"
							rel="noopener noreferrer"
							className=" z-50"
						>
							<Image
								src={contrarian_white.src}
								alt="Contrarian Ventures"
								className="-ml-2 mt-2 "
								width={180}
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
								width={140}
								isBlurred
								className="z-50"
							/>
						</a>
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-center">
				{/* <Divider /> */}
				<About />

				<Footer />
			</div>
		</main>
	);
}
