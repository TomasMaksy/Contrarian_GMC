"use client";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

import { Header } from "@/app/components/Header";
import { Cover } from "@/app/components/ui/cover";
import {
	Button,
	Chip,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/react";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Footer from "@/app/components/Footer";

interface TimetableProps {
	id: string;
	orgName: string;
	type: string;
	table: number;
	link: string;
	meeting1: string;
	meeting2: string;
	meeting3: string;
	meeting4: string;
	meeting5: string;
	meeting6: string;
	meeting7: string;
	meeting8: string;
	meeting9: string;
	meeting10: string;
}

const meetingTimes = [
	{ start: "10:30", end: "10:55" },
	{ start: "11:00", end: "11:25" },
	{ start: "11:30", end: "11:55" },
	{ start: "12:00", end: "12:25" },
	{ start: "12:30", end: "12:55" },
	{ start: "14:00", end: "14:25" },
	{ start: "14:30", end: "14:55" },
	{ start: "15:00", end: "15:25" },
	{ start: "15:30", end: "15:55" },
	{ start: "16:00", end: "16:25" },
];

interface CounterpartData {
	name: string;
	logo: string;
	stage: string;
	fundraising: string;
	website: string;
	table: number;
}

const TimetablePage = () => {
	const timetableRef = useRef<HTMLDivElement>(null);
	const { id } = useParams();
	const [timetable, setTimetable] = useState<TimetableProps | null>(null);
	const [counterpartData, setCounterpartData] = useState<CounterpartData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isCapturing, setIsCapturing] = useState(false);

	// Generate search params from meeting values
	const generateSearchParams = (timetable: TimetableProps) => {
		const meetings = [];

		// Loop through each meeting (1 to 10)
		for (let i = 1; i <= 10; i++) {
			const meetingName = timetable[`meeting${i}` as keyof TimetableProps];

			// Explicitly check for undefined or null, allowing empty strings
			if (meetingName !== undefined && meetingName !== null) {
				meetings.push(meetingName);
			}
		}

		return meetings.join(",");
	};

	useEffect(() => {
		if (!id || typeof id !== "string") return;

		const fetchTimetableAndCounterparts = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/timetables/${id}`);
				const data = await response.json();

				if (data.success) {
					setTimetable(data.data);
					// Generate search params from meeting values
					const searchParams = generateSearchParams(data.data);
					// Fetch counterpart data for the specified startups
					if (searchParams) {
						let endpoint = "";

						// Check timetable type and decide on the appropriate endpoint
						if (data.data.type === "investors") {
							endpoint = "/api/get_startups";
						} else if (data.data.type === "startups") {
							endpoint = "/api/get_investors";
						}
						// Fetch counterpart data from the chosen endpoint
						const counterpartResponse = await fetch(
							`${endpoint}?names=${encodeURIComponent(searchParams)}`
						);
						const counterpartData = await counterpartResponse.json();

						if (counterpartData.success) {
							// Store the counterpart data for use
							setCounterpartData(counterpartData.data);
						} else {
							setError("Failed to fetch counterpart data");
						}
					}
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

		fetchTimetableAndCounterparts();
	}, [id]);
	console.log(counterpartData);
	if (loading)
		return (
			<div className="h-screen w-full flex flex-col justify-center items-center">
				<div className="h-screen w-screen flex flex-col justify-center items-center">
					<h1 className="sm:text-2xl md:text-6xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white tracking-tighter">
						<span className="sm:text-2xl md:text-6xl ">
							Hey! <span className="text-white">👋</span>
						</span>
						<br /> <Cover>loading...</Cover>
					</h1>
				</div>
			</div>
		);
	if (error) return <div>{error}</div>;
	if (!timetable) return <div>No timetable data available</div>;

	const downloadPDF = async () => {
		if (!timetableRef.current) return;

		setIsCapturing(true); // 🔥 Make it wider

		// Wait for next DOM paint
		await new Promise((r) => setTimeout(r, 100));

		const node = timetableRef.current;
		const width = node.scrollWidth;
		const height = node.scrollHeight;

		toPng(node, {
			backgroundColor: "#000",
			width,
			height,
			style: {
				transform: "none",
				cssText:
					"font-smoothing: antialiased; -webkit-font-smoothing: antialiased;",
				lineHeight: "normal",
				display: "block",
			},
		})
			.then((dataUrl) => {
				saveAs(dataUrl, "TimetableGMC.png");
			})
			.catch((err) => {
				console.error("Error generating PNG", err);
			})
			.finally(() => {
				setIsCapturing(false); // ✅ Restore normal state
			});
	};

	return (
		<section className="w-screen overflow-x-hidden">
			<Header variant="static" />
			<div className="flex flex-col items-center ">
				<div
					ref={timetableRef}
					className={`flex flex-col items-center justify-center relative transition-all duration-300 ${
						isCapturing ? "w-[px]" : "w-full overflow-x-auto"
					}`}
				>
					<div className="min-w-[700px] flex flex-col items-center gap-10 m-8 pt-4">
						<div className="items-center flex flex-col gap-4 mb-8">
							<h1 className="text-lg md:text-xl lg:text-3xl font-semibold max-w-7xl mx-auto text-center relative z-20 bg-clip-text text-white tracking-tighter">
								<span className="text-4xl md:text-5xl lg:text-6xl font-bold">
									Hey! <span className="text-white">👋</span> <br />
									{timetable.orgName}
								</span>
								<br /> This is your personalised
								<Cover> agenda!</Cover>
							</h1>
						</div>

						<div
							className={`${
								isCapturing ? "w-full" : "w-screen"
							} overflow-x-auto pb-10 flex flex-col md:items-center sm:items-start gap-4`}
						>
							<div className="min-w-[700px] w-[680px]">
								<Table
									aria-label="Timetable"
									className="w-full shadow-[12px_12px_40px_1px_rgba(74,222,128,0.15)] rounded-xl sm:scale-95 lg:scale-100 "
									isStriped
								>
									<TableHeader>
										<TableColumn align="center" width={20}>
											#
										</TableColumn>
										<TableColumn align="center" width={80}>
											Start Time
										</TableColumn>
										<TableColumn align="center" width={80}>
											End Time
										</TableColumn>

										{timetable.type === "startups" ? (
											<>
												<TableColumn align="center" width={100}>
													Table Number
												</TableColumn>
												<TableColumn>Investor Name</TableColumn>
											</>
										) : (
											<>
												<TableColumn align="center" width={100}>
													Table Number
												</TableColumn>
												<TableColumn>Startup Name</TableColumn>
												<TableColumn width={90}>Stage</TableColumn>
												<TableColumn width={80}>Fundraising*</TableColumn>
											</>
										)}
									</TableHeader>

									<TableBody>
										{meetingTimes.map((time, index) =>
											timetable.type === "startups" ? (
												<TableRow key={`startup-${index}`}>
													<TableCell align="center">{index + 1}</TableCell>
													<TableCell align="center">{time.start}</TableCell>
													<TableCell align="center">{time.end}</TableCell>
													<TableCell align="center">
														<Chip
															color={
																counterpartData[index].table === 0
																	? "warning"
																	: "success"
															}
															size="md"
															variant="flat"
														>
															{counterpartData[index].table === 0
																? "N/A"
																: `Table ${counterpartData[index].table}`}
														</Chip>
													</TableCell>

													<TableCell>
														{/* Startup Name + Logo logic */}
														{timetable[
															`meeting${index + 1}` as keyof TimetableProps
														] ? (
															<a
																href={
																	counterpartData[index]?.website.startsWith(
																		"http"
																	)
																		? counterpartData[index]?.website
																		: `https://${counterpartData[index]?.website}`
																}
																target="_blank"
																rel="noopener noreferrer"
															>
																<div className="flex gap-3 items-center group">
																	<img
																		alt={
																			counterpartData[index].logo ||
																			"Error Image"
																		}
																		className="w-12 h-8 rounded-lg object-contain bg-white px-0.5"
																		src={
																			counterpartData[index].logo === "N/A"
																				? "/Error-512.webp"
																				: counterpartData[index].logo
																		}
																		width={48}
																		height={32}
																	/>
																	<span className="font-semibold group-hover:text-success duration-500">
																		{
																			timetable[
																				`meeting${
																					index + 1
																				}` as keyof TimetableProps
																			]
																		}
																	</span>
																</div>
															</a>
														) : (
															<span className="font-semibold text-gray-500">
																Free time
															</span>
														)}
													</TableCell>
												</TableRow>
											) : (
												<TableRow key={`investor-${index}`}>
													<TableCell align="center">{index + 1}</TableCell>
													<TableCell align="center">{time.start}</TableCell>
													<TableCell align="center">{time.end}</TableCell>
													<TableCell align="center">
														<Chip color="success" size="md" variant="flat">
															Table {timetable.table}
														</Chip>
													</TableCell>
													<TableCell>
														{/* Investor Name + Logo logic */}
														{timetable[
															`meeting${index + 1}` as keyof TimetableProps
														] ? (
															<a
																href={
																	counterpartData[index]?.website.startsWith(
																		"http"
																	)
																		? counterpartData[index]?.website
																		: `https://${counterpartData[index]?.website}`
																}
																target="_blank"
																rel="noopener noreferrer"
															>
																<div className="flex gap-3 items-center group">
																	<img
																		alt={
																			counterpartData[index].logo ||
																			"Error Image"
																		}
																		className="w-12 h-8 rounded-lg object-contain bg-white px-0.5"
																		src={
																			counterpartData[index].logo === "N/A"
																				? "/Error-512.webp"
																				: counterpartData[index].logo
																		}
																		width={48}
																		height={32}
																	/>
																	<span className="font-semibold group-hover:text-success duration-500">
																		{
																			timetable[
																				`meeting${
																					index + 1
																				}` as keyof TimetableProps
																			]
																		}
																	</span>
																</div>
															</a>
														) : (
															<span className="font-semibold text-gray-500 w-full ">
																Free time
															</span>
														)}
													</TableCell>
													<TableCell>
														{counterpartData[index]?.stage || "N/A"}
													</TableCell>
													<TableCell>
														<Chip
															classNames={{
																base: "border-0",
															}}
															color={
																counterpartData[index]?.fundraising === "Yes"
																	? "success"
																	: counterpartData[index]?.fundraising === "No"
																	? "danger"
																	: "default"
															}
															variant="dot"
														>
															{counterpartData[index]?.fundraising || "N/A"}
														</Chip>
													</TableCell>
												</TableRow>
											)
										)}
									</TableBody>
								</Table>
							</div>
							<div className="flex justify-center">
								<span className="text-sm text-default-500 sm:w-full md:w-[700px] md:scale-100 sm:scale-90 mt-2">
									*Fundraising - Does the company intend to fundraise in 2025
								</span>
							</div>
						</div>
					</div>
				</div>
				<Button onPress={downloadPDF} color="success" variant="bordered">
					Save as PDF
				</Button>
			</div>
			<Footer />
		</section>
	);
};

export default TimetablePage;
