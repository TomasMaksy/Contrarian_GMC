import Scrolling_Banner from "../components/scrolling-banner";
import Image from "next/image";
import contrarian_logo from "@/app/assets/Contrarian_logo_white.png";
import bbva_logo from "@/app/assets/BBVA_logo_white.png";

export default function ScrollingBanner() {
	const logos = [
		{
			key: "logo-1",
			logo: contrarian_logo,
		},
		{
			key: "logo-2",
			logo: bbva_logo,
		},
	];
	return (
		<section className=" bg-black w-full bg-[radial-gradient(ellipse_70%_150%_at_top,#3fafa8,black)] overflow-x-clip bg-opacity-70 ">
			<div className="pb-10 bg-black">
				<section className=" w-full left-0 right-0 bottom-10 pt-10 pb-1">
					<Scrolling_Banner shouldPauseOnHover gap="80px">
						{Array.from({ length: 40 }, (_, i) => logos[i % logos.length]).map(
							({ key, logo }, index) => (
								<div
									key={`${key}-${index}`}
									className="flex items-center justify-center text-foreground"
									style={{ minWidth: "130px" }}
								>
									<Image src={logo} alt={key} />
								</div>
							)
						)}
					</Scrolling_Banner>
				</section>
			</div>
		</section>
	);
}
