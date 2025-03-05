"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Header } from "@/app/components/Header";

import { OrganisationTypes } from "./utils/types";
import { CompanyCard } from "./components/company-card";
import Footer from "../components/Footer";
import { Card, Skeleton, Tabs, Tab } from "@heroui/react";
import { HandCoins, Rocket } from "lucide-react";

import blob from "@/app/assets/blob.png";
import blob2 from "@/app/assets/blob2.png";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TimetableProps } from "../api/get_timetables/route";

export default function Participants() {
	const [selected, setSelected] = React.useState("investors");

	console.log(selected);

	// Fetch data from your API endpoint
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [investorsRes, startupsRes, timetablesRes] = await Promise.all([
					fetch("/api/get_investors"),
					fetch("/api/get_startups"),
					fetch("/api/get_timetables"),
				]);

				const investorsData = await investorsRes.json();
				const startupsData = await startupsRes.json();
				const timetablesData = await timetablesRes.json();

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

				if (timetablesData.success && Array.isArray(timetablesData.data)) {
					setTimetables(timetablesData.data);
				} else {
					console.error("Unexpected timetables response:", timetablesData);
					setTimetables([]);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
				setInvestors([]);
				setStartups([]);
				setTimetables([]);
			}
		};

		fetchData();
	}, []); // Runs only once when the component mounts

	// State for storing both datasets
	const [investors, setInvestors] = useState<OrganisationTypes[]>([]);
	const [startups, setStartups] = useState<OrganisationTypes[]>([]);
	const [timetables, setTimetables] = useState<TimetableProps[]>([]);

	// Determine which dataset to display
	const displayedData = selected === "investors" ? investors : startups;

	// Find the timetable for each organization
	const getTimetableForOrg = (orgName: string) => {
		// Log the orgName we're searching for
		console.log("Searching for orgName:", orgName);

		// Find the matching timetable
		const timetable = timetables.find((t) => {
			// Log each orgName to see if it matches
			console.log("Checking orgName:", t.orgName);
			return t.orgName === orgName;
		});

		// Log the result of the find operation
		if (timetable) {
			console.log("Found matching orgName:", timetable.orgName);
			return timetable.meetings;
		} else {
			console.log("No match found");
			return ["ERROR"];
		}
	};

	const heroRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start end", "end start"],
	});
	const translateY = useTransform(scrollYProgress, [0, 1], [1500, -1000]);

	return (
		<>
			<Header />
			<main className="bg-[radial-gradient(ellipse_120%_30%_at_bottom_left,#3fafa8,black)] pb-24">
				<div className="relative overflow-hidden">
					<div className="container">
						<div className="flex flex-col gap-5 items-center justify-center mt-24 mb-12">
							<div className="text-center font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
								<div className="bg-hero-section-title bg-clip-text bg-gradient-to-b from-[#3fafa8] to-black text-transparent sm:scale-90 md:scale-100 mb-10">
									Meet the Participants
								</div>
							</div>
							<Tabs
								aria-label="Options"
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
										<div className="flex flex-row gap-2 justify-between items-center align-middle">
											<HandCoins size={20} />
											<span>Investors</span>
										</div>
									}
								/>
								<Tab
									key="startups"
									title={
										<div className="flex flex-row gap-2 justify-between items-center align-middle">
											<Rocket size={20} />
											<span>Startups</span>
										</div>
									}
								/>
							</Tabs>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10 z-50">
							{displayedData.length === 0
								? Array.from({ length: 12 }, (_, index) => (
										<div key={index} className="flex flex-col space-y-4 ">
											<Card className="w-full space-y-5 p-4 mb-4" radius="lg">
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
										const meetings = getTimetableForOrg(org.name); // Get meetings for the org
										return (
											<CompanyCard
												key={org.id}
												organisation={org}
												meetings={meetings} // Pass meetings to CompanyCard
											/>
										);
								  })}
						</div>
					</div>
					<div className="z-0">
						{/* <Image
							src={blob}
							alt="blob"
							className="absolute top-96 - w-[1200px] h-[1000px] z-0 opacity-65"
						/> */}
						{/* <Image
							src={blob2}
							alt="blob"
							className="absolute -right-2/4 bottom-1/3 w-[2200px] h-[2200px] z-0 opacity-70 "
						/> */}

						<motion.img
							src={blob.src}
							alt="Cylinder"
							width={1200}
							height={1200}
							className="block top-0 right-0 absolute"
							style={{ translateY: translateY }}
						/>
						<motion.img
							src={blob2.src}
							alt="Cylinder"
							width={1500}
							height={1500}
							className="hidden md:block top-1/3  md:absolute"
							style={{ translateY: translateY }}
						/>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
