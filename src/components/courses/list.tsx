import { getCourses } from "@/actions";
import { InlineCourse } from "./item";

export const CourseList = async () => {
	const courses = await getCourses();

	return (
		<ul className="mt-2">
			{courses.map((info, i) => (
				<InlineCourse key={i} {...info} />
			))}
		</ul>
	);
};
