import CourseCreator from "@/components/courses/creator";
import { CourseList } from "@/components/courses/list";
import { UserInformation } from "@/components/user-information";
import { verifySession } from "@/session";

const SchedulePage = async () => {
	const session = await verifySession();

	return (
		<div className="md:max-w-8xl max-w-screen">
			<div className="mx-auto px-4 sm:max-w-xl lg:max-w-2xl">
				<header className="mx-auto my-6 max-w-2xl">
					<h1 className="text-center font-sans text-4xl font-bold text-black lg:text-5xl dark:text-neutral-50">
						TideEmit
					</h1>
				</header>
			</div>
			<div className="mx-auto grid auto-rows-auto grid-cols-1 px-4 sm:max-w-2xl md:max-w-3xl md:grid-cols-2 md:grid-rows-1 md:gap-8 lg:max-w-6xl">
				<section>
					<div>
						<h2 className="font-sans text-xl font-bold text-black dark:text-neutral-50">
							Dina kurser
						</h2>
						<CourseList />
					</div>
					<div className="mt-6">
						<h2 className="font-sans text-xl font-bold text-black dark:text-neutral-50">
							Lägg till kurs
						</h2>
						<CourseCreator />
					</div>
				</section>
				<section className="not-md:mt-8">
					<UserInformation
						scheduleLink={session?.scheduleLink}
						userId={session.userId}
					/>
				</section>
			</div>
		</div>
	);
};

export default SchedulePage;
