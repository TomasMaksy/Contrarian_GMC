"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";
import { easeInOut, motion } from "framer-motion";

import SupportCard from "./support-card";
import VerticalSteps from "./vertical-steps";

import Image from "next/image";

import RowSteps from "./row-steps";
import MultistepNavigationButtons from "./multistep-navigation-buttons";

import contrarian_logo from "@/app/assets/Contrarian_logo_white.png";
import bbva_logo from "@/app/assets/BBVA_logo_white.png";

import blob from "@/app/assets/blob.png";

export type MultiStepSidebarProps = React.HTMLAttributes<HTMLDivElement> & {
	currentPage: number;
	onBack: () => void;
	onNext: () => void;
	onChangePage: (page: number) => void;
};

const stepperClasses = cn(
	// dark
	"dark:[--step-color:rgba(255,255,255,0.1)]",
	"dark:[--active-color:hsl(var(--heroui-foreground-600))]",
	"dark:[--active-border-color:rgba(255,255,255,0.5)]",
	"dark:[--inactive-border-color:rgba(255,255,255,0.1)]",
	"dark:[--inactive-bar-color:rgba(255,255,255,0.1)]",
	"dark:[--inactive-color:rgba(255,255,255,0.2)]"
);

const MultiStepSidebar = React.forwardRef<
	HTMLDivElement,
	MultiStepSidebarProps
>(
	(
		{
			children,
			className,
			currentPage,
			onBack,
			onNext,
			onChangePage,
			...props
		},
		ref
	) => {
		return (
			<div
				ref={ref}
				className={cn("flex h-[calc(100vh_-_120px)] w-full gap-x-2", className)}
				{...props}
			>
				<div className=" hidden h-full w-[400px] flex-shrink-0 flex-col justify-between items-start gap-y-8 rounded-large bg-gradient-to-b to-[#0a6dad] via-gray-800 from-[#42bbb2] px-8 py-6 shadow-small lg:flex">
					<div className="flex flex-col items-left gap-4">
						<Button
							className="bg-default-50 text-small font-medium text-default-500 shadow-lg"
							isDisabled={currentPage === 0}
							radius="full"
							variant="flat"
							onPress={onBack}
						>
							<Icon icon="solar:arrow-left-outline" width={18} />
							Back
						</Button>
						<div>
							<div className="text-xl font-medium leading-7 text-default-foreground mt-10">
								Meeting Preferences Form
							</div>
							<div className="mt-1 text-base font-medium leading-6 text-default-500">
								Choose your meeting preferences. Starting from most desired
							</div>
						</div>
						{/* Desktop Steps */}
						<VerticalSteps
							className={stepperClasses}
							color="secondary"
							currentStep={currentPage}
							steps={[
								{
									title: "Let's identify you",
									description: "Select you organisation",
								},
								{
									title: "Meeting preferences",
									description: "Tell us about your business",
								},
							]}
							onStepChange={onChangePage}
						/>
					</div>
					<div className="flex flex-col items-center gap-12">
						<div className="flex flex-row items-center w-full gap-4 opacity-75 w-max">
							<Image
								src={contrarian_logo}
								alt="Contrarian Ventures"
								width={165}
							/>
							<Image src={bbva_logo} alt="BBVA logo" width={120} />
						</div>
						<SupportCard className="w-full backdrop-blur-lg lg:bg-white/40 lg:shadow-none dark:lg:bg-white/20 " />
					</div>
				</div>
				<div className="flex h-full w-full flex-col items-center gap-4 md:p-4">
					<div className="sticky top-0 z-10 w-full rounded-large bg-gradient-to-r from-default-100 via-danger-100 to-secondary-100 py-4 shadow-small md:max-w-xl lg:hidden">
						<div className="flex justify-center">
							{/* Mobile Steps */}
							<RowSteps
								className={cn("pl-6", stepperClasses)}
								currentStep={currentPage}
								steps={[
									{
										title: "Account",
									},
									{
										title: "Information",
									},
								]}
								onStepChange={onChangePage}
							/>
						</div>
					</div>
					<div className="h-full w-full p-4 sm:max-w-md md:max-w-lg">
						{children}
						<MultistepNavigationButtons
							backButtonProps={{ isDisabled: currentPage === 0 }}
							className="lg:hidden"
							nextButtonProps={{
								children:
									currentPage === 0
										? "Sign Up for Free"
										: currentPage === 3
										? "Go to Payment"
										: "Continue",
							}}
							onBack={onBack}
							onNext={onNext}
						/>
						<SupportCard className="mx-auto w-full max-w-[252px] lg:hidden" />
					</div>
				</div>
				<motion.img
					src={blob.src}
					alt="img"
					className="md:block md:absolute md:h-[1000px] md:w-auto md:max-w-none md:left-80 lg:left-[1000px] hidden hover:opacity-15 duration-300 opacity-70"
					animate={{ translateY: [-100, -280] }}
					transition={{
						repeat: Infinity,
						repeatType: "mirror",
						duration: 3,
						ease: easeInOut,
					}}
				/>
			</div>
		);
	}
);

MultiStepSidebar.displayName = "MultiStepSidebar";

export default MultiStepSidebar;
