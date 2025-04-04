import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Providers } from "./providers"; // Adjust the import path as needed
import { Analytics } from "@vercel/analytics/react";

import type { Metadata } from "next";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Growth Meets Capital", // Ensure this is a string
	description:
		"Invite-only side event of Energy Tech Summit bringing leading growth investors and entrepreneurs together under one roof.", // Ensure this is a string
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark scroll-smooth">
			<head>
				<link rel="icon" href="/favicon.ico" />
				<link rel="canonical" href="https://growthmeetscapital.com/" />
				<title>Growth Meets Capital</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
				/>
				<meta name="description" content={String(metadata.description)} />
				<meta property="og:title" content={String(metadata.title)} />
				<meta
					property="og:description"
					content={String(metadata.description)}
				/>
				<meta property="og:url" content="https://growthmeetscapital.com" />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="Growth Meets Capital" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={String(metadata.title)} />
				<meta
					name="twitter:description"
					content={String(metadata.description)}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Event",
							name: String(metadata.title),
							description: String(metadata.description),
							startDate: "2025-04-09T10:00:00+02:00",
							endDate: "2025-04-10T16:00:00+02:00",
							location: {
								"@type": "Place",
								name: "Euskalduna Conference Centre",
								address: {
									"@type": "PostalAddress",
									streetAddress: "Abandoibarra Av 4",
									addressLocality: "Bilbao",
									postalCode: "48011",
									addressRegion: "Bilbao",
									addressCountry: "ES",
								},
							},
							organizer: {
								"@type": "Organization",
								name: "Contrarian Ventures",
								url: "https://www.cventures.vc",
							},
							performer: {
								"@type": "Organization",
								name: "Growth Meets Capital",
							},
							image: "https://growthmeetscapital.com/bg.png",
							url: "https://growthmeetscapital.com",
							eventAttendanceMode: "OfflineEventAttendanceMode",
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
