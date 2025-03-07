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
} from "@heroui/react";
import { HandCoins, Rocket } from "lucide-react";

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
		industry: "",
		investmentFocus: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevent default form submission behavior

		// Check if any field is empty
		const isFormValid = Object.values(formData).every(
			(value) => value.trim() !== ""
		);

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
					Industry: formData.industry,
					InvestmentFocus: formData.investmentFocus,
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
	console.log(formData);
	return (
		<Form
			onSubmit={handleSubmit}
			className="space-y-4 items-center align-middle "
		>
			<ModalHeader className="pb-8 pt-4">
				{" "}
				{/* Add padding-top */}
				<div className="flex flex-col gap-2 justify-between align-middle items-center w-full mt-4">
					<h2 className="text-2xl font-bold">Join the Waitlist</h2>

					<p className="text-default-600 font-normal text-center max-w-lg">
						Complete the form below to join the waitlist for Growth Meets
						Capital 2025 side event.
					</p>
				</div>
			</ModalHeader>
			<div className="flex flex-col justify-between gap-4 w-full md:px-2 sm:px-1">
				<RadioGroup
					description=""
					label="Are you an investor or a startup?"
					isRequired
					className="w-full"
					defaultValue={formData.type}
					onValueChange={(value) => handleChange("type", value)}
				>
					<div className="flex flex-row  w-fill justify-between sm:gap-2 md:gap-4 mb-1">
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
							label="Current Stage"
							placeholder="Enter your company stage"
							isRequired
							size="lg"
							value={formData.stage}
							onChange={(e) => handleChange("stage", e.target.value)}
						>
							<SelectItem key="Pre-seed">Pre-seed</SelectItem>
							<SelectItem key="Seed">Seed</SelectItem>
							<SelectItem key="Series A">Series A</SelectItem>
							<SelectItem key="Series B">Series B</SelectItem>
							<SelectItem key="Series C or above">Series C or above</SelectItem>
						</Select>

						<Input
							label="Industry"
							placeholder="Enter your industry"
							size="lg"
							isRequired
							value={formData.industry}
							onValueChange={(value) => handleChange("industry", value)}
						/>
						<Switch
							onValueChange={(value) => handleChange("fundraising", value)}
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
				<Checkbox
					defaultSelected
					size="md"
					aria-label="Agree to terms and conditions"
					isRequired
					className=""
				>
					{" "}
					Agree to terms and conditions{" "}
				</Checkbox>
			</div>

			<ModalFooter>
				<Button color="danger" variant="light" onPress={onClose}>
					Cancel
				</Button>
				<Button color="primary" type="submit">
					Submit
				</Button>
			</ModalFooter>
		</Form>
	);
}
