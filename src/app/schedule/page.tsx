import CourseCreator from "@/components/courses/creator";
import { CourseList } from "@/components/courses/list";
import { getSession } from "@/lib/api";
import { Suspense } from "react";

const SchedulePage = async () => {
	const session = await getSession();

	return (
		<div>
			<h2>UserID: {session.userId}</h2>

			<h2 className="font-bold text-xl">Courses</h2>
			<Suspense fallback={<p>Loading courses...</p>}>
				<CourseList />
			</Suspense>
			<CourseCreator />
		</div>
	);
};

export default SchedulePage;
