"use client";

import React from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { cn } from "@heroui/react";

import { organisations, BackupFormProps } from "./types";

export type ChooseAddressFormProps = React.HTMLAttributes<HTMLFormElement>;

const ChooseBackupForm = React.forwardRef<HTMLFormElement, BackupFormProps>(
	(
		{ className, backups, setBackup, excludedOrg, preferences, ...props },
		ref
	) => {
		const selectedOrganisations = preferences.filter((pref) => pref);

		// Include backup preferences in the list of disabled organisations
		const disabledOrganisations = [...selectedOrganisations, ...backups];

		// Create a filtered list of organisations that do not include the selected ones or the excluded organisation
		const filteredOrganisations = organisations.filter(
			(org) => org.title !== excludedOrg
		);

		// Create an array of the "value" keys for selected organisations to disable them in the dropdown
		const disabledKeys: string[] = disabledOrganisations
			.map((pref) => organisations.find((org) => org.title === pref)?.value)
			.filter((key): key is string => key !== undefined); // Ensure the result is an array of strings

		const choices = Array.from({ length: 14 }, (_, i) => i + 11);

		const handleValueChange = (index: number, value: string) => {
			// Check if the value is already selected as a preference (to avoid duplicates)
			if (!selectedOrganisations.includes(value) && !backups.includes(value)) {
				setBackup(index, value);
			}
		};

		return (
			<>
				<div className="text-3xl font-bold leading-9 text-default-foreground">
					Choose Your Back-up Preferences
				</div>
				<div className="py-4 text-base leading-5 text-default-500">
					We will choose from these preferences in case your top-priorities are
					unavailable
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
							placeholder={`${choice}${getOrdinalSuffix(choice)} Organisation`}
							value={preferences[index] || ""}
							onValueChange={(value) => handleValueChange(index, value)}
							onSelectionChange={(key) => {
								const selectedItem = filteredOrganisations.find(
									(item) => item.value === key
								);
								if (selectedItem) {
									setBackup(index, selectedItem.title);
								}
							}}
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

const getOrdinalSuffix = (num: number) => {
	const suffixes = ["th", "st", "nd", "rd"];
	const mod100 = num % 100;
	return suffixes[(mod100 - 20) % 10] || suffixes[mod100] || suffixes[0];
};

ChooseBackupForm.displayName = "Backup Choices";

export default ChooseBackupForm;
