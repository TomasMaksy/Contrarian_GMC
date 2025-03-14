import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import Footer from "@/app/components/Footer";
import About from "@/app/about/page";

export default function Home() {
	return (
		<main className="dark bg-black flex flex-col min-h-screen ">
			<div className="fixed z-50 top-0 justify-between w-full mb-4">
				<Header />
			</div>
			<Hero />
			<div className="flex flex-col justify-center">
				{/* <Divider /> */}
				<About />

				<Footer />
			</div>
		</main>
	);
}
