"use client";

import Logo from "@/app/assets/logo.png";

import Image from "next/image";

export const Header = () => {
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
		<header className="sticky top-0 backdrop-blur-sm z-20">
			{/* <div className="flex justify-center items-center bg-[#3fafa8] text-white py-1 gap-3">
				<p className="hidden md:block">Agenda Tool</p>
				<div className="flex justify-center items-center py-3 bg-[#3fafa8]">
					<p className="text-white/60">Growth Meets Capital Demo</p>
				</div>
			</div> */}

			<div className="py-5">
				<div className="container">
					<div className="flex items-center justify-between gap-3 align-middle">
						<div className="flex gap-2">
							<Image
								src={Logo}
								alt="Contrarian Ventures Logo"
								className="max-h-10 w-auto"
							/>
						</div>
						{/* <Menu className="h-5 w-5 md:hidden" /> */}
						<nav className="flex gap-6 text-white items-center">
							<button className="custom-btn-hover">
								<a onClick={scrollToAnalysis}>Agenda</a>
							</button>
							<button className="bg-[#3fafa8] text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight hover:bg-teal-600 duration-300">
								Register
							</button>
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
};
