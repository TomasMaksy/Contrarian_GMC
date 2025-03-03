"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Header } from "@/app/components/Header";

import { InvestorTypes } from "./utils/types";
import { CompanyCard } from "./components/company-card";
import Footer from "../components/Footer";
import { Card, Skeleton, Tabs, Tab } from "@heroui/react";

const tabs = [
	{
		id: "investors",
		label: "Investors",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	},
	{
		id: "startups",
		label: "Startups",
		content:
			"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
	},
];

export default function Participants() {
	const [investors, setInvestors] = useState<InvestorTypes[]>([]);

	// Fetch data from your API endpoint
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch("/api/get_participants");
				const data = await response.json();
				if (data.success) {
					setInvestors(data.data); // Set the investors data
				} else {
					console.error("Failed to fetch data");
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchData();
	}, []);

	return (
		<>
			<Header />
			<main className="container">
				<div className="flex flex-col gpa-5 items-center justify-center mt-24 mb-12">
					<div className="text-center font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
						<div className="bg-hero-section-title bg-clip-text bg-gradient-to-b from-[#3fafa8] to-black text-transparent sm:scale-90 md:scale-100">
							Meet the Participants
						</div>
					</div>
					<Tabs aria-label="Dynamic tabs" items={tabs} className="mt-5">
						{(item) => <Tab key={item.id} title={item.label}></Tab>}
					</Tabs>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
					{investors.length === 0
						? Array.from({ length: 9 }, (_, index) => (
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
						: investors.map((investor) => (
								<CompanyCard
									key={investor.id}
									organisation={investor}
									// onViewTimetable={handleViewTimetable} // Pass the handler
								/>
						  ))}
				</div>
			</main>
			<Footer />
		</>
	);
}
