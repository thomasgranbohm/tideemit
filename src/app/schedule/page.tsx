import CoursesView from "@/components/CoursesView";
import { createCourse, getCourses, getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const SchedulePage = async () => {
	const session = await getSession();
	const courses = getCourses();

	return (
		<div>
			<h2>UserID: {session.userId}</h2>
			<Suspense fallback={<div>Loading...</div>}>
				<CoursesView courses={courses} />

				<form
					action={async (formData) => {
						"use server";
						await createCourse(formData);
						redirect("/schedule");
					}}
					className="py-2 space-y-2"
				>
					<h2 className="font-bold text-xl">Create new course</h2>
					<label className="block font-bold" htmlFor="code">
						Code:
					</label>
					<input
						className="block p-2 border rounded font-mono"
						type="text"
						name="code"
						id="code"
						placeholder="TATB01"
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
					>
						Create course
					</button>
				</form>
			</Suspense>
		</div>
	);
};

export default SchedulePage;
