"use client";

import React from "react";
import { Form, Input, Button } from "@heroui/react";

const Forma = () => {
	return (
		<div className="flex items-center justify-center p-10 w-screen">
			<Form
				className="w-full max-w-xs flex flex-col gap-4"
				// onReset={() => setAction("reset")}
				// onSubmit={(e) => {
				// 	e.preventDefault();
				// 	let data = Object.fromEntries(new FormData(e.currentTarget));

				// 	setAction(`submit ${JSON.stringify(data)}`);
				// }}
			>
				<Input
					isRequired
					errorMessage="Please enter a valid username"
					label="Username"
					labelPlacement="outside"
					name="username"
					placeholder="Enter your username"
					type="text"
				/>

				<Input
					isRequired
					errorMessage="Please enter a valid email"
					label="Email"
					labelPlacement="outside"
					name="email"
					placeholder="Enter your email"
					type="email"
				/>
				<div className="flex gap-2">
					<Button color="primary" type="submit">
						Submit
					</Button>
					<Button type="reset" variant="flat">
						Reset
					</Button>
				</div>
				{/* {action && (
					<div className="text-small text-default-500">
						Action: <code>{action}</code>
					</div>
				)} */}
			</Form>
		</div>
	);
};

export default Forma;
