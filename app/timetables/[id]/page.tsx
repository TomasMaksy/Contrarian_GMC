"use client";

import { Cover } from "@/app/components/ui/cover";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TimetableProps {
	id: string;
	orgName: string;
	type: string;
	table: number;
	link: string;
	meeting1: string;
	meeting2: string;
}

const TimetablePage = () => {
	const { id } = useParams();
	const [timetable, setTimetable] = useState<TimetableProps | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id || typeof id !== "string") return;

		const fetchTimetable = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/timetables/${id}`);
				const data = await response.json();

				if (data.success) {
					setTimetable(data.data);
				} else {
					setError("Timetable not found");
				}
			} catch (error) {
				setError("Failed to fetch timetable data");
				console.error("Fetch error:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTimetable();
	}, [id]);

	if (loading)
		return (
			<div className="h-screen w-screen flex flex-col justify-center items-center">
				<div className="h-screen w-screen flex flex-col justify-center items-center">
					<h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white tracking-tighter">
						<span className="text-7xl">
							Hey! <span className="text-white">👋</span>
						</span>
						<br /> <Cover>loading</Cover>
					</h1>
				</div>
				<CardContainer className="inter-var">
					<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
						<CardItem
							translateZ="50"
							className="text-xl font-bold text-neutral-600 dark:text-white"
						>
							The page is loading...
						</CardItem>
						<CardItem
							as="p"
							translateZ="60"
							className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
						>
							Please be patient. We are working on it.
						</CardItem>
						<CardItem translateZ="100" className="w-full mt-4">
							<Image
								src="/bg.png"
								height="1000"
								width="1000"
								className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
								alt="thumbnail"
							/>
						</CardItem>
					</CardBody>
				</CardContainer>
				.
			</div>
		);
	if (error) return <div>{error}</div>;
	if (!timetable) return <div>No timetable data available</div>;

	return (
		<>
			<div className="h-screen w-screen flex flex-col justify-center items-center">
				<h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white tracking-tighter">
					<span className="text-7xl">
						Hey {timetable.orgName}! <span className="text-white">👋</span>
					</span>
					<br /> We will see you
					<br /> <Cover> very soon!</Cover>
				</h1>

				<div>
					<CardContainer className="inter-var">
						<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
							<CardItem
								translateZ="50"
								className="text-xl font-bold text-neutral-600 dark:text-white"
							>
								Your table number:{" "}
								<span className="font-black text-3xl italic">
									{timetable.table}
								</span>
							</CardItem>
							<CardItem
								as="p"
								translateZ="60"
								className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
							>
								Meetings: <br /> {timetable.meeting1} <br />{" "}
								{timetable.meeting2}
							</CardItem>
							<CardItem translateZ="100" className="w-full mt-4">
								<Image
									src="/photos/GMC-03.jpeg"
									height="1000"
									width="1000"
									className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
									alt="thumbnail"
								/>
							</CardItem>
						</CardBody>
					</CardContainer>
				</div>
			</div>
			<div>
				<h1>Timetable Details</h1>
				<p>
					<strong>Organization Name:</strong> {timetable.orgName}
				</p>
				<p>
					<strong>Type:</strong> {timetable.type}
				</p>
				<p>
					<strong>Table:</strong> {timetable.table}
				</p>
				<p>
					<strong>Link:</strong>{" "}
					<a href={timetable.link} target="_blank" rel="noopener noreferrer">
						{timetable.link}
					</a>
				</p>
				<p>
					<strong>Meeting 1:</strong> {timetable.meeting1}
				</p>
				<p>
					<strong>Meeting 2:</strong> {timetable.meeting2}
				</p>
			</div>
		</>
	);
};

export default TimetablePage;
