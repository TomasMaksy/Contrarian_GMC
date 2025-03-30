"use client";

import { Cover } from "@/app/components/ui/cover";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import {
	Chip,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/react";
import { Ellipsis } from "lucide-react";
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

	return (
		<>
			<div className="h-screen w-screen flex flex-col justify-center items-center bg-black">
				<h1 className="text-xl md:text-2xl lg:text-4xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white tracking-tighter">
					<span className="text-4xl md:text-4xl lg:text-6xl ">
						Hey! <span className="text-white">👋</span>
						<br /> {timetable.orgName}
					</span>
					<br /> We will see you
					<Cover> very soon!</Cover>
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
			<div className="w-full items-center justify-center align-middle mb-40 ">
				<Table
					aria-label="Example static collection table"
					className="max-w-xl mx-auto"
					color="danger"
					isStriped
				>
					<TableHeader>
						<TableColumn align="center">TIME</TableColumn>
						<TableColumn align="center">TABLE NUMBER</TableColumn>
						<TableColumn>COUNTERPART</TableColumn>
						<TableColumn align="center" width={24}>
							<Ellipsis width={16} />
						</TableColumn>
					</TableHeader>
					<TableBody>
						<TableRow key="1">
							<TableCell>10:00</TableCell>
							<TableCell>
								<Chip color="success" size="md" variant="flat">
									Table {timetable.table}
								</Chip>
							</TableCell>
							<TableCell>{timetable.meeting1}</TableCell>
							<TableCell align="center">
								<a
									href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=GMC+Meeting+with+${timetable.meeting1}&dates=20250331T143000Z/20250331T150000Z&details=Table+${timetable.table}`}
								>
									<Image
										src={"/googlecalendar.png"}
										alt="Google Calendar Icon"
										width={24}
										height={24}
										className="bg-white rounded-md"
									/>
								</a>
							</TableCell>
						</TableRow>
						<TableRow key="2">
							<TableCell>10:30</TableCell>
							<TableCell>
								{" "}
								<Chip color="success" size="md" variant="flat">
									Table {timetable.table}
								</Chip>
							</TableCell>
							<TableCell>{timetable.meeting2}</TableCell>
							<TableCell>
								<a
									href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=GMC+Meeting+with+${timetable.meeting1}&dates=20250331T143000Z/20250331T150000Z&details=Table+${timetable.table}`}
								>
									<Image
										src={"/googlecalendar.png"}
										alt="Google Calendar Icon"
										width={24}
										height={24}
										className="bg-white rounded-md"
									/>
								</a>
							</TableCell>
						</TableRow>
						<TableRow key="3">
							<TableCell>11:00</TableCell>
							<TableCell>
								{" "}
								<Chip color="success" size="md" variant="flat">
									Table {timetable.table}
								</Chip>
							</TableCell>
							<TableCell>{timetable.meeting3}</TableCell>
							<TableCell>
								<a
									href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=GMC+Meeting+with+${timetable.meeting1}&dates=20250331T143000Z/20250331T150000Z&details=Table+${timetable.table}`}
								>
									<Image
										src={"/googlecalendar.png"}
										alt="Google Calendar Icon"
										width={24}
										height={24}
										className="bg-white rounded-md"
									/>
								</a>
							</TableCell>
						</TableRow>
						<TableRow key="4">
							<TableCell>11:30</TableCell>
							<TableCell>
								{" "}
								<Chip color="success" size="md" variant="flat">
									Table {timetable.table}
								</Chip>
							</TableCell>
							<TableCell>{timetable.meeting4}</TableCell>
							<TableCell>
								<a
									href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=GMC+Meeting+with+${timetable.meeting1}&dates=20250331T143000Z/20250331T150000Z&details=Table+${timetable.table}`}
								>
									<Image
										src={"/googlecalendar.png"}
										alt="Google Calendar Icon"
										width={24}
										height={24}
										className="bg-white rounded-md"
									/>
								</a>
							</TableCell>
						</TableRow>
						<TableRow key="5">
							<TableCell>12:00</TableCell>
							<TableCell>
								{" "}
								<Chip color="success" size="md" variant="flat">
									Table {timetable.table}
								</Chip>
							</TableCell>
							<TableCell>{timetable.meeting5}</TableCell>
							<TableCell>
								<a
									href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=GMC+Meeting+with+${timetable.meeting1}&dates=20250331T143000Z/20250331T150000Z&details=Table+${timetable.table}`}
								>
									<Image
										src={"/googlecalendar.png"}
										alt="Google Calendar Icon"
										width={24}
										height={24}
										className="bg-white rounded-md"
									/>
								</a>
							</TableCell>
						</TableRow>
						<TableRow key="6">
							<TableCell>12:30</TableCell>
							<TableCell>
								{" "}
								<Chip color="success" size="md" variant="flat">
									Table {timetable.table}
								</Chip>
							</TableCell>
							<TableCell>{timetable.meeting6}</TableCell>
							<TableCell>
								<a
									href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=GMC+Meeting+with+${timetable.meeting1}&dates=20250331T143000Z/20250331T150000Z&details=Table+${timetable.table}`}
								>
									<Image
										src={"/googlecalendar.png"}
										alt="Google Calendar Icon"
										width={24}
										height={24}
										className="bg-white rounded-md"
									/>
								</a>
							</TableCell>
						</TableRow>
						<TableRow key="7">
							<TableCell>13:00</TableCell>
							<TableCell>
								{" "}
								<Chip color="success" size="md" variant="flat">
									Table {timetable.table}
								</Chip>
							</TableCell>
							<TableCell>{timetable.meeting7}</TableCell>
							<TableCell>
								<a
									href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=GMC+Meeting+with+${timetable.meeting1}&dates=20250331T143000Z/20250331T150000Z&details=Table+${timetable.table}`}
								>
									<Image
										src={"/googlecalendar.png"}
										alt="Google Calendar Icon"
										width={24}
										height={24}
										className="bg-white rounded-md"
									/>
								</a>
							</TableCell>
						</TableRow>
						<TableRow key="8">
							<TableCell>13:30</TableCell>
							<TableCell> {timetable.table}</TableCell>
							<TableCell>{timetable.meeting8}</TableCell>
							<TableCell>
								<a
									href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=GMC+Meeting+with+${timetable.meeting1}&dates=20250331T143000Z/20250331T150000Z&details=Table+${timetable.table}`}
								>
									<Image
										src={"/googlecalendar.png"}
										alt="Google Calendar Icon"
										width={24}
										height={24}
										className="bg-white rounded-md"
									/>
								</a>
							</TableCell>
						</TableRow>
						<TableRow key="9">
							<TableCell>14:00</TableCell>
							<TableCell> {timetable.table}</TableCell>
							<TableCell>{timetable.meeting9}</TableCell>
							<TableCell>
								<a
									href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=GMC+Meeting+with+${timetable.meeting1}&dates=20250331T143000Z/20250331T150000Z&details=Table+${timetable.table}`}
								>
									<Image
										src={"/googlecalendar.png"}
										alt="Google Calendar Icon"
										width={24}
										height={24}
										className="bg-white rounded-md"
									/>
								</a>
							</TableCell>
						</TableRow>
						<TableRow key="10">
							<TableCell>14:30</TableCell>
							<TableCell> {timetable.table}</TableCell>
							<TableCell>{timetable.meeting10}</TableCell>
							<TableCell>
								<a
									href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=GMC+Meeting+with+${timetable.meeting1}&dates=20250331T143000Z/20250331T150000Z&details=Table+${timetable.table}`}
								>
									<Image
										src={"/googlecalendar.png"}
										alt="Google Calendar Icon"
										width={30}
										height={30}
										className="bg-white rounded-md"
									/>
								</a>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default TimetablePage;
