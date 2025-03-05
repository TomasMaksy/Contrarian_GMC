"use client";

import React from "react";
import { Header } from "@/app/components/Header";
import Hero from "@/app/participants/components/hero";
import Footer from "@/app/components/Footer";

export default function Participants() {
	return (
		<>
			<Header />
			<Hero /> {/* Here, you include the Hero section */}
			<Footer />
		</>
	);
}
