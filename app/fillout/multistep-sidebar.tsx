"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";

import SupportCard from "./components/support-card";
import VerticalSteps from "./components/vertical-steps";

import Image from "next/image";

import RowSteps from "./components/row-steps";
import MultistepNavigationButtons from "./components/multistep-navigation-buttons";

import contrarian_logo from "@/app/assets/Contrarian_logo_white.png";
import bbva_logo from "@/app/assets/BBVA_logo_white.png";
import { OrganisationTypes } from "../participants/utils/types";

export type MultiStepSidebarProps = React.HTMLAttributes<HTMLDivElement> & {
	currentPage: number;
	onBack: () => void;
	onNext: () => void;
	onChangePage: (page: number) => void;
	investors: OrganisationTypes[];
	startups: OrganisationTypes[];
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
			investors,
			startups,
			...props
		},
		ref
	) => {
		return (
			<div
				ref={ref}
				className={cn(
					"flex md:h-full sm:h-full w-full gap-x-2 overflow-clip z-10 ",
					className
				)}
				{...props}
			>
				<div className=" hidden min-h-[calc(100vh-150px)] w-[400px] flex-shrink-0 flex-col justify-between items-start gap-y-8 rounded-large bg-gradient-to-tl to-[#0a6dad] from-[#42bbb2] px-8 py-6 shadow-small lg:flex">
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
							<div className="mt-1 text-base font-medium leading-6 text-default-700">
								Select organizations you&apos;d like to meet, starting with your
								top priorities.{" "}
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
									description: "Select your organisation",
								},
								{
									title: "Meeting preferences",
									description: "Select your top meeting preferences",
								},
								{
									title: "Backup options",
									description: "Choose backup preferences ",
								},
							]}
							onStepChange={onChangePage}
						/>
					</div>
					<div className="flex flex-col items-center gap-12 w-full">
						<div className="flex flex-row items-center gap-4 opacity-75 w-max">
							<a
								href="https://www.cventures.vc/"
								target="_blank"
								rel="noopener noreferrer"
								className="block "
							>
								<Image
									src={contrarian_logo}
									alt="Contrarian Ventures"
									width={165}
								/>
							</a>
							<a
								href="https://www.bbva.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="block"
							>
								<Image src={bbva_logo} alt="BBVA logo" width={120} />
							</a>
						</div>
						<SupportCard
							startups={startups}
							investors={investors}
							className="w-full backdrop-blur-lg lg:bg-white/40 lg:shadow-none dark:lg:bg-white/20 "
						/>
					</div>
				</div>
				<div className="md:container flex h-full w-full flex-col items-center gap-4 md:p-4">
					<div className=" top-0 z-10 w-full rounded-large bg-gradient-to-tl to-[#0a6dad] via-black-500 from-[#3fafa8] py-4 shadow-small md:max-w-xl lg:hidden ">
						<div className="flex justify-center">
							{/* Mobile Steps */}
							<RowSteps
								className={cn("pl-6", stepperClasses)}
								currentStep={currentPage}
								steps={[
									{
										title: "Identification",
									},
									{
										title: "Preferences",
									},
									{
										title: "Backup",
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
										? "Confirm"
										: currentPage === 1
										? "Confirm Preferences"
										: currentPage === 2
										? "Submit"
										: "",
							}}
							onBack={onBack}
							onNext={onNext}
						/>
						<SupportCard
							startups={startups}
							investors={investors}
							className="mx-auto w-full lg:hidden"
						/>
					</div>
				</div>
			</div>
		);
	}
);

MultiStepSidebar.displayName = "MultiStepSidebar";

export default MultiStepSidebar;
