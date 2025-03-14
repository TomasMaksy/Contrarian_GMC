import React from "react";
import {
	Button,
	Input,
	Checkbox,
	Form,
	ModalFooter,
	Radio,
	cn,
	RadioGroup,
	RadioProps,
	addToast,
	ModalHeader,
	Select,
	SelectItem,
	Switch,
	Tabs,
	Tab,
	ModalBody,
} from "@heroui/react";

import { HandCoins, Rocket, DollarSign, X } from "lucide-react";

import { useState } from "react";

interface ContactFormProps {
	onClose: () => void;
}

export const CustomRadio = (
	props: RadioProps & { children: React.ReactNode }
) => {
	const { children, ...otherProps } = props;

	return (
		<Radio
			{...otherProps}
			classNames={{
				base: cn(
					"inline-flex m-0 bg-content2 hover:bg-content3 items-center justify-between",
					"flex-row-reverse max-w-[300px] cursor-pointer rounded-xl gap-4 sm:p-3 md:p-4 border-2 border-transparent",
					"data-[selected=true]:border-primary"
				),
			}}
		>
			{children}
		</Radio>
	);
};

export default function WaitlistForm({ onClose }: ContactFormProps) {
	const [selected, setSelected] = React.useState("no");

	const [agreed, setAgreed] = useState(true);
	const [error, setError] = useState("");

	const handleChangeCheckbox = (value: boolean) => {
		setAgreed(value);
		if (!value) {
			setError("You must accept terms and conditions to join the waitlist");
		} else {
			setError("");
		}
	};
	const [formData, setFormData] = React.useState({
		type: "",
		firstName: "",
		lastName: "",
		companyName: "",
		position: "",
		website: "",
		email: "",
		phone: "",
		stage: "",
		fundraising: "",
		nominatedCompanyName: "",
		nominatedCompanyStage: "",
		nominatedCompanyFounder: "",
		nominatedCompanyFounderEmail: "",
	});

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevent default form submission behavior

		setLoading(true);

		// Check if any field is empty, except for current stage and fundraising
		const isFormValid = Object.entries(formData).every(([key, value]) => {
			if (
				key === "stage" ||
				key === "fundraising" ||
				key === "nominatedCompanyStage" ||
				key === "nominatedCompanyFounder" ||
				key === "nominatedCompanyFounderEmail" ||
				key === "nominatedCompanyName"
			) {
				return true; // Allow empty for these fields
			}
			return typeof value === "string" ? value.trim() !== "" : value !== "";
		});

		if (!isFormValid) {
			addToast({
				title: "Missing fields",
				description: "Please fill out all the required fields.",
				color: "danger",
				variant: "flat",
				timeout: 3000,
			});
			return;
		}

		try {
			const response = await fetch("/api/submit_waitlist_form", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					Type: formData.type,
					FirstName: formData.firstName,
					LastName: formData.lastName,
					Position: formData.position,
					CompanyName: formData.companyName,
					Phone: formData.phone,
					Website: formData.website,
					Email: formData.email,
					Stage: formData.stage,
					Fundraising: formData.fundraising,
					NominatedCompanyName: formData.nominatedCompanyName,
					NominatedCompanyStage: formData.nominatedCompanyStage,
					NominatedCompanyFounder: formData.nominatedCompanyFounder,
					NominatedCompanyFounderEmail: formData.nominatedCompanyFounderEmail,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				addToast({
					title: "Success",
					description: "Form submitted successfully!",
					color: "success",
					variant: "flat",
					timeout: 3000,
				});
				setLoading(false);
				onClose(); // Close modal
			} else {
				throw new Error(data.error || "Submission failed");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			addToast({
				title: "Error",
				description: "Something went wrong. Please try again.",
				color: "danger",
				variant: "flat",
				timeout: 3000,
			});
		}
	};
	const handleChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<Form
			onSubmit={handleSubmit}
			className="space-y-4 items-center align-middle h-auto flex"
		>
			<ModalHeader className="pb-4 pt-4">
				{" "}
				{/* Add padding-top */}
				<div className="flex flex-col gap-2 justify-between align-middle items-center w-full mt-6">
					<h2 className="text-2xl font-bold text-primary tracking-tight">
						Join the Waitlist
					</h2>

					<p className="text-default-500 font-normal text-center max-w-lg text-small">
						Complete the form below to join the waitlist for Growth Meets
						Capital 2025 side event.
					</p>
				</div>
			</ModalHeader>
			<ModalBody className="flex h-auto">
				<RadioGroup
					description=""
					label="Are you an investor or a startup?"
					isRequired
					className="w-full"
					defaultValue={formData.type}
					onValueChange={(value) => handleChange("type", value)}
				>
					<div className="flex flex-row  w-fill justify-between sm:gap-2 md:gap-4 mb-1 h-auto">
						<CustomRadio
							// description="Join as an investor"
							value="Investor"
							className="w-full"
						>
							<div className="flex flex-row items-center align-middle gap-2">
								<HandCoins size={18} color="#f0f0f0" strokeWidth="1.5" />
								<p>Investor</p>
							</div>
						</CustomRadio>
						<CustomRadio
							// description="Join as a startup"
							value="Startup"
							className="w-full"
						>
							<div className="flex flex-row items-center align-middle gap-2">
								<Rocket size={18} color="#f0f0f0" strokeWidth="1.5" />
								<p>Startup</p>
							</div>
						</CustomRadio>
					</div>
				</RadioGroup>

				<Input
					label="Company name"
					placeholder="Enter your company name"
					isRequired
					value={formData.companyName}
					onValueChange={(value) => handleChange("companyName", value)}
					size="lg"
				/>
				{/* Conditionally render startup-specific fields */}
				{formData.type === "Startup" && (
					<>
						<Select
							label="Current stage"
							placeholder="Enter your company stage"
							isRequired
							size="lg"
							value={formData.stage}
							onChange={(e) => handleChange("stage", e.target.value)}
						>
							{/* <SelectItem key="Pre-seed">Pre-seed</SelectItem>
							<SelectItem key="Seed">Seed</SelectItem> */}
							<SelectItem key="Series A">Series A</SelectItem>
							<SelectItem key="Series B">Series B</SelectItem>
							<SelectItem key="Series C or above">Series C or above</SelectItem>
						</Select>

						<Switch
							thumbIcon={({ isSelected, className }) =>
								isSelected ? (
									<DollarSign className={className} size={16} color="#3fafa8" />
								) : (
									<X className={className} size={16} color="#3fafa8" />
								)
							}
							onValueChange={(isSelected) =>
								handleChange("fundraising", isSelected ? "Yes" : "No")
							}
						>
							<p className="text-default-600">Fundraising this year?</p>
						</Switch>
					</>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input
						label="First name"
						placeholder="Enter your first name"
						isRequired
						value={formData.firstName}
						onValueChange={(value) => handleChange("firstName", value)}
						size="lg"
					/>
					<Input
						label="Last name"
						placeholder="Enter your last name"
						isRequired
						value={formData.lastName}
						onValueChange={(value) => handleChange("lastName", value)}
						size="lg"
					/>
				</div>

				<Input
					label="Position"
					placeholder="Enter your position"
					isRequired
					value={formData.position}
					onValueChange={(value) => handleChange("position", value)}
					size="lg"
				/>

				<Input
					label="Company website"
					placeholder="https://example.com"
					type="string"
					isRequired
					value={formData.website}
					onValueChange={(value) => handleChange("website", value)}
					size="lg"
				/>

				<Input
					label="Email address"
					placeholder="you@example.com"
					type="email"
					isRequired
					value={formData.email}
					onValueChange={(value) => handleChange("email", value)}
					size="lg"
				/>

				<div className="flex items-end gap-2">
					<Input
						label="Phone number"
						placeholder="+44 123 456 789"
						type="tel"
						isRequired
						className="flex-1"
						value={formData.phone}
						onValueChange={(value) => handleChange("phone", value)}
						size="lg"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<p className="text-default-600 p-1 leading-tight font-semibold">
						Do you have a company that you would like to{" "}
						<span className="text-primary font-black ">invite/nominate</span> to
						join the event? <br />
						<span className="text-tiny text-default-500 leading-[1.25] font-normal block">
							{" "}
							Only startups that have secured funding at the Series A stage or
							beyond are eligible to be nominated.
						</span>
					</p>

					<Tabs
						fullWidth
						aria-label="Tabs form"
						selectedKey={selected}
						size="md"
						onSelectionChange={(key) => setSelected(key as string)}
					>
						<Tab key="no" title="No"></Tab>
						<Tab key="yes" title="Yes">
							<div className="flex flex-col gap-3">
								<Input
									label="Nominee company name"
									placeholder="Enter nominee company name"
									type="string"
									value={formData.nominatedCompanyName}
									onValueChange={(value) =>
										handleChange("nominatedCompanyName", value)
									}
									size="lg"
									isRequired
								/>
								<Select
									label="Nominee company stage"
									placeholder="Enter nominee company stage"
									size="lg"
									isRequired
									value={formData.nominatedCompanyStage}
									onChange={(e) =>
										handleChange("nominatedCompanyStage", e.target.value)
									}
								>
									<SelectItem key="Series A">Series A</SelectItem>
									<SelectItem key="Series B">Series B</SelectItem>
									<SelectItem key="Series C or above">
										Series C or above
									</SelectItem>
								</Select>
								<Input
									label="Nominee company founder’s full name"
									placeholder="Founder's full name"
									type="string"
									value={formData.nominatedCompanyFounder}
									onValueChange={(value) =>
										handleChange("nominatedCompanyFounder", value)
									}
									size="lg"
									isRequired
								/>
								<Input
									label="Founder's e-mail address"
									placeholder="founder@example.com"
									type="email"
									value={formData.nominatedCompanyFounderEmail}
									onValueChange={(value) =>
										handleChange("nominatedCompanyFounderEmail", value)
									}
									size="lg"
									isRequired
								/>
							</div>
						</Tab>
					</Tabs>
				</div>
				<div>
					<Checkbox
						isSelected={agreed}
						onValueChange={handleChangeCheckbox}
						size="md"
						aria-label="Agree to terms and conditions"
						isRequired
					>
						<span className="leading-[1.15] block pl-1">
							I understand and agree that my personal data might be used for
							Energy Tech Summit marketing purposes{" "}
						</span>
					</Checkbox>
					{error && <p className="text-danger text-sm">{error}</p>}
				</div>
			</ModalBody>
			<ModalFooter>
				<Button color="danger" variant="light" onPress={onClose}>
					Cancel
				</Button>
				<Button
					color="primary"
					variant="shadow"
					type="submit"
					isLoading={loading}
				>
					{/* {loading && (
						<CircularProgress
							aria-label="Loading..."
							size="sm"
							color="primary"
						/>
					)} */}
					Submit
				</Button>
			</ModalFooter>
		</Form>
	);
}
