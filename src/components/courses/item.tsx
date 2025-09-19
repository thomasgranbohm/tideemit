"use client";

import { deleteCourse } from "@/actions";
import { CourseInfo } from "@/types";
import { TrashIcon } from "lucide-react";

export const InlineCourse = ({ code, name }: CourseInfo) => {
	// FIXME: Toast maybe?
	return (
		<li className="bg-background border border-neutral-400 not-last-of-type:border-b-0 first-of-type:rounded-tl first-of-type:rounded-tr last-of-type:rounded-br last-of-type:rounded-bl dark:border-neutral-600">
			<form
				className="relative grid grid-cols-[auto_1fr] items-center gap-4 p-4"
				action={deleteCourse}
			>
				<p className="text-foreground font-mono">{code}</p>
				<p className="text-foreground truncate font-sans">{name}</p>
				<input type="text" name="code" value={code} readOnly hidden />
				<input type="text" name="name" value={name} readOnly hidden />
				<button
					title="Ta bort kurs"
					className="bg-background after:gradient absolute top-0 right-0 bottom-0 z-10 my-2 me-2 flex cursor-pointer items-center gap-2 rounded px-3 font-sans text-black transition-colors after:absolute after:top-0 after:right-full after:bottom-0 after:-z-10 after:block after:w-8 after:bg-gradient-to-l after:from-neutral-50 after:from-30% after:to-transparent hover:bg-red-600 hover:text-white dark:text-neutral-50 dark:after:from-neutral-900"
				>
					<TrashIcon size={16} />
				</button>
			</form>
		</li>
	);
};
