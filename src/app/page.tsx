import { LoginForm } from "@/components/forms/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "TideEmit",
	description: "För att TimeEdit suger",
};

export default async function Home() {
	return (
		<div className="mx-auto max-w-8xl px-4 pt-16 md:pt-48 lg:pt-64">
			<div className="max-w-2xl mx-auto">
				<h1 className="mt-4 font-sans font-bold center text-center text-6xl sm:text-8xl lg:text-9xl ">
					TideEmit
				</h1>
				<p className="text-lg font-sans text-neutral-600 text-center lg:text-2xl italic">
					För att TimeEdit suger...
				</p>
			</div>
			<LoginForm />
		</div>
	);
}
