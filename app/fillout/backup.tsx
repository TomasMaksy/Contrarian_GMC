"use client";

import React from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { cn } from "@heroui/react";

import organisations from "./organisations";

export type ChooseAddressFormProps = React.HTMLAttributes<HTMLFormElement>;

const ChooseAddressForm = React.forwardRef<
	HTMLFormElement,
	ChooseAddressFormProps
>(({ className, ...props }, ref) => {
	return (
		<>
			<div className="text-3xl font-bold leading-9 text-default-foreground">
				Choose Your Back-up Preferences
			</div>
			<div className="py-4 text-base leading-5 text-default-500">
				We will choose from these preferences in a case where your
				top-priorities are unavailable
			</div>
			<form
				ref={ref}
				className={cn("grid grid-cols-12 flex-col gap-4 py-8", className)}
				{...props}
			>
				<Autocomplete
					className="col-span-6"
					defaultItems={organisations}
					label="11th Choice"
					labelPlacement="outside"
					placeholder="11th Choice"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Autocomplete
					className="col-span-6"
					defaultItems={organisations}
					label="12th Choice"
					labelPlacement="outside"
					placeholder="12th Choice"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Autocomplete
					className="col-span-6"
					defaultItems={organisations}
					label="13th Choice"
					labelPlacement="outside"
					placeholder="13th Choice"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Autocomplete
					className="col-span-6"
					defaultItems={organisations}
					label="14th Choice"
					labelPlacement="outside"
					placeholder="14th Choice"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Autocomplete
					className="col-span-6"
					defaultItems={organisations}
					label="15th Choice"
					labelPlacement="outside"
					placeholder="15th Choice"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Autocomplete
					className="col-span-6"
					defaultItems={organisations}
					label="16th Choice"
					labelPlacement="outside"
					placeholder="16th Choice"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Autocomplete
					className="col-span-6"
					defaultItems={organisations}
					label="17th Choice"
					labelPlacement="outside"
					placeholder="17th Choice"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Autocomplete
					className="col-span-6"
					defaultItems={organisations}
					label="18th Choice"
					labelPlacement="outside"
					placeholder="18th Choice"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Autocomplete
					className="col-span-6"
					defaultItems={organisations}
					label="19th Choice"
					labelPlacement="outside"
					placeholder="19th Choice"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Autocomplete
					className="col-span-6"
					defaultItems={organisations}
					label="20th Choice"
					labelPlacement="outside"
					placeholder="20th Choice"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Autocomplete
					className="col-span-6"
					defaultItems={organisations}
					label="21th Choice"
					labelPlacement="outside"
					placeholder="21st Choice"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Autocomplete
					className="col-span-6"
					defaultItems={organisations}
					label="22nd Choice"
					labelPlacement="outside"
					placeholder="22nd Choice"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Autocomplete
					className="col-span-6"
					defaultItems={organisations}
					label="23rd Choice"
					labelPlacement="outside"
					placeholder="23rd Choice"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Autocomplete
					className="col-span-6"
					defaultItems={organisations}
					label="24th Choice"
					labelPlacement="outside"
					placeholder="24th Choice"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
			</form>
		</>
	);
});

ChooseAddressForm.displayName = "Backup Choices";

export default ChooseAddressForm;
