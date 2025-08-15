"use client";

import { createCourse } from "@/lib/api";
import { useActionState } from "react";

const CourseCreator = () => {
	// TODO: Form validation through state
	const [state, action, pending] = useActionState(createCourse, null);

	return (
		<form action={action} className="py-2 space-y-2">
			<h2 className="font-bold text-xl">Create new course</h2>
			<label className="block font-bold" htmlFor="code">
				Code:
			</label>
			<input
				className="block p-2 border rounded font-mono font-co"
				type="text"
				name="code"
				id="code"
				placeholder="TATB01"
				maxLength={6}
			/>
			<label className="block font-bold" htmlFor="name">
				Name:
			</label>
			<input
				className="block p-2 border rounded"
				type="text"
				name="name"
				id="name"
				placeholder="Grunken"
			/>
			<button
				className="block p-2 border rounded cursor-pointer bg-gray-200 hover:bg-gray-300"
				type="submit"
				disabled={pending}
			>
				{!pending ? "Create course" : "Creating course..."}
			</button>
		</form>
	);
};

export default CourseCreator;
