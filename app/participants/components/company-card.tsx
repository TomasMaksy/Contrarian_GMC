import React from "react";
import {
	Card,
	CardBody,
	CardFooter,
	Button,
	Image,
	Link,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Divider,
	Chip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import type { InvestorTypes } from "../utils/types";

import { ButtonWithBorderGradient } from "@/app/fillout/components/button-with-border-gradient";

interface CompanyCardProps {
	organisation: InvestorTypes;
	// onViewTimetable: (organisationId: string) => void;
}

export function CompanyCard({
	organisation,
}: // onViewTimetable,
CompanyCardProps) {
	return (
		<Card className="w-full p-2">
			<CardBody className="p-4">
				<div className="flex flex-col gap-4 h-full">
					<div className="bg-white rounded-2xl w-full flex justify-center items-center">
						<Image
							alt="Card image"
							className="aspect-video w-full object-contain object-center h-40  py-2"
							src={organisation.logo}
						/>
					</div>
					<div className="flex flex-col flex-grow">
						<h3 className="text-lg font-semibold">{organisation.name}</h3>
						<p className="text-small text-default-500">
							{organisation.website}
						</p>
					</div>

					<Chip
						color="default"
						startContent={
							<Icon
								icon="lucide:circle-user"
								style={{ padding: "0px", width: "16px" }}
							/>
						}
						variant="bordered"
						size="lg"
						className="w-full px-3 my-2"
					>
						{/* <span className="font-semibold">Representative: </span> */}
						<span className="pl-1">{organisation.representative}</span>
					</Chip>
				</div>
			</CardBody>
			<Divider />
			<CardFooter className="gap-2 justify-between flex flex-row">
				<Link
					href={
						organisation.website.startsWith("http")
							? organisation.website
							: `http://${organisation.website}`
					}
					target="_blank"
					className="w-full"
				>
					<Button
						color="default"
						variant="shadow"
						startContent={<Icon icon="lucide:link" />}
						className="w-full"
					>
						View Website
					</Button>
				</Link>
				<Popover placement="right">
					<PopoverTrigger>
						<ButtonWithBorderGradient
							variant="bordered"
							startContent={<Icon icon="lucide:calendar-1" />}
							className="w-full"
						>
							View Timetable
						</ButtonWithBorderGradient>
					</PopoverTrigger>
					<PopoverContent>
						<div className="px-1 py-2">
							<div className="text-small font-bold">
								The timetable is not yet ready!
							</div>
							<div className="text-tiny">
								We will update it as soon as possible
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</CardFooter>
		</Card>
	);
}
