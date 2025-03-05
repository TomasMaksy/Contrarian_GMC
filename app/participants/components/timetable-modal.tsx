"use client";

import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	Image,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import type { OrganisationTypes } from "../utils/types";
import { exportScheduleAsPDF } from "../utils/export-schedule";

interface TimetableModalProps {
	isOpen: boolean;
	onClose: () => void;
	organisation: OrganisationTypes;
	meetings: string[];
}

const TimetableModal: React.FC<TimetableModalProps> = ({
	isOpen,
	onClose,
	organisation,
	meetings,
}) => {
	const handleExport = async () => {
		await exportScheduleAsPDF();
	};

	return (
		<Modal
			isOpen={isOpen}
			size="2xl"
			onClose={onClose}
			hideCloseButton
			backdrop="blur"
		>
			<ModalContent>
				<main id="schedule-template">
					<ModalHeader className="sm:px-12 md:px-24 py-12">
						<div className="flex flex-row gap-5 justify-between align-middle items-center w-full ">
							<h2 className="text-xl font-bold">Meeting Schedule</h2>
							<div className="flex gap-4">
								<Button
									size="sm"
									startContent={<Icon icon="lucide:download" />}
									className="w-full text-xs bg-black text-white shadow-lg hover:bg-gray-800"
									style={{
										border: "2px solid transparent",
										backgroundImage: `linear-gradient(#222222, #222222), linear-gradient(to right, #3fafa8, #0a6dad)`,
										backgroundOrigin: "border-box",
										backgroundClip: "padding-box, border-box",
									}}
									onPress={handleExport}
								>
									Download as PDF
								</Button>
								<Button
									variant="bordered"
									className="w-max"
									size="sm"
									onPress={onClose}
									startContent={<Icon icon="lucide:x" />}
								>
									Close
								</Button>
							</div>
						</div>
					</ModalHeader>
					<ModalBody className="sm:px-12 md:px-24 pb-12">
						<div className="flex flex-col gap-4 h-full">
							<Image
								alt="Organisation logo"
								className="aspect-video w-full object-contain object-center h-40 py-2"
								src={organisation.logo}
								isBlurred
							/>
						</div>

						<Table aria-label="Meeting Schedule">
							<TableHeader>
								<TableColumn className="bg-default-100 text-center">
									TIME
								</TableColumn>
								<TableColumn className="bg-default-100 text-left">
									MEETING
								</TableColumn>
							</TableHeader>
							<TableBody>
								{meetings.map((meeting, index) => {
									const startHour = 10; // Start at 10:00
									const totalMinutes = index * 10; // 10-minute intervals
									const hours = Math.floor(totalMinutes / 60);
									const minutes = totalMinutes % 60;
									const formattedTime = `${String(startHour + hours).padStart(
										2,
										"0"
									)}:${String(minutes).padStart(2, "0")}`;

									return (
										<TableRow key={index}>
											<TableCell className="text-center">
												{formattedTime}
											</TableCell>
											<TableCell className="text-left pl-5">
												{meeting}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</ModalBody>
				</main>
			</ModalContent>
		</Modal>
	);
};

export default TimetableModal;
