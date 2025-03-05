"use client";

import React from "react";
import {
	Card,
	CardBody,
	CardFooter,
	Button,
	Image,
	// Popover,
	// PopoverTrigger,
	// PopoverContent,
	// useDisclosure,
	Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import type { OrganisationTypes } from "../utils/types";
// import TimetableModal from "./timetable-modal"; // Import the new component
// import { User } from "@heroui/react";

interface CompanyCardProps {
	organisation: OrganisationTypes;
	meetings: string[];
}

export function CompanyCard({
	organisation,
	meetings,
}: // onViewTimetable,
CompanyCardProps) {
	// const { isOpen, onOpen, onClose } = useDisclosure();
	// const handleOpen = () => {
	// 	onOpen();
	// };
	console.log("Meetings for", { organisation }, { meetings });

	return (
		<div>
			<Card className="w-full p-2 z-20">
				<CardBody className="p-4">
					<div className="flex flex-col gap-4 h-full">
						<div className="bg-white rounded-2xl w-full flex justify-center items-center hover:scale-105 duration-400">
							<Image
								alt="Card image"
								className="aspect-video w-full object-contain object-center h-40 py-2"
								src={organisation.logo}
							/>
						</div>
						<div className="flex flex-col flex-grow mb-5">
							<h3 className="text-lg font-semibold">{organisation.name}</h3>
							<p className="text-small text-default-500">
								{organisation.website}
							</p>
						</div>
						{/* <Divider />
						<div className="flex flex-col flex-grow items-start pl-1">
							<User
								name={organisation.representative}
								description={organisation.title}
							/>
						</div> */}
					</div>
				</CardBody>
				<Divider />
				<CardFooter className="justify-center flex mt-2 w-full">
					<div className="flex flex-row w-full items-center ">
						<Button
							color="default"
							variant="faded"
							startContent={<Icon icon="lucide:link" />}
							className="w-full sm:z-0"
							onPress={() => {
								const url = organisation.website.startsWith("http")
									? organisation.website
									: `https://${organisation.website}`;
								window.open(url, "_blank", "noopener,noreferrer"); // This opens in a new tab
							}}
						>
							View Website
						</Button>

						{/* {meetings.includes("ERROR") ? (
							<Popover placement="right">
								<PopoverTrigger>
									<Button
										startContent={<Icon icon="lucide:calendar-1" />}
										className="w-full bg-black text-white shadow-lg hover:bg-gray-800"
										style={{
											border: "2px solid transparent",
											backgroundImage: `linear-gradient(#000000, #000000), linear-gradient(to right, #3fafa8, #0a6dad)`,
											backgroundOrigin: "border-box",
											backgroundClip: "padding-box, border-box",
										}}
									>
										View Timetable
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									<div className="px-1 py-2">
										<div className="text-small font-bold">
											The timetable is not ready!
										</div>
										<div className="text-tiny">
											We will update it as soon as possible
										</div>
									</div>
								</PopoverContent>
							</Popover>
						) : (
							<Button
								startContent={<Icon icon="lucide:calendar-1" />}
								className="w-full bg-black text-white shadow-lg hover:bg-gray-800"
								style={{
									border: "2px solid transparent",
									backgroundImage: `linear-gradient(#000000, #000000), linear-gradient(to right, #3fafa8, #0a6dad)`,
									backgroundOrigin: "border-box",
									backgroundClip: "padding-box, border-box",
								}}
								onPress={handleOpen}
							>
								View Timetable
							</Button>
						)} */}
					</div>
				</CardFooter>
			</Card>

			{/* Use the TimetableModal component */}
			{/* <TimetableModal
				isOpen={isOpen}
				onClose={onClose}
				organisation={organisation}
				meetings={meetings}
			/> */}
		</div>
	);
}
