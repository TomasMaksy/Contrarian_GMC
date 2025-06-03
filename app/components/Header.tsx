"use client";

import Logo from "@/app/assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

interface HeaderProps {
	variant?: "static"; // Only applies "sticky" if explicitly passed
}

export const Header = ({ variant }: HeaderProps) => {
	const router = useRouter();

	return (
		<header
			className={`${
				variant === "static" ? "" : "sticky top-0 backdrop-blur-sm z-50"
			}`}
		>
			<div className="py-5 mx-8">
				<div className="md:container">
					<div className="flex items-center justify-between gap-3 align-middle">
						<div className="flex gap-2">
							<Link href="/home" passHref>
								<Image
									src={Logo}
									alt="Contrarian Ventures Logo"
									className="max-h-10 w-auto"
								/>
							</Link>
						</div>
						{/* <Menu className="h-5 w-5 md:hidden" /> */}
						<nav className="flex gap-4 text-white items-center">
							<button className="custom-btn-hover text-[14px]">
								<a href="/participants">Participants</a>
							</button>
							<div className="group">
								<Button
									onPress={() => router.push("/fillout")}
									className="bg-[#3fafa8]/70 text-white px-4 py-2 rounded-lg font-light inline-flex justify-center tracking-wider  hover:bg-[#429f99a5] duration-300 flex-nowrap"
								>
									Form
								</Button>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
};
