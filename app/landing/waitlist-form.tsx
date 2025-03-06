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
} from "@heroui/react";

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
					"inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
					"flex-row-reverse max-w-[300px] cursor-pointer rounded-xl gap-4 p-4 border-2 border-transparent",
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
			className="space-y-4 items-center align-middle"
		>
			<div className="flex flex-col justify-between gap-4 w-full px-2 ">
				<RadioGroup
					description=""
					label="Are you an investor or a startup?"
					isRequired
					className="w-full"
					defaultValue={formData.type}
					onValueChange={(value) => handleChange("type", value)}
				>
					<div className="flex flex-row w-full justify-between gap-4">
						<CustomRadio description="" value="Investor" className="w-full">
							Investor
						</CustomRadio>
						<CustomRadio description="" value="Startup" className="w-full">
							Startup
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
