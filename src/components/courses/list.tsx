import { getCourses } from "@/actions";
import { InlineCourse } from "./item";

export const CourseList = async () => {
	const courses = await getCourses();

	return courses.length > 0 ? (
		<ul className="mt-2">
			{courses.map((info, i) => (
				<InlineCourse key={i} {...info} />
			))}
		</ul>
	) : (
		<p className="mt-2 font-sans text-neutral-700 dark:text-neutral-300">
			Du har för närvarande inga kurser. Du kan lägga till din första kurs
			nedan!
		</p>
	);
};
