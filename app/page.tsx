import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import Footer from "@/app/components/Footer";

export default function Home() {
	return (
		<main className="dark bg-black flex flex-col min-h-screen">
			<Header />
			<Hero />

			<Footer />
		</main>
	);
}
