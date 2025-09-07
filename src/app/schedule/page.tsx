import CourseCreator from "@/components/courses/creator";
import { CourseList } from "@/components/courses/list";
import { UserInformation } from "@/components/user-information";
import { verifySession } from "@/session";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Skapa schema",
};

const SchedulePage = async () => {
	const session = await verifySession();

	return (
		<div className="max-w-screen md:max-w-8xl">
			<div className="mx-auto px-4 sm:max-w-xl lg:max-w-2xl">
				<header className="max-w-2xl mx-auto my-6">
					<h1 className="font-sans text-center text-4xl font-bold">
						TideEmit
					</h1>
				</header>
			</div>
			<div className="grid grid-cols-1 auto-rows-auto md:grid-cols-2 md:grid-rows-1 gap-4 sm:max-w-2xl md:max-w-3xl lg:max-w-6xl mx-auto px-4">
				<section className="order-1 md:-order-1">
					<UserInformation
						scheduleLink={session.scheduleLink}
						userId={session.userId}
					/>
				</section>
				<section className="-order-1 md:order-1">
					<h2 className="text-lg font-bold">Dina kurser</h2>
					<CourseList />
					<CourseCreator />
				</section>
			</div>
		</div>
	);
};

export default SchedulePage;
