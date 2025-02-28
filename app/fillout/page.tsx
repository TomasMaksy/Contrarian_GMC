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
	/*************  ✨ Codeium Command ⭐  *************/
	/**
 * Generates an exit animation configuration object for Framer Motion.
 *
 * @param {number} direction - The direction of the exit animation. A negative
 * direction will animate the element upwards, while a positive direction will
 * animate it downwards.
 * @returns {Object} - The configuration object for the exit animation, 
/******  ef9ea0aa-1eaf-464e-8f80-f65cbc28626d  *******/
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
	});

	const setFormPreference = (index: number, value: string) => {
		setFormValues((prev) => {
			const updatedPreferences = [...prev.preferences];
			updatedPreferences[index] = value;
			return { ...prev, preferences: updatedPreferences };
		});
	};

	const handleSubmit = React.useCallback(async () => {
		console.log(formValues);
		console.log("Submitted the final form values");
	}, [formValues]);

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

	// Step 2: Use useEffect to show the toast after render
	React.useEffect(() => {
		if (toastTriggered) {
			addToast({
				title: "Missing fields",
				description: "Please fill out all the required fields.",
				color: "warning",
				variant: "flat",
				timeout: 3000, // Ensures the toast auto-closes
			});
			setToastTriggered(false); // Reset state to avoid showing the toast again
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
				// Check if preferences are valid (this can be customized as needed)
				return formValues.preferences.every((preference) => preference !== "");
			} else {
				console.log("passed");
				return true; // Assume no validation needed for page 2 (backup page)
			}
		};

		if (validateForm()) {
			paginate(1);
		} else {
			showToast();
		}
	}, [paginate, page, formValues, showToast]);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
				component = <Backup />;
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
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col m-5 text-center font-normal text-2xl">
								<span className="font-extrabold  text-[#3fafa8] ">
									Thank you!
								</span>{" "}
								Your results are saved
							</ModalHeader>
							<ModalBody className="text-left ">
								{/* <p>Your timetable will be emailed to you as soon as possible</p> */}
								<div className="text-[15px]">
									<p className="">
										<span className=" font-black text-[16px] text-[#3fafa8]">
											Organisation:
										</span>{" "}
										<br />
										{formValues.organisation} <br />
									</p>
									<p className="">
										<span className="font-black text-[16px] text-[#3fafa8]">
											Name:
										</span>
										<br />
										{formValues.name}
										<br />
										<span className="font-black text-[16px] text-[#3fafa8]">
											Email:
										</span>
										<br />
										{formValues.email}
										<br />
									</p>
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
									color="primary"
									variant="light"
									onPress={() => {
										onClose();
										addToast({
											title: formValues.organisation,
											description: "Your form was submitted successfully",
											color: "success",
											timeout: 3000,
										});
										redirect("/");
									}}
								>
									{" "}
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</main>
	);
}
