"use client";

import React from "react";
import { domAnimation, LazyMotion, m } from "framer-motion";

import MultistepSidebar from "./multistep-sidebar";

// the three pages of the form
import Identification from "./1_identification";
import Preferences from "./2_preferences";
import Backup from "./3_backup";

import MultistepNavigationButtons from "./components/multistep-navigation-buttons";

import { FormOrgType } from "./types";
import { Header } from "../components/Header";

import { easeInOut, motion } from "framer-motion";
import blob from "@/app/assets/blob.png";

import { addToast, Button } from "@heroui/react";

import { redirect } from "next/navigation";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@heroui/modal";
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from "@heroui/table";
import { Divider } from "@heroui/divider";
import { Icon } from "@iconify/react";

const variants = {
	enter: (direction: number) => ({
		y: direction > 0 ? 30 : -30,
		opacity: 0,
	}),
	center: {
		zIndex: 1,
		y: 0,
		opacity: 1,
	},
	exit: (direction: number) => ({
		zIndex: 0,
		y: direction < 0 ? 30 : -30,
		opacity: 0,
	}),
};

export default function Fillout() {
	const [[page, direction], setPage] = React.useState([0, 0]);

	const [formValues, setFormValues] = React.useState({
		name: "",
		email: "",
		organisation: undefined as FormOrgType | undefined,
		preferences: Array(10).fill(""),
		backup: Array(14).fill(""),
	});

	const setFormPreference = (index: number, value: string) => {
		setFormValues((prev) => {
			const updatedPreferences = [...prev.preferences];
			updatedPreferences[index] = value;
			return { ...prev, preferences: updatedPreferences };
		});
	};

	const setFormBackup = (index: number, value: string) => {
		setFormValues((prev) => {
			const updatedBackups = [...prev.backup];
			updatedBackups[index] = value;
			return { ...prev, backup: updatedBackups };
		});
	};

	const cleanName = formValues.name.replace(/^"|"$/g, "").trim();

	const handleSubmit = React.useCallback(async () => {
		// Get non-empty values from backup
		const nonEmptyBackupValues = formValues.backup.filter(
			(value) => value !== ""
		);

		// If there are any non-empty backup values, add them to preferences
		if (nonEmptyBackupValues.length > 0) {
			setFormValues((prev) => ({
				...prev,
				preferences: [...prev.preferences, ...nonEmptyBackupValues], // Update preferences state directly
			}));
		}

		// Make sure the preferences state is updated correctly before logging
		const updatedPreferencesData = [
			...formValues.preferences,
			...nonEmptyBackupValues,
		];

		// Create an object for the preferences (preference1, preference2, ..., preference24)
		const preferencesData = updatedPreferencesData.reduce(
			(acc, value, index) => {
				acc[`Preference ${index + 1}`] = value || ""; // If preference is empty, set it to an empty string
				return acc;
			},
			{}
		);

		// Ensure that we have 24 preferences (fill with empty strings if necessary)
		for (let i = updatedPreferencesData.length; i < 24; i++) {
			preferencesData[`Preference ${i + 1}`] = "";
		}

		// Now, prepare the data to be sent to Airtable
		const dataToSend = {
			Organisation: formValues.organisation, // Assuming this is an object with the required field(s)
			Name: cleanName,
			Email: formValues.email,
			...preferencesData, // Include the preferences dynamically
		};

		try {
			const request = await fetch("/api/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataToSend), // Send the transformed data
			});

			const result = await request.json();

			if (result.data !== "ok") {
				console.log("Error submitting form values", result.error);
			} else {
				console.log("Form submitted successfully");
			}
		} catch (error) {
			console.error("Error in submitting form:", error);
		}
	}, [formValues, cleanName]);
	const paginate = React.useCallback((newDirection: number) => {
		setPage((prev) => {
			const nextPage = prev[0] + newDirection;

			if (nextPage < 0 || nextPage > 3) return prev;

			return [nextPage, newDirection];
		});
	}, []);

	const [toastTriggered, setToastTriggered] = React.useState(false); // Step 1: State for triggering toast

	const showToast = React.useCallback(() => {
		setToastTriggered(true);
	}, []);

	React.useEffect(() => {
		if (toastTriggered) {
			addToast({
				title: "Missing fields",
				description: "Please fill out all the required fields.",
				color: "warning",
				variant: "flat",
				timeout: 3000,
			});
			setToastTriggered(false); // Reset the state to not show toast again
		}
	}, [toastTriggered]); // This effect runs when toastTriggered changes

	const onChangePage = React.useCallback(
		(newPage: number) => {
			setPage((prev) => {
				const currentPage = prev[0];

				// Validation logic before moving to a new page
				const isPageValid = (page: number) => {
					if (page === 0) {
						return (
							formValues.name !== "" &&
							formValues.email !== "" &&
							formValues.organisation !== undefined
						);
					} else if (page === 1) {
						return formValues.preferences.every(
							(preference) => preference !== ""
						);
					} else {
						return true; // No validation for page 2
					}
				};

				// Prevent navigation and show toast if validation fails
				if (newPage > currentPage && !isPageValid(currentPage)) {
					showToast();
					return prev;
				}

				// Prevent out-of-bounds navigation
				if (newPage < 0 || newPage > 3) return prev;

				return [newPage, newPage > currentPage ? 1 : -1];
			});
		},
		[formValues, showToast]
	);

	const onBack = React.useCallback(() => {
		paginate(-1);
	}, [paginate]);

	const onNext = React.useCallback(() => {
		const validateForm = () => {
			console.log(formValues);
			if (page === 0) {
				// Check if name, email, and organisation are valid (not empty or undefined)
				return (
					formValues.name !== "" &&
					formValues.email !== "" &&
					formValues.organisation !== undefined
				);
			} else if (page === 1) {
				// Check if preferences are valid (not empty)
				return formValues.preferences.every((preference) => preference !== "");
			} else {
				// Page 2 doesn't need validation, just continue
				return true;
			}
		};

		if (validateForm()) {
			if (page === 2) {
				handleSubmit(); // Submit form and add backup values to preferences here
			} else {
				paginate(1); // Move to the next page
			}
		} else {
			showToast();
		}
	}, [paginate, page, formValues, showToast, handleSubmit]);

	const { isOpen, onOpen } = useDisclosure();

	const handleClose = (isOpen: boolean) => {
		if (!isOpen) {
			addToast({
				title: formValues.organisation,
				description: "Your form was submitted successfully",
				color: "success",
				timeout: 3000,
			});
			redirect("/");
		}
	};

	const content = React.useMemo(() => {
		let component = (
			<Identification
				idName={formValues.name}
				setFormName={(name) => setFormValues((prev) => ({ ...prev, name }))}
				idEmail={formValues.email}
				setFormEmail={(email) => setFormValues((prev) => ({ ...prev, email }))}
				idOrg={formValues.organisation}
				setFormOrg={(org) =>
					setFormValues((prev) => ({ ...prev, organisation: org }))
				}
			/>
		);

		switch (page) {
			case 1:
				component = (
					<Preferences
						preferences={formValues.preferences}
						setPreference={setFormPreference}
						excludedOrg={formValues.organisation}
					/>
				);
				break;
			case 2:
				component = (
					<Backup
						preferences={formValues.preferences}
						backups={formValues.backup}
						setBackup={setFormBackup}
						excludedOrg={formValues.organisation}
					/>
				);
				break;
		}

		return (
			<LazyMotion features={domAnimation}>
				<m.div
					key={page}
					animate="center"
					className="col-span-12"
					custom={direction}
					exit="exit"
					initial="exit"
					transition={{
						y: {
							ease: "backOut",
							duration: 0.35,
						},
						opacity: { duration: 0.4 },
					}}
					variants={variants}
				>
					{component}
				</m.div>
			</LazyMotion>
		);
	}, [direction, page, formValues, setFormValues]);

	return (
		<main className="dark h-screen overflow-y-auto bg-black relative overflow-hidden">
			<Header />
			<div className="items-center container  flex">
				<MultistepSidebar
					currentPage={page}
					onBack={onBack}
					onChangePage={onChangePage}
					onNext={
						page === 2
							? () => {
									handleSubmit();
									onOpen();
							  }
							: onNext
					}
				>
					<div className="relative lg:h-full flex w-full flex-col text-center lg:justify-center lg:pt-0 ">
						{content}
						<MultistepNavigationButtons
							backButtonProps={{ isDisabled: page === 0 }}
							className="hidden justify-start lg:flex"
							nextButtonProps={{
								children:
									page === 0
										? "Confirm Identity"
										: page === 1
										? "Confirm Preferences"
										: page === 2
										? "Submit your preferences"
										: "",
							}}
							onBack={onBack}
							onNext={
								page === 2
									? () => {
											handleSubmit(); // if you still want to call the handleSubmit function
											onOpen();
									  }
									: onNext
							}
						/>
					</div>
				</MultistepSidebar>
			</div>
			<motion.img
				src={blob.src}
				alt="img"
				className="md:block md:absolute md:h-[1000px] md:w-auto md:max-w-none md:left-80 lg:left-[1000px] md:top-0 hidden hover:opacity-40 duration-300 opacity-60 z-0"
				animate={{ translateY: [-100, -280] }}
				transition={{
					repeat: Infinity,
					repeatType: "mirror",
					duration: 3,
					ease: easeInOut,
				}}
			/>
			<Modal isOpen={isOpen} onOpenChange={handleClose} backdrop="blur">
				<ModalContent>
					{(onClose) => (
						<div className="flex w-full flex-col items-center gap-5 rounded-large bg-default-50 pt-8 pb-4 shadow-small">
							<div className="flex w-full flex-col items-center px-8">
								<ModalHeader className="flex flex-col items-center m-5 text-center font-normal text-2xl">
									<Icon
										className="mb-3 text-success-500"
										icon="solar:check-circle-bold-duotone"
										width={56}
									/>
									<p className="mb-2 text-base font-medium">
										Thank you{" "}
										<span className="font-black ">{formValues.name}</span>!{" "}
										<br /> The results for{" "}
										<span className="font-black text-success/85">
											{formValues.organisation}
										</span>{" "}
										are saved!
									</p>
									<p className="text-center text-small text-default-500">
										Your timetable will be emailed to{" "}
										<span className="font-black">{formValues.email} </span> as
										soon as possible.
									</p>
								</ModalHeader>
							</div>
							<Divider className="w-full bg-default-200" />
							<ModalBody className="text-left w-full">
								{/* <p></p> */}
								<div className="text-[15px]">
									<div className="text-center">
										<p className="pt-5">Your chosen preferences:</p>
									</div>
									<div>
										<Table
											aria-label="Preferences Table"
											className="mt-3 overflow-y-auto sm:max-h-[300px]"
										>
											<TableHeader>
												<TableColumn>#</TableColumn>
												<TableColumn>Preference</TableColumn>
											</TableHeader>
											<TableBody>
												{formValues.preferences.map((preference, index) => (
													<TableRow key={index}>
														<TableCell>{index + 1}</TableCell>
														<TableCell>{preference}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color="success"
									variant="light"
									onPress={onClose}
									size="lg"
								>
									{" "}
									Close
								</Button>
							</ModalFooter>
						</div>
					)}
				</ModalContent>
			</Modal>
		</main>
	);
}
