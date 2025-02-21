"use client";

import React from "react";
import { domAnimation, LazyMotion, m } from "framer-motion";

import MultistepSidebar from "./multistep-sidebar";
import Identification from "./identification";
import Preferences from "./preferences";
import Backup from "./backup";
import MultistepNavigationButtons from "./multistep-navigation-buttons";

import { Header } from "../components/Header";

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

	const paginate = React.useCallback((newDirection: number) => {
		setPage((prev) => {
			const nextPage = prev[0] + newDirection;

			if (nextPage < 0 || nextPage > 3) return prev;

			return [nextPage, newDirection];
		});
	}, []);

	const onChangePage = React.useCallback((newPage: number) => {
		setPage((prev) => {
			if (newPage < 0 || newPage > 3) return prev;
			const currentPage = prev[0];

			return [newPage, newPage > currentPage ? 1 : -1];
		});
	}, []);

	const onBack = React.useCallback(() => {
		paginate(-1);
	}, [paginate]);

	const onNext = React.useCallback(() => {
		paginate(1);
	}, [paginate]);

	const content = React.useMemo(() => {
		let component = <Identification />;

		switch (page) {
			case 1:
				component = <Preferences />;
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
	}, [direction, page]);

	return (
		<main className="dark h-screen ">
			<Header />
			<div className="items-center container ">
				<MultistepSidebar
					currentPage={page}
					onBack={onBack}
					onChangePage={onChangePage}
					onNext={onNext}
				>
					<div className="relative flex h-fit w-full flex-col  text-center lg:h-full lg:justify-center lg:pt-0">
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
							onNext={onNext}
						/>
					</div>
				</MultistepSidebar>
			</div>
		</main>
	);
}
