"use client";

import type { InputProps } from "@heroui/react";

import React, { useState } from "react";
import { Input, Tabs, Tab, Checkbox } from "@heroui/react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";

import { cn } from "@heroui/react";

import investors from "./investors";
import startups from "./startups";

import { IdentifactionFormProps } from "./types";
import { HandCoins, Rocket } from "lucide-react";

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

		// Conditionally display autocomplete options based on active tab
		const [selectedTab, setSelectedTab] = useState("investors"); // Track active tab
		const autocompleteOptions =
			selectedTab === "investors" ? investors : startups;

		return (
			<main>
				<div className="text-3xl font-bold leading-9 text-default-foreground ">
					Welcome to the <br />
					Meeting Prefference Form 👋
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
						onSelectionChange={(key) => setSelectedTab(key as string)} // Update state on tab change
						size="md"
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

					<Autocomplete
						className="col-span-12"
						defaultItems={autocompleteOptions} // Dynamically update based on selected tab
						label="Your Organisation"
						labelPlacement="outside"
						placeholder={`${idOrg ? idOrg : "Type in your organisation name"}`}
						value={idOrg}
						isRequired
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
						{(investor) => (
							<AutocompleteItem key={investor.value}>
								{investor.title}
							</AutocompleteItem>
						)}
					</Autocomplete>
					<Input
						className="col-span-12"
						label="First Name"
						name="first-name"
						value={idName}
						onValueChange={setFormName}
						placeholder="Type your first name here"
						{...inputProps}
						isRequired
					/>

					<Input
						className="col-span-12 "
						label="Email"
						name="email"
						placeholder="john.doe@gmail.com"
						type="email"
						value={idEmail}
						onValueChange={setFormEmail}
						{...inputProps}
						isRequired
					/>

					{/* <Input
					className="col-span-12 md:col-span-6"
					label="Password"
					name="password"
					placeholder="*********"
					type="password"
					{...inputProps}
				/>

				<Input
					className="col-span-12 md:col-span-6"
					label="Confirm Password"
					name="confirm-password"
					placeholder="*********"
					type="password"
					{...inputProps}
				/> */}

					<Checkbox
						defaultSelected
						className="col-span-12 m-0 p-2 text-left text-[#0a6dad]"
						color="primary"
						name="terms-and-privacy-agreement"
						size="md"
					>
						I want to be added to mailing list of
						<span className="mx-1 text-[#3fafa8] underline">
							Growth Meets Capital
						</span>
					</Checkbox>
				</form>
			</main>
		);
	}
);

IdentificationForm.displayName = "IdentificationForm";

export default IdentificationForm;
