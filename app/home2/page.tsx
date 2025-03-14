import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import Footer from "@/app/components/Footer";
import Landing from "@/app/landing/page";

export default function Home() {
	return (
		<main className="dark bg-black flex flex-col min-h-screen ">
			<div className="fixed z-50 top-0 justify-between w-full mb-4">
				<Header />
			</div>
			<Hero />
			<div className="flex flex-col justify-center mt-[100vh]">
				{/* <Divider /> */}
				<Landing />

				<Footer />
			</div>
		</main>
	);
}
