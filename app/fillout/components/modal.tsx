// CustomModal.tsx
import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "@heroui/react"; // adjust to your library

interface CustomModalProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	formValues: {
		organisation: string;
		name: string;
		email: string;
		preferences: string;
	};
	redirect: (path: string) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
	isOpen,
	onOpenChange,
	formValues,
	redirect,
}) => (
	<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
		<ModalContent>
			{(onClose) => (
				<>
					<ModalHeader className="flex flex-col gap-1 m-5 text-center font-normal">
						<span className="font-extrabold text-[#3fafa8]">Thank you!</span>{" "}
						Your results are saved
					</ModalHeader>
					<ModalBody className="text-center">
						<p>Your timetable will be emailed to you as soon as possible</p>
						<div className="mt-8">
							<p className="text-[18px]">
								<span className="font-black text-[16px] text-[#3fafa8]">
									Organisation:
								</span>{" "}
								<br />
								{formValues.organisation} <br />
							</p>
							<p className="text-[18px]">
								<span className="font-black text-[16px] text-[#3fafa8]">
									Name:
								</span>{" "}
								<br />
								{formValues.name} <br />
								<span className="font-black text-[16px] text-[#3fafa8]">
									Email:
								</span>{" "}
								<br />
								{formValues.email} <br />
								<span className="font-black text-[16px] text-[#3fafa8]">
									Preferences:
								</span>{" "}
								<br />
								{formValues.preferences}
							</p>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button
							color="primary"
							variant="light"
							onPress={() => {
								onClose();
								redirect("/");
							}}
						>
							Close
						</Button>
					</ModalFooter>
				</>
			)}
		</ModalContent>
	</Modal>
);

export default CustomModal;
