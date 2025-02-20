"use client";

import type { IconProps } from "@iconify/react";

import Image from "next/image";
import React from "react";
import { Link, Spacer } from "@heroui/react";
import { Icon } from "@iconify/react";

import contratian_logo from "@/app/assets/Contrarian_logo_white.png";

type SocialIconProps = Omit<IconProps, "icon">;

const navLinks = [
	{
		name: "Agenda",
		href: "#",
	},
	{
		name: "Participants",
		href: "#",
	},
	{
		name: "Form",
		href: "#",
	},
	{
		name: "Register",
		href: "#",
	},
	{
		name: "About us",
		href: "#",
	},
];

const socialItems = [
	{
		name: "Facebook",
		href: "https://www.facebook.com/EnergyTechSummit/",
		icon: (props: SocialIconProps) => (
			<Icon {...props} icon="fontisto:facebook" />
		),
	},
	// {
	// 	name: "Instagram",
	// 	href: "#",
	// 	icon: (props: SocialIconProps) => (
	// 		<Icon {...props} icon="fontisto:instagram" />
	// 	),
	// },
	{
		name: "Twitter",
		href: "https://x.com/EnergTechSummit?mx=2",
		icon: (props: SocialIconProps) => (
			<Icon {...props} icon="fontisto:twitter" />
		),
	},
	{
		name: "LinkedIn",
		href: "https://www.linkedin.com/company/energy-tech-summit/",
		icon: (props: SocialIconProps) => (
			<Icon {...props} icon="fontisto:linkedin" />
		),
	},
	{
		name: "Medium",
		href: "#",
		icon: (props: SocialIconProps) => (
			<Icon {...props} icon="fontisto:medium" />
		),
	},
];

export default function Footer() {
	return (
		<footer className="flex w-full flex-col">
			<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-12 lg:px-8">
				<div className="flex items-center justify-center">
					<Image
						src={contratian_logo}
						alt="Contrarian Ventures Logo"
						className="max-h-10 w-auto mb-8"
						width={100}
					/>
				</div>
				<Spacer y={4} />
				<div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
					{navLinks.map((item) => (
						<Link
							key={item.name}
							isExternal
							className="text-default-500"
							href={item.href}
							size="sm"
						>
							{item.name}
						</Link>
					))}
				</div>
				<Spacer y={6} />
				<div className="flex justify-center gap-x-4">
					{socialItems.map((item) => (
						<Link
							key={item.name}
							isExternal
							className="text-default-400"
							href={item.href}
						>
							<span className="sr-only">{item.name}</span>
							<item.icon aria-hidden="true" className="w-5" />
						</Link>
					))}
				</div>
				<Spacer y={4} />
				<p className="mt-1 text-center text-small text-default-400">
					&copy; 2025 Contrarian Ventures. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
