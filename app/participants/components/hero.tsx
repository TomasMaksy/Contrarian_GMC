"use client";

import React, { useState, useEffect } from "react";
import { Card, Skeleton, Tabs, Tab } from "@heroui/react";
import { HandCoins, Rocket } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { OrganisationTypes } from "../utils/types";
import { CompanyCard } from "../components/company-card";
import blob from "@/app/assets/blob.png";
import blob2 from "@/app/assets/blob2.png";

interface HeroProps {
	startups: OrganisationTypes[];
	investors: OrganisationTypes[];
	isDrawer?: boolean;
}

const Hero = ({ startups, investors, isDrawer = false }: HeroProps) => {
	const [selected, setSelected] = useState("investors");

	// Fetch data from your API endpoint
	useEffect(() => {
		if (isDrawer) return; // Skip if came from the drawer as we will pass the data instead of quering it

		const fetchData = async () => {
			try {
				const [investorsRes, startupsRes] = await Promise.all([
					fetch("/api/get_investors"),
					fetch("/api/get_startups"),
				]);

				const investorsData = await investorsRes.json();
				const startupsData = await startupsRes.json();

				if (investorsData.success && Array.isArray(investorsData.data)) {
					setInvestors(investorsData.data);
				} else {
					console.error("Unexpected investors response:", investorsData);
					setInvestors([]);
				}

				if (startupsData.success && Array.isArray(startupsData.data)) {
					setStartups(startupsData.data);
				} else {
					console.error("Unexpected startups response:", startupsData);
					setStartups([]);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
				setInvestors([]);
				setStartups([]);
			}
		};
		fetchData();
	}, [isDrawer]); // Runs only once when the component mounts

	// State for storing both datasets
	const [loaded_investors, setInvestors] = useState<OrganisationTypes[]>([]);
	const [loaded_startups, setStartups] = useState<OrganisationTypes[]>([]);

	// Determine which dataset to display
	const displayedData = isDrawer
		? selected === "investors"
			? investors
			: startups
		: selected === "investors"
		? loaded_investors
		: loaded_startups;
	console.log(displayedData);
	const { scrollYProgress } = useScroll();
	const translateY = useTransform(scrollYProgress, [0, 1], [1500, -1000]);

	return (
		<section className="bg-[radial-gradient(ellipse_120%_30%_at_bottom_left,#3fafa8,black)] pb-24">
			<div className="relative overflow-hidden">
				<div className="container">
					<div className="flex flex-col gap-5 items-center justify-center mt-24 mb-12 z-50">
						<div className="text-center font-bold leading-[1.2] tracking-tight sm:text-[64px]">
							<div className="bg-hero-section-title bg-clip-text bg-default-700 text-transparent sm:scale-90 md:scale-95 mb-4">
								Meet the Participants
							</div>
						</div>
						<Tabs
							aria-label="Choose your Company type"
							selectedKey={selected}
							onSelectionChange={(key) => setSelected(key.toString())}
							size="lg"
							radius="full"
							classNames={{
								cursor: "group-data-[selected=true]:bg-[#3fafa8]",
							}}
						>
							<Tab
								key="investors"
								title={
									<div className="flex flex-row gap-2 justify-between items-center align-middle z-50">
										<HandCoins size={20} />
										<span>Investors</span>
									</div>
								}
							/>
							<Tab
								key="startups"
								title={
									<div className="flex flex-row gap-2 justify-between items-center align-middle z-50">
										<Rocket size={20} />
										<span>Startups</span>
									</div>
								}
							/>
						</Tabs>
					</div>

					<div
						className={`grid gap-6 my-10 z-99 relative ${
							isDrawer
								? "grid-cols-1"
								: "grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
						}`}
					>
						{" "}
						{displayedData.length === 0
							? Array.from({ length: 12 }, (_, index) => (
									<div key={index} className="flex flex-col space-y-4">
										<Card
											className="w-full space-y-5 p-4 mb-4 z-50"
											radius="lg"
										>
											<Skeleton className="rounded-lg">
												<div className="h-36 rounded-lg bg-default-300" />
											</Skeleton>
											<div className="space-y-3">
												<Skeleton className="w-3/5 rounded-lg">
													<div className="h-3 w-3/5 rounded-lg bg-default-200" />
												</Skeleton>
												<Skeleton className="w-4/5 rounded-lg">
													<div className="h-3 w-4/5 rounded-lg bg-default-200" />
												</Skeleton>
												<Skeleton className="w-2/5 rounded-lg">
													<div className="h-3 w-2/5 rounded-lg bg-default-300" />
												</Skeleton>
												<div className="w-full flex flex-row gap-2">
													<Skeleton className="h-8 rounded-lg" />
													<Skeleton className="h-8 rounded-lg" />
												</div>
											</div>
										</Card>
									</div>
							  ))
							: displayedData.map((org) => {
									return <CompanyCard key={org.id} organisation={org} />;
							  })}
					</div>
				</div>

				<motion.img
					src={blob.src}
					alt="Cylinder"
					width={1200}
					height={1200}
					className="hidden md:block md:top-1/3 right-0 md:absolute z-0"
					style={{ translateY: translateY }}
				/>
				<motion.img
					src={blob2.src}
					alt="Cylinder"
					width={1500}
					height={1500}
					className="hidden md:block md:top-1 sm:right-3/4 md:absolute z-0"
					style={{ translateY: translateY }}
				/>
			</div>
		</section>
	);
};

export default Hero;
