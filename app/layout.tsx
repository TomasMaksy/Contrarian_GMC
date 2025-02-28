import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Providers } from "./providers"; // Adjust the import path as needed
import { Analytics } from "@vercel/analytics/react";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head className="dark">
				{/* Add the meta tag for disabling zoom on mobile */}
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
				/>

				{/* You can add other head tags here as well */}
			</head>
			<body
				className={clsx(
					dmSans.className,
					"antialiased bg-[#000] dark text-default-600 min-h-screen flex flex-col"
				)}
			>
				<Providers>{children}</Providers>
				<Analytics />
			</body>
		</html>
	);
}
