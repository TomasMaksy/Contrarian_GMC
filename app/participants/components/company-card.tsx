"use client";

import React from "react";
import {
	Card,
	CardBody,
	// CardFooter,
	// Button,
	Image,
	// Divider,
	Chip,
	Divider,
	Tooltip,
} from "@heroui/react";
// import { Icon } from "@iconify/react";
import type { OrganisationTypes } from "../utils/types";
import {
	ChartNoAxesColumnIncreasing,
	DollarSign,
	Contact,
	X,
} from "lucide-react";

interface CompanyCardProps {
	organisation: OrganisationTypes;
}

export function CompanyCard({ organisation }: CompanyCardProps) {
	console.log(organisation.stage);
	return (
		<div>
			<Card className="w-full p-1 z-20 pb-2">
				<a
					href={
						organisation.website.startsWith("http")
							? organisation.website
							: `https://${organisation.website}`
					}
					target="_blank"
					rel="noopener noreferrer"
				>
					<CardBody className="p-4 pb-2 max-h-[315px]">
						<div className="bg-white rounded-2xl w-full flex justify-center items-start  duration-400 relative ">
							<div className="absolute top-0 left-0 z-50 -ml-2 -mt-2">
								{organisation.type === "Host" && (
									<Chip
										variant="shadow"
										size="md"
										radius="md"
										className="bg-[#3fafa8] pl-2.5"
										startContent={<Contact size={15} />}
									>
										{organisation.type}
									</Chip>
								)}
							</div>

							<Image
								alt="Card image"
								className="aspect-video w-full object-contain object-center h-40 py-2 hover:scale-105"
								src={organisation.logo}
							/>
						</div>

						<div className="flex flex-row align-top justify-between pt-3">
							<div className="flex flex-col gap-4 h-full">
								<div className="flex flex-col flex-grow mb-5">
									<h3 className="text-lg font-semibold">{organisation.name}</h3>

									<p className="text-small text-[#3fafa8] ">
										{organisation.website ===
										"https://www.bp.com/en/global/corporate/who-we-are/our-organization/strategy-and-sustainability/bp-ventures.html"
											? "bp.com"
											: organisation.website}{" "}
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
						</div>
						{organisation.stage !== "N/A" && <Divider />}
						<div className="flex flex-row justify-between pt-3">
							<div className="">
								{organisation.stage !== "N/A" && (
									<Chip
										variant="shadow"
										size="md"
										radius="md"
										className="pl-2.5"
										startContent={<ChartNoAxesColumnIncreasing size={15} />}
									>
										{organisation.stage}
									</Chip>
								)}
							</div>
							<div className=" ">
								{organisation.fundraising === "Yes" ? (
									<Tooltip content="This company is fundraising in 2025">
										<Chip
											variant="bordered"
											size="md"
											radius="md"
											className="pl-2.5 text-[#3fafa8]"
											startContent={<DollarSign size={15} />}
										>
											Fundraising in 2025
										</Chip>
									</Tooltip>
								) : organisation.fundraising === "No" ? (
									<Tooltip content="This company is not fundraising in 2025">
										<Chip
											variant="bordered"
											size="md"
											radius="md"
											className="pl-1 text-white/50"
											startContent={<X size={15} />}
										>
											Not Fundraising in 2025
										</Chip>
									</Tooltip>
								) : null}
							</div>
						</div>
					</CardBody>
				</a>
				{/* <Divider />
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
				</CardFooter> */}
			</Card>
		</div>
	);
}
