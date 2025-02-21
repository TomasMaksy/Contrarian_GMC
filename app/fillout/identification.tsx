"use client";

import type { InputProps } from "@heroui/react";

import React from "react";
import { Input, Tabs, Tab } from "@heroui/react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";

import { cn } from "@heroui/react";

import organisations from "./organisations";

export type CompanyInformationFormProps = React.HTMLAttributes<HTMLFormElement>;

const Identification = React.forwardRef<
	HTMLFormElement,
	CompanyInformationFormProps
>(({ className, ...props }, ref) => {
	const inputProps: Pick<InputProps, "labelPlacement" | "classNames"> = {
		labelPlacement: "outside",
		classNames: {
			label:
				"dark text-small font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
		},
	};

	return (
		<>
			<div className="text-3xl font-bold leading-9 text-default-foreground">
				Welcome to <br /> Growth Meets Capital 👋
			</div>
			<div className="py-2 text-medium text-[#3fafa8]">
				Select your organization to continue.
				<p className="ml-2 text-default-500">
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
					className="col-span-12"
					classNames={{
						cursor: "group-data-[selected=true]:bg-content1 col-span-6",
					}}
				>
					<Tab key="investor" title="Investor" />
					<Tab key="startup" title="Startup" />
				</Tabs>

				<Autocomplete
					className="col-span-12"
					defaultItems={organisations}
					label="Your Organisation"
					labelPlacement="outside"
					placeholder="Type in your organisation name"
				>
					{(organisation) => (
						<AutocompleteItem key={organisation.value}>
							{organisation.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
				<Input
					className="col-span-12"
					label="First Name"
					name="first-name"
					placeholder="Type your first name here"
					{...inputProps}
				/>

				<Input
					className="col-span-12 "
					label="Email"
					name="email"
					placeholder="john.doe@gmail.com"
					type="email"
					{...inputProps}
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

				{/* <Checkbox
					defaultSelected
					className="col-span-12 m-0 p-2 text-left text-[#0a6dad]"
					color="primary"
					name="terms-and-privacy-agreement"
					size="md"
				>
					I read and agree with the
					<Link className="mx-1 text-[#3fafa8] underline" href="#" size="md">
						Terms
					</Link>
					<span>and</span>
					<Link className="ml-1 text-[#3fafa8] underline" href="#" size="md">
						Privacy Policy
					</Link>
					.
				</Checkbox> */}
			</form>
		</>
	);
});

Identification.displayName = "Identification";

export default Identification;
