"use client";

import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { cn } from "@heroui/react";

import { PreferencesFormProps } from "./types";

// Define the structure for Investor and Startup
interface Organisation {
	value: string;
	title: string;
}

const PreferencesForm = React.forwardRef<HTMLFormElement, PreferencesFormProps>(
	({ className, preferences, setPreference, excludedOrg, ...props }, ref) => {
		const [startups, setStartups] = useState<Organisation[]>([]);
		const [investors, setInvestors] = useState<Organisation[]>([]);

		const selectedOrganisations = preferences.filter((pref) => pref);

		// Determine which list to use based on excludedOrg
		const isExcludedInStartups = startups.some((s) => s.title === excludedOrg);
		const organisations = isExcludedInStartups ? investors : startups;

		// Create a filtered list of organisations that do not include the selected ones or the excluded organisation
		const filteredOrganisations = organisations.filter(
			(org) => org.title !== excludedOrg
		);

		// Create an array of the "value" keys for selected organisations to disable them in the dropdown
		const disabledKeys: string[] = selectedOrganisations
			.map(
				(pref) => organisations.find((org) => org.title === pref)?.value // Ensure that the mapping works
			)
			.filter((key): key is string => key !== undefined); // Ensure the result is an array of strings

		const choices = Array.from({ length: 10 }, (_, i) => i + 1);

		// Fetch investors and startups data
		useEffect(() => {
			const fetchData = async () => {
				try {
					const [investorsRes, startupsRes] = await Promise.all([
						fetch("/api/get_investors"),
						fetch("/api/get_startups"),
					]);

					const investorsData = await investorsRes.json();
					const startupsData = await startupsRes.json();

					if (investorsData.success && Array.isArray(investorsData.data)) {
						setInvestors(
							investorsData.data.map(
								(investor: { id: string; name: string }) => ({
									value: investor.id,
									title: investor.name,
								})
							)
						);
					} else {
						console.error("Unexpected investors response:", investorsData);
						setInvestors([]);
					}

					if (startupsData.success && Array.isArray(startupsData.data)) {
						setStartups(
							startupsData.data.map(
								(startup: { id: string; name: string }) => ({
									value: startup.id,
									title: startup.name,
								})
							)
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

		return (
			<>
				<div className=" text-3xl font-bold leading-9 text-default-foreground">
					Your meeting preferences
				</div>
				<div className="py-4 text-default-500">
					Please provide the names of the organizations you’d like to meet,
					starting with your
					<span className="text-[#3fafa8]"> top priority.</span>
				</div>
				<form
					ref={ref}
					className={cn("grid grid-cols-12 flex-col gap-4 py-8", className)}
					{...props}
				>
					{choices.map((choice, index) => (
						<Autocomplete
							key={index}
							className={index < 2 ? "col-span-12" : "col-span-6"}
							defaultItems={filteredOrganisations}
							label={`${choice}${getOrdinalSuffix(choice)} Choice`}
							labelPlacement="outside"
							placeholder={`${
								preferences[index]
									? preferences[index]
									: `${choice}${getOrdinalSuffix(choice)}`
							} Organisation`}
							value={preferences[index]}
							onValueChange={(value) => setPreference(index, value)}
							onSelectionChange={(key) => {
								const selectedItem = filteredOrganisations.find(
									(item) => item.value === key
								);
								if (selectedItem) {
									setPreference(index, selectedItem.title);
								}
							}}
							isRequired
							disabledKeys={disabledKeys}
						>
							{(organisation) => (
								<AutocompleteItem key={organisation.value}>
									{organisation.title}
								</AutocompleteItem>
							)}
						</Autocomplete>
					))}
				</form>
			</>
		);
	}
);

// Helper function to add ordinal suffixes (1st, 2nd, 3rd, etc.)
const getOrdinalSuffix = (num: number) => {
	const suffixes = ["th", "st", "nd", "rd"];
	const mod100 = num % 100;
	return suffixes[(mod100 - 20) % 10] || suffixes[mod100] || suffixes[0];
};

PreferencesForm.displayName = "PreferencesForm";

export default PreferencesForm;
