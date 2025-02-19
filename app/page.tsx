import Forma from "./components/Forma";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
export default function Home() {
	return (
		<main className="min-h-screen dark">
			<Header />
			<Hero />
			<Forma />
		</main>
	);
}
