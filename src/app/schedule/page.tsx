import CourseCreator from "@/components/courses/creator";
import { CourseList } from "@/components/courses/list";
import { UserInformation } from "@/components/user-information";
import { verifySession } from "@/session";

const SchedulePage = async () => {
	const session = await verifySession();

	return (
		<div className="max-w-screen md:max-w-8xl">
			<div className="mx-auto px-4 sm:max-w-xl lg:max-w-2xl">
				<header className="max-w-2xl mx-auto my-6">
					<h1 className="text-center text-4xl font-bold">
						TideEmit
					</h1>
				</header>
			</div>
			<div className="grid grid-cols-1 auto-rows-auto md:grid-cols-2 md:grid-rows-1 md:gap-8 sm:max-w-2xl md:max-w-3xl lg:max-w-6xl mx-auto px-4">
				<section>
					<UserInformation
						scheduleLink={session?.scheduleLink}
						userId={session.userId}
					/>
				</section>
				<section className="not-md:mt-8">
					<div>
						<h2 className="text-xl font-bold">Dina kurser</h2>
						<CourseList />
					</div>
					<div className="mt-6">
						<h2 className="text-xl font-bold">Lägg till kurs</h2>
						<CourseCreator />
					</div>
				</section>
			</div>
		</div>
	);
};

export default SchedulePage;
