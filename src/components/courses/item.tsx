"use client";

import { deleteCourse } from "@/lib/api";
import { CourseInfo } from "@/types";
import { useActionState } from "react";

export const InlineCourse = ({ code, name }: CourseInfo) => {
	const [, action, pending] = useActionState(
		() => deleteCourse(code),
		void 0
	);

	return (
		<tr className="p-2 border rounded">
			<td className="p-2">
				<p className="font-mono font-bold">{code}</p>
			</td>
			<td className="p-2">{name}</td>
			<td className="p-2">
				<form action={action}>
					<input type="hidden" name="code" value={code} />
					<button
						className="p-1 rounded border bg-gray-200 hover:bg-red-500 hover:text-white cursor-pointer"
						disabled={pending}
						type="submit"
					>
						{!pending ? "Delete" : "Deleting..."}
					</button>
				</form>
			</td>
		</tr>
	);
};
