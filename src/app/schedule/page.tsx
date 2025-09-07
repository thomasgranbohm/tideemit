import CourseCreator from "@/components/courses/creator";
import { CourseList } from "@/components/courses/list";
import { ScheduleLink } from "@/components/schedule-link";
import { verifySession } from "@/session";
import { Container } from "@radix-ui/themes";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Skapa schema",
};

const SchedulePage = async () => {
	const session = await verifySession();

	return (
		<Container size="3">
			<h2>UserID: {session.userId}</h2>

			<h2 className="font-bold text-xl">Courses</h2>
			<Suspense fallback={<p>Loading courses...</p>}>
				<CourseList />
			</Suspense>
			<CourseCreator />
			<ScheduleLink userId={session.userId} />
		</Container>
	);
};

export default SchedulePage;
