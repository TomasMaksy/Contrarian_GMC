import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Providers } from "./providers"; // Adjust the import path as needed

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={clsx(dmSans.className, "antialiased bg-[#000]")}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
