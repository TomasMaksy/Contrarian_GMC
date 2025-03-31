"use client";

import React from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { cn } from "@heroui/react";

import { PreferencesFormProps } from "./types";

const PreferencesForm = React.forwardRef<HTMLFormElement, PreferencesFormProps>(
	(
		{
			className,
			startups,
			investors,
			preferences,
			setPreference,
			excludedOrg,
			...props
		},
		ref
	) => {
		// const [startups, setStartups] = useState<Organisation[]>([]);
		// const [investors, setInvestors] = useState<Organisation[]>([]);

		const selectedOrganisations = preferences.filter((pref) => pref);

		// Determine which list to use based on excludedOrg
		const isExcludedInStartups = startups.some((s) => s.name === excludedOrg);
		const organisations = isExcludedInStartups ? investors : startups;

		// Create a filtered list of organisations that do not include the selected ones or the excluded organisation
		const filteredOrganisations = organisations.filter(
			(org) => org.name !== excludedOrg
		);

		// Create an array of the "value" keys for selected organisations to disable them in the dropdown
		const disabledKeys: string[] = selectedOrganisations
			.map(
				(pref) => organisations.find((org) => org.name === pref)?.id // Ensure that the mapping works
			)
			.filter((key): key is string => key !== undefined); // Ensure the result is an array of strings

		const choices = Array.from({ length: 16 }, (_, i) => i + 1);
		return (
			<>
				<div className=" text-3xl font-bold leading-9 text-default-foreground -mt-3">
					Your Meeting Preferences
				</div>
				{/* <div className="py-4 text-default-500">
					Please provide the names of the organizations you’d like to meet,
					starting with your
					<span className="text-[#3fafa8]"> top priority.</span>
				</div> */}
				<form
					ref={ref}
					className={cn("grid grid-cols-12 flex-col gap-4 py-4", className)}
					{...props}
				>
					{choices.map((choice, index) => (
						<Autocomplete
							key={index}
							className="sm:col-span-12 md:col-span-6 flex gap-2"
							defaultItems={filteredOrganisations}
							label={`${choice}${getOrdinalSuffix(choice)} Choice`}
							labelPlacement="outside"
							size="lg"
							placeholder={`${
								preferences[index]
									? preferences[index]
									: `${choice}${getOrdinalSuffix(choice)}`
							} Organisation`}
							value={preferences[index]}
							onValueChange={(value) => setPreference(index, value)}
							onSelectionChange={(key) => {
								const selectedItem = filteredOrganisations.find(
									(item) => item.id === key
								);
								if (selectedItem) {
									setPreference(index, selectedItem.name);
								}
							}}
							isRequired
							disabledKeys={disabledKeys}
							classNames={{
								listbox: "w-full",
							}}
							itemHeight={45}
						>
							{(organisation) => (
								<AutocompleteItem
									key={organisation.id}
									textValue={organisation.name}
								>
									<div className="flex gap-2 items-center">
										<img
											alt={organisation.name}
											className="w-8 h-8 rounded-lg object-contain bg-white"
											src={organisation.logo}
											width={32} // width of the image
											height={32} // height of the image
										/>
										<span>{organisation.name}</span>
									</div>
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
