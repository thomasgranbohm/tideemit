"use client";

import { deleteCourse } from "@/lib/auth";
import { use, useTransition } from "react";

type CourseInfo = { code: string; name: string };

const InlineCourse = ({ code, name }: CourseInfo) => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = () => {
		startTransition(() => {
			deleteCourse(code);
		});
	};

	return (
		<li className="list-none">
			<b className="font-mono">{code}:</b> {name}
			<button
				className="p-1 rounded border bg-gray-200 hover:bg-red-500 hover:text-white cursor-pointer"
				onClick={handleDelete}
			>
				{isPending ? "Deleting..." : "Delete"}
			</button>
		</li>
	);
};

const CoursesView = ({ courses }: { courses: Promise<CourseInfo[]> }) => {
	const allCourses = use(courses);

	return (
		<div>
			<h2 className="font-bold text-xl">Courses</h2>
			{allCourses.map((info, i) => (
				<InlineCourse key={i} {...info} />
			))}
		</div>
	);
};

export default CoursesView;
