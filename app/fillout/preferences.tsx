"use client";

import React from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { cn } from "@heroui/react";

import organisations from "./organisations";

export type CompanyInformationFormProps = React.HTMLAttributes<HTMLFormElement>;

const CompanyInformationForm = React.forwardRef<
	HTMLFormElement,
	CompanyInformationFormProps
>(({ className, ...props }, ref) => {
	return (
		<>
			<div className="text-3xl font-bold leading-9 text-default-foreground">
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
				<Autocomplete
					className="col-span-12"
					defaultItems={organisations}
					label="First Choice"
					labelPlacement="outside"
					placeholder="Organisation Name"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Autocomplete
					className="col-span-12"
					defaultItems={organisations}
					label="Second Choice"
					labelPlacement="outside"
					placeholder="Second Organisation"
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
					label="Third Choice"
					labelPlacement="outside"
					placeholder="Third Organisation"
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
					label="Fourth Choice"
					labelPlacement="outside"
					placeholder="Fourth Organisation"
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
					label="Fifth Choice"
					labelPlacement="outside"
					placeholder="Fifth Organisation"
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
					label="Sixth Choice"
					labelPlacement="outside"
					placeholder="Sixth Organisation"
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
					label="Seventh Choice"
					labelPlacement="outside"
					placeholder="Seventh Organisation"
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
					label="Eighth Choice"
					labelPlacement="outside"
					placeholder="Eighth Organisation"
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
					label="Ninth Choice"
					labelPlacement="outside"
					placeholder="Ninth Organisation"
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
					label="Tenth Choice"
					labelPlacement="outside"
					placeholder="Tenth Organisation"
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

CompanyInformationForm.displayName = "CompanyInformationForm";

export default CompanyInformationForm;
