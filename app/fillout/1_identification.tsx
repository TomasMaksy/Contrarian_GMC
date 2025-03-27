"use client";

import type { InputProps } from "@heroui/react";

import React from "react";
import { Input, Tabs, Tab } from "@heroui/react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";

import { cn } from "@heroui/react";

import { useState, useEffect } from "react";

import { IdentifactionFormProps } from "./types";
import { HandCoins, Rocket } from "lucide-react";

export interface AutocompleteOrganisation {
	value: string;
	title: string;
}

export interface OrganisationTypes {
	id: string;
	name: string;
}

const IdentificationForm = React.forwardRef<
	HTMLFormElement,
	IdentifactionFormProps
>(
	(
		{
			className,
			idName,
			setFormName,
			idEmail,
			setFormEmail,
			idOrg,
			setFormOrg,
			setFormType,

			...props
		},
		ref
	) => {
		const inputProps: Pick<InputProps, "labelPlacement" | "classNames"> = {
			labelPlacement: "outside",
			classNames: {
				label:
					"dark text-small font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
			},
		};

		useEffect(() => {
			const fetchData = async () => {
				try {
					const [investorsRes, startupsRes] = await Promise.all([
						fetch("/api/get_investors"),
						fetch("/api/get_startups"),
					]);

					const investorsData: { success: boolean; data: OrganisationTypes[] } =
						await investorsRes.json();
					const startupsData: { success: boolean; data: OrganisationTypes[] } =
						await startupsRes.json();

					if (investorsData.success && Array.isArray(investorsData.data)) {
						setInvestors(
							investorsData.data.map((investor) => ({
								value: investor.id, // Unique identifier
								title: investor.name, // Display name
							}))
						);
					} else {
						console.error("Unexpected investors response:", investorsData);
						setInvestors([]);
					}

					if (startupsData.success && Array.isArray(startupsData.data)) {
						setStartups(
							startupsData.data.map((startup) => ({
								value: startup.id, // Unique identifier
								title: startup.name, // Display name
							}))
						);
					} else {
						console.error("Unexpected startups response:", startupsData);
						setStartups([]);
					}
				} catch (error) {
					console.error("Error fetching data:", error);
					setInvestors([]);
					setStartups([]);
				}
			};

			fetchData();
		}, []);

		// State should use `AutocompleteOrganisation[]`
		const [investors, setInvestors] = useState<AutocompleteOrganisation[]>([]);
		const [startups, setStartups] = useState<AutocompleteOrganisation[]>([]);

		// Conditionally display autocomplete options based on active tab
		const [selectedTab, setSelectedTab] = useState("investors"); // Track active tab
		const autocompleteOptions =
			selectedTab === "investors" ? investors : startups;

		return (
			<main>
				<div className="text-3xl font-bold leading-9 text-default-foreground ">
					Welcome to the <br />
					Meeting Preference Form 👋
				</div>
				<div className="py-2 text-medium text-[#3fafa8]">
					Select your organization to continue.
					<p className="mx-2 text-default-500">
						This helps us verify your participation and match you with the right
						connections.
					</p>
				</div>
				<form
					ref={ref}
					{...props}
					className={cn("dark grid flex-col gap-4 py-8", className)}
				>
					<Tabs
						aria-label="Options"
						selectedKey={selectedTab} // Bind selected tab to state
						onSelectionChange={(key) => {
							setSelectedTab(key as string); // Update selected tab
							setFormType(key as string); // Update form type
						}}
						size="lg"
						radius="lg"
						classNames={{
							cursor: "group-data-[selected=true]:bg-[#3fafa8]",
						}}
					>
						<Tab
							key="investors"
							title={
								<div className="flex flex-row gap-2 justify-between items-center align-middle">
									<HandCoins size={15} />
									<span>Investors</span>
								</div>
							}
						/>
						<Tab
							key="startups"
							title={
								<div className="flex flex-row gap-2 justify-between items-center align-middle">
									<Rocket size={15} />
									<span>Startups</span>
								</div>
							}
						/>
					</Tabs>
					<div className="flex flex-col gap-4">
						<Input
							className="col-span-12 flex"
							label="Full Name"
							labelPlacement="inside"
							name="first-name"
							value={idName}
							onValueChange={setFormName}
							placeholder="Type your full name here"
							{...inputProps}
							isRequired
							size="lg"
						/>

						<Input
							className="col-span-12 flex"
							label="Email"
							name="email"
							placeholder="john.doe@gmail.com"
							type="email"
							value={idEmail}
							onValueChange={setFormEmail}
							{...inputProps}
							isRequired
							size="lg"
						/>
						<Autocomplete
							className="col-span-12 flex"
							defaultItems={autocompleteOptions} // Dynamically update based on selected tab
							label="Your Organisation"
							labelPlacement="outside"
							placeholder={`${"Type in your organisation name"}`}
							value={idOrg}
							isRequired
							size="lg"
							onValueChange={setFormOrg}
							onSelectionChange={(key) => {
								// Find the selected item based on the key and set its full title
								const selectedItem = autocompleteOptions.find(
									(item) => item.value === key
								);
								if (selectedItem) {
									setFormOrg(selectedItem.title);
								}
							}}
						>
							{(organisation) => (
								<AutocompleteItem key={organisation.value}>
									{organisation.title}
								</AutocompleteItem>
							)}
						</Autocomplete>
					</div>
				</form>
			</main>
		);
	}
);

IdentificationForm.displayName = "IdentificationForm";

export default IdentificationForm;
