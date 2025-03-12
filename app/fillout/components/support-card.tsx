"use client";

import React from "react";
import {
	AvatarGroup,
	Avatar,
	Button,
	useDisclosure,
	Drawer,
	DrawerContent,
	DrawerBody,
	DrawerFooter,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";

// Directly import the Hero component
import Hero from "@/app/participants/components/hero";
import { OrganisationTypes } from "@/app/participants/utils/types";

export type SupportCardProps = React.HTMLAttributes<HTMLDivElement> & {
	startups: OrganisationTypes[];
	investors: OrganisationTypes[];
};
const SupportCard = React.forwardRef<HTMLDivElement, SupportCardProps>(
	({ className, startups, investors, ...props }, ref) => {
		const { isOpen, onOpen, onOpenChange } = useDisclosure();

		// Use this state or effect to trigger image/API loading or actions inside Hero
		React.useEffect(() => {
			// You can add any global setup to trigger loading or API calls
			console.log("Hero is ready to start loading resources...");
		}, []);

		return (
			<div
				{...props}
				ref={ref}
				className={cn(
					"align-center mb-2 flex shrink-0 items-center justify-center gap-3 self-stretch rounded-large bg-content1 h-14  shadow-small w-full",
					className
				)}
			>
				<Button
					className="flex justify-between bg-transparent bg-opacity-20 text-tiny font-medium text-default-500 w-full hover:bg-opacity-50 align-middle"
					radius="lg"
					variant="solid"
					onClick={onOpen}
				>
					<AvatarGroup isBordered size="sm">
						<Avatar
							classNames={{
								base: "ring-0 ring-offset-0 w-[35px] h-[35px]",
							}}
							src={"photos/metafuels_logo.jpeg"}
						/>
						<Avatar
							classNames={{
								base: "ring-0 ring-offset-0 w-[35px] h-[35px]",
							}}
							src={"photos/hometree_uk_logo.jpeg"}
						/>
						<Avatar
							classNames={{
								base: "ring-0 ring-offset-0 w-[35px] h-[35px]",
							}}
							src={"photos/chargetrip_logo.jpeg"}
						/>
					</AvatarGroup>
					<div className="line-clamp-2 leading-4 text-left text-small font-medium text-default-700 text-wrap">
						See the participants list
					</div>

					<Icon
						className="text-default-400 dark:text-foreground [&>g>path:nth-child(1)]:stroke-[3px] [&>g>path:nth-child(2)]:stroke-[2.5px]"
						icon="solar:widget-2-linear"
						width={20}
					/>
				</Button>
				<Drawer
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					className="bg-black md:border-2 sm:border-0 border-default-100 shadow-large scrollbar-hide"
					size="lg"
				>
					<DrawerContent className="scrollbar-hide">
						{(onClose) => (
							<>
								<DrawerBody className="scrollbar-hide">
									<main className="dark bg-black flex flex-col">
										{/* Load Hero eagerly */}
										<Hero
											startups={startups}
											investors={investors}
											isDrawer={true}
										/>
									</main>
								</DrawerBody>
								<DrawerFooter className="align-top flex justify-center -mt-2 h-14">
									<Button
										color="danger"
										variant="light"
										onPress={onClose}
										size="sm"
									>
										Close
									</Button>
								</DrawerFooter>
							</>
						)}
					</DrawerContent>
				</Drawer>
			</div>
		);
	}
);

SupportCard.displayName = "SupportCard";

export default SupportCard;
