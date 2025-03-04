"use client";

import Logo from "@/app/assets/logo.png";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
	// Scroll function
	// const scrollToAnalysis = () => {
	// 	const analysisSection = document.getElementById("analysis-section");
	// 	if (analysisSection) {
	// 		const yOffset = -140; // Leave 50px above
	// 		const yPosition =
	// 			analysisSection.getBoundingClientRect().top + window.scrollY + yOffset;
	// 		window.scrollTo({ top: yPosition, behavior: "smooth" });
	// 	}
	// };

	return (
		<header className="sticky top-0 backdrop-blur-sm z-50">
			{/* <div className="flex justify-center items-center bg-[#3fafa8] text-white py-1 gap-3">
				<p className="hidden md:block">Agenda Tool</p>
				<div className="flex justify-center items-center py-3 bg-[#3fafa8]">
					<p className="text-white/60">Growth Meets Capital Demo</p>
				</div>
			</div> */}

			<div className="py-5 mx-8">
				<div className="md:container">
					<div className="flex items-center justify-between gap-3 align-middle">
						<div className="flex gap-2">
							<Link href="/" passHref>
								<Image
									src={Logo}
									alt="Contrarian Ventures Logo"
									className="max-h-10 w-auto"
								/>
							</Link>
						</div>
						{/* <Menu className="h-5 w-5 md:hidden" /> */}
						<nav className="flex gap-4 text-white items-center">
							<button className="custom-btn-hover sm:text-[12px] md:text-[16px]">
								<a href="/participants">Participants</a>
							</button>
							<Link href="/fillout" passHref>
								<div className="group">
									<button className="bg-[#3fafa7cb] text-white px-4 py-2 rounded-lg font-medium inline-flex justify-center tracking-tight sm:text-[12px] md:text-[16px] hover:bg-[#3fafa7a5] duration-400 flex-nowrap">
										Form
									</button>
								</div>
							</Link>
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
};
