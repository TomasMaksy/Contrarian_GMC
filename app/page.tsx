import Forma from "@/app/components/Forma";
import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import Footer from "@/app/components/Footer";

export default function Home() {
	return (
		<main className="dark">
			<Header />
			<Hero />
			{/* <Forma /> */}
			<Footer />
		</main>
	);
}
