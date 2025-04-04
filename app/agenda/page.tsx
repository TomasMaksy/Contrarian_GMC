"use client";

import React, { useEffect } from "react";

import { Header } from "../components/Header";
import Footer from "../components/Footer";

import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

const Agenda = () => {
	const controls = useAnimation();
	const { ref: ref2, inView } = useInView({ triggerOnce: true });

	useEffect(() => {
		if (inView) {
			controls.start("visible");
		}
	}, [inView, controls]);
	return (
		<>
			<div>
				<Header />
				<div className="container my-16">
					<motion.div
						ref={ref2}
						initial="hidden"
						animate={controls}
						variants={{
							hidden: { opacity: 0, y: 50 },
							visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
						}}
					>
						<img
							alt="Agenda"
							src="/GMC_agenda_hq.png"
							width={1920}
							height={1080}
							className="w-full h-auto object-cover"
						/>
					</motion.div>
				</div>
				<Footer />
			</div>
			{/* <div className="w-full flex flex-col items-center p-12">
				<VerticalSteps
					steps={[
						{
							starttime: "9:30",
							endtime: "9:35",
							title: "Opening by Contrarian Ventures & BBVA",
							description: "Keynote",
							color: "default",
						},
						{
							starttime: "9:35",
							endtime: "10:20",
							title: "Mornign panel discussion (Startups)",
							description: "Panel",
							color: "primary",
						},
						{
							starttime: "10:30",
							endtime: "10:55",
							title: "Meeting 1",
							description: "GMC Curated Meeting",
							color: "primary",
						},
						{
							starttime: "11:00",
							endtime: "11:25",
							title: "Meeting 2",
							description: "GMC Curated Meeting",
							color: "primary",
						},
						{
							starttime: "11:30",
							endtime: "11:55",
							title: "Meeting 3",
							description: "GMC Curated Meeting",
							color: "primary",
						},
						{
							starttime: "12:00",
							endtime: "12:25",
							title: "Meeting 4",
							description: "GMC Curated Meeting",
							color: "primary",
						},
						{
							starttime: "12:30",
							endtime: "12:55",
							title: "Meeting 5",
							description: "GMC Curated Meeting",
							color: "primary",
						},
						{
							starttime: "13:00",
							endtime: "14:00",
							title: "Networking Lunch",
							description: "Bon ",
							color: "primary",
						},
					]}
				/>
			</div> */}
		</>
	);
};

export default Agenda;
