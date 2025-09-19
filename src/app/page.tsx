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
		<div className="max-w-8xl mx-auto px-4 pt-32 md:pt-48 lg:pt-64 xl:pt-72">
			<div className="mx-auto max-w-2xl">
				<h1 className="center mt-4 text-center font-sans text-6xl font-bold sm:text-8xl lg:text-9xl dark:text-neutral-100">
					TideEmit
				</h1>
				<p className="text-secondary text-center font-sans text-lg italic lg:text-2xl">
					För att TimeEdit suger...
				</p>
			</div>
			<div className="mx-auto mt-4 max-w-md">
				<LoginForm />
				<Link
					className="mt-2 flex w-full justify-center gap-2 rounded border-2 border-emerald-600 bg-neutral-50 p-2 px-8 font-semibold text-emerald-600 transition-all hover:border-emerald-600 hover:text-emerald-600 hover:shadow dark:bg-neutral-900"
					href="/signup"
				>
					<UserRoundIcon />
					Skapa ett konto
				</Link>
			</div>
		</div>
	);
}
