"use client";

import { deleteCourse } from "@/actions";
import { CourseInfo } from "@/types";
import { TrashIcon } from "lucide-react";

export const InlineCourse = ({ code, name }: CourseInfo) => {
	// FIXME: Toast maybe?
	return (
		<li className="bg-neutral-50 border border-neutral-400 first-of-type:rounded-tl first-of-type:rounded-tr last-of-type:rounded-bl last-of-type:rounded-br not-last-of-type:border-b-0">
			<form
				className="p-4 grid grid-cols-[auto_1fr] relative gap-4 items-center"
				action={deleteCourse}
			>
				<p className="font-mono">{code}</p>
				<p className="font-sans truncate">{name}</p>
				<input type="text" name="code" value={code} readOnly hidden />
				<input type="text" name="name" value={name} readOnly hidden />
				<button
					title="Ta bort kurs"
					className="absolute top-0 right-0 bottom-0 z-10 px-3 my-2 me-2 font-sans rounded cursor-pointer flex items-center gap-2 bg-neutral-50 hover:bg-red-600 hover:text-white after:block after:-z-10 after:absolute after:gradient after:right-full after:top-0 after:bottom-0 after:w-8 after:bg-gradient-to-l after:from-neutral-50 after:from-30% after:to-transparent transition-colors"
				>
					<TrashIcon size={16} />
				</button>
			</form>
		</li>
	);
};
