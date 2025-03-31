"use client";

import React from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { cn } from "@heroui/react";

import { BackupFormProps } from "./types";

const ChooseBackupForm = React.forwardRef<HTMLFormElement, BackupFormProps>(
	(
		{
			className,
			backups,
			setBackup,
			excludedOrg,
			preferences,
			startups,
			investors,
			...props
		},
		ref
	) => {
		// const [startups, setStartups] = useState<OrganisationTypes[]>([]);
		// const [investors, setInvestors] = useState<OrganisationTypes[]>([]);
		// // Fetch investors and startups data
		// useEffect(() => {
		// 	const fetchData = async () => {
		// 		try {
		// 			const [investorsRes, startupsRes] = await Promise.all([
		// 				fetch("/api/get_investors"),
		// 				fetch("/api/get_startups"),
		// 			]);

		// 			const investorsData = await investorsRes.json();
		// 			const startupsData = await startupsRes.json();

		// 			if (investorsData.success && Array.isArray(investorsData.data)) {
		// 				setInvestors(
		// 					investorsData.data.map(
		// 						(investor: { id: string; name: string; logo: string }) => ({
		// 							value: investor.id,
		// 							name: investor.name,
		// 							logo: investor.logo,
		// 						})
		// 					)
		// 				);
		// 			} else {
		// 				console.error("Unexpected investors response:", investorsData);
		// 				setInvestors([]);
		// 			}

		// 			if (startupsData.success && Array.isArray(startupsData.data)) {
		// 				setStartups(
		// 					startupsData.data.map(
		// 						(startup: { id: string; name: string; logo: string }) => ({
		// 							value: startup.id,
		// 							name: startup.name,
		// 							logo: startup.logo,
		// 						})
		// 					)
		// 				);
		// 			} else {
		// 				console.error("Unexpected startups response:", startupsData);
		// 				setStartups([]);
		// 			}
		// 		} catch (error) {
		// 			console.error("Error fetching data:", error);
		// 			setInvestors([]);
		// 			setStartups([]);
		// 		}
		// 	};

		// 	fetchData();
		// }, []);

		// Determine which list to use based on excludedOrg
		const isExcludedInStartups = startups.some((s) => s.name === excludedOrg);
		const organisations = isExcludedInStartups ? investors : startups;

		const selectedOrganisations = preferences.filter((pref) => pref);

		// Include backup preferences in the list of disabled organisations
		const disabledOrganisations = [...selectedOrganisations, ...backups];

		// Create a filtered list of organisations that do not include the selected ones or the excluded organisation
		const filteredOrganisations = organisations.filter(
			(org) => org.name !== excludedOrg
		);

		const disabledKeys: string[] = disabledOrganisations
			.map((pref) => organisations.find((org) => org.name === pref)?.id)
			.filter((key): key is string => key !== undefined); // Ensure the result is an array of strings

		const choices = Array.from({ length: 14 }, (_, i) => i + 17);

		const handleValueChange = (index: number, value: string) => {
			// Check if the value is already selected as a preference (to avoid duplicates)
			if (!selectedOrganisations.includes(value) && !backups.includes(value)) {
				setBackup(index, value);
			}
		};

		return (
			<>
				<div className="text-3xl font-bold leading-9 text-default-foreground">
					Choose Your Backup Preferences
				</div>
				<div className="py-4 text-base leading-5 text-default-500">
					We&apos;ll use these if your top selections aren&apos;t available.
				</div>
				<form
					ref={ref}
					className={cn("grid grid-cols-12 flex-col gap-4 py-8", className)}
					{...props}
				>
					{choices.map((choice, index) => (
						<Autocomplete
							key={index}
							className={"sm:col-span-12 md:col-span-6 flex"}
							defaultItems={filteredOrganisations}
							label={`${choice}${getOrdinalSuffix(choice)} Choice`}
							labelPlacement="outside"
							placeholder={`${
								backups[index]
									? backups[index]
									: `${choice}${getOrdinalSuffix(choice)}`
							} Organisation`}
							value={preferences[index]}
							onValueChange={(value) => handleValueChange(index, value)}
							onSelectionChange={(key) => {
								const selectedItem = filteredOrganisations.find(
									(item) => item.id === key
								);
								if (selectedItem) {
									setBackup(index, selectedItem.name);
								}
							}}
							disabledKeys={disabledKeys}
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
											className="w-8 h-8 rounded-lg object-cover bg-white"
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

const getOrdinalSuffix = (num: number) => {
	const suffixes = ["th", "st", "nd", "rd"];
	const mod100 = num % 100;
	return suffixes[(mod100 - 20) % 10] || suffixes[mod100] || suffixes[0];
};

ChooseBackupForm.displayName = "Backup Choices";

export default ChooseBackupForm;
