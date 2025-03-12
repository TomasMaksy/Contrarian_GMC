import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Providers } from "./providers"; // Adjust the import path as needed
import { Analytics } from "@vercel/analytics/react";

import type { Metadata } from "next";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Growth Meets Capital",
	description:
		"Invite-only side event of Energy Tech Summit bringing leading growth investors and entrepreneurs together under one roof.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head className="dark">
				<link rel="icon" href="/favicon.ico" />

				{/* Meta viewport for responsiveness */}
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
				/>

				{/* Title & Description */}
				<title>Growth Meets Capital</title>
				<meta
					name="description"
					content="Invite-only side event of Energy Tech Summit bringing leading growth investors and entrepreneurs together under one roof."
				/>

				{/* Open Graph (OG) Tags */}
				<meta property="og:title" content="Growth Meets Capital" />
				<meta
					property="og:description"
					content="Invite-only side event of Energy Tech Summit bringing leading growth investors and entrepreneurs together under one roof."
				/>
				<meta
					property="og:image"
					content="https://www.growthmeetscapital.com/og-image.jpg"
				/>
				<meta property="og:url" content="https://www.growthmeetscapital.com" />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="Growth Meets Capital" />

				{/* Twitter Card Tags */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Growth Meets Capital" />
				<meta
					name="twitter:description"
					content="Invite-only side event of Energy Tech Summit bringing leading growth investors and entrepreneurs together under one roof."
				/>
				<meta
					name="twitter:image"
					content="https://www.growthmeetscapital.com/og-image.jpg"
				/>
				<meta name="twitter:site" content="@YourTwitterHandle" />

				{/* JSON-LD Structured Data */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Event",
							name: "Growth Meets Capital",
							description:
								"Invite-only side event of Energy Tech Summit bringing leading growth investors and entrepreneurs together under one roof.",
							startDate: "2025-05-10T18:00:00+02:00",
							location: {
								"@type": "Place",
								name: "Bilbao, Spain",
							},
							image: "https://www.growthmeetscapital.com/bg.png",
							url: "https://www.growthmeetscapital.com",
						}),
					}}
				/>
			</head>
			<body
				className={clsx(
					dmSans.className,
					"antialiased bg-[#000] dark min-h-screen text-default-600 flex flex-col "
				)}
			>
				<Providers>{children}</Providers>
				<Analytics />
			</body>
		</html>
	);
}
