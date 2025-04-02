"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { Header } from "@/app/components/Header";
import { Cover } from "@/app/components/ui/cover";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
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

const TimetablePage = () => {
	const timetableRef = useRef(null);
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
		const element = timetableRef.current; // Capture only this div
		const canvas = await html2canvas(element, {
			scale: 2,
			backgroundColor: "#000", // Ensure background is black
		});
		const imgData = canvas.toDataURL("image/png");

		const pdf = new jsPDF("p", "mm", "a4");
		const imgWidth = 210; // A4 width in mm
		const imgHeight = (canvas.height * imgWidth) / canvas.width + 25; // Maintain aspect ratio

		pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
		pdf.save("timetable.pdf");
	};

	return (
		<section className="h-screen w-screen">
			<Header />
			<div className="flex lg:flex-row md:flex-col sm:flex-col justify-center items-center bg-black md:gap-16 sm:gap-4 mt-12">
				<div className="mb-5 items-center flex flex-col gap-4">
					<h1 className="text-xl md:text-2xl lg:text-4xl font-semibold max-w-7xl mx-auto text-center relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white tracking-tighter">
						<span className="text-4xl md:text-4xl lg:text-6xl ">
							Hey! <span className="text-white">👋</span> <br />
							{timetable.orgName}
						</span>
						<br /> Check out your
						<Cover> timetable!</Cover>
					</h1>
					<Button onPress={downloadPDF} color="success" variant="bordered">
						Save as PDF
					</Button>
				</div>

				<div className="sm:scale-85 md:scale-100">
					<CardContainer className="inter-var">
						<CardBody
							ref={timetableRef}
							className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl border md:p-5 sm:p-0"
						>
							{/* <CardItem
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
							</CardItem> */}

							<CardItem translateZ="80" className="w-full">
								{/* <Image
									src="/photos/GMC-03.jpeg"
									height="1000"
									width="1000"
									className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
									alt="thumbnail"
								/> */}

								<Table
									aria-label="Example static collection table"
									className="max-w-xl mx-auto"
									color="danger"
									isStriped
								>
									<TableHeader>
										<TableColumn align="center">ID</TableColumn>
										<TableColumn align="center">TIME</TableColumn>
										<TableColumn align="center">TABLE NUMBER</TableColumn>
										<TableColumn>COUNTERPART</TableColumn>
									</TableHeader>
									<TableBody>
										{[
											"10:30",
											"11:00",
											"11:30",
											"12:00",
											"12:30",
											"14:00",
											"14:30",
											"15:00",
											"15:30",
											"16:00",
										].map((time, index) => (
											<TableRow key={index}>
												<TableCell align="center">{index + 1}</TableCell>
												<TableCell>{time}</TableCell>
												<TableCell>
													<Chip color="success" size="md" variant="flat">
														Table {timetable.table}
													</Chip>
												</TableCell>
												<TableCell>
													{
														timetable[
															`meeting${index + 1}` as keyof TimetableProps
														]
													}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardItem>
						</CardBody>
					</CardContainer>
				</div>
			</div>
			{/* <div className="w-full items-center justify-center align-middle mb-40 "></div> */}
			{/* <Footer /> */}
		</section>
	);
};

export default TimetablePage;
