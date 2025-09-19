import { LoginForm } from "@/components/forms/login-form";
import { UserRoundIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "TideEmit",
	description: "För att TimeEdit suger",
};

export default async function Home() {
	return (
		<div className="mx-auto max-w-8xl px-4 pt-32 md:pt-48 lg:pt-64 xl:pt-72">
			<div className="max-w-2xl mx-auto">
				<h1 className="mt-4 font-sans font-bold center text-center text-6xl sm:text-8xl lg:text-9xl dark:text-neutral-100">
					TideEmit
				</h1>
				<p className="text-lg font-sans text-neutral-700 dark:text-neutral-300 text-center lg:text-2xl italic">
					För att TimeEdit suger...
				</p>
			</div>
			<div className="max-w-md mx-auto mt-4">
				<LoginForm />
				<Link
					className="w-full mt-2 p-2 px-8 flex justify-center gap-2 border-2 border-emerald-600  text-emerald-600 bg-white hover:border-emerald-600 hover:text-emerald-600 hover:shadow transition-all rounded font-semibold"
					href="/signup"
				>
					<UserRoundIcon />
					Skapa ett konto
				</Link>
			</div>
		</div>
	);
}
