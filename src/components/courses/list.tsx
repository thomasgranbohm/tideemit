import { getCourses } from "@/lib/api";
import { InlineCourse } from "./item";

export const CourseList = async () => {
	const courses = await getCourses();

	return (
		<table className="border-collapse border ">
			<thead>
				<tr>
					<th className="p-2 border">Code</th>
					<th className="p-2 border">Name</th>
					<th className="p-2 border">Action</th>
				</tr>
			</thead>
			<tbody className="list-none">
				{courses.map((info, i) => (
					<InlineCourse key={i} {...info} />
				))}
			</tbody>
		</table>
	);
};
