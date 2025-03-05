"use client";

import React from "react";
import {
	Card,
	CardBody,
	CardFooter,
	Button,
	Image,
	Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import type { OrganisationTypes } from "../utils/types";

interface CompanyCardProps {
	organisation: OrganisationTypes;
	meetings: string[];
}

export function CompanyCard({ organisation }: CompanyCardProps) {
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
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
