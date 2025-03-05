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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		onClose();
	};

	const handleChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};
	console.log(formData);
	return (
		<Form onSubmit={handleSubmit} className="space-y-4 items-center ">
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
						<CustomRadio description="" value="investor" className="w-full">
							Investor
						</CustomRadio>
						<CustomRadio description="" value="startup" className="w-full">
							Startup
						</CustomRadio>
					</div>
				</RadioGroup>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input
						label="First name"
						placeholder="Enter your first name"
						isRequired
						value={formData.firstName}
						onValueChange={(value) => handleChange("firstName", value)}
						size="lg"
						labelPlacement="outside"
					/>
					<Input
						label="Last name"
						placeholder="Enter your last name"
						isRequired
						value={formData.lastName}
						onValueChange={(value) => handleChange("lastName", value)}
						size="lg"
						labelPlacement="outside"
					/>
				</div>

				<Input
					label="Company name"
					placeholder="Enter your company name"
					isRequired
					value={formData.companyName}
					onValueChange={(value) => handleChange("companyName", value)}
					size="lg"
					labelPlacement="outside"
				/>

				<Input
					label="Position"
					placeholder="Enter your position"
					isRequired
					value={formData.position}
					onValueChange={(value) => handleChange("position", value)}
					size="lg"
					labelPlacement="outside"
				/>

				<Input
					label="Company website"
					placeholder="https://example.com"
					type="string"
					isRequired
					value={formData.website}
					onValueChange={(value) => handleChange("website", value)}
					size="lg"
					labelPlacement="outside"
				/>

				<Input
					label="Email address"
					placeholder="you@example.com"
					type="email"
					isRequired
					value={formData.email}
					onValueChange={(value) => handleChange("email", value)}
					size="lg"
					labelPlacement="outside"
				/>

				<div className="flex items-end gap-2">
					<Input
						label="Phone"
						placeholder="+44 123 456 789"
						type="tel"
						isRequired
						className="flex-1"
						value={formData.phone}
						onValueChange={(value) => handleChange("phone", value)}
						size="lg"
						labelPlacement="outside"
					/>
				</div>
				<Checkbox
					defaultSelected
					size="md"
					aria-label="Agree to terms and conditions"
					required
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
