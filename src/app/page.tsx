import { login } from "@/actions";
import { SubmitButton } from "@/components/submit-button";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "TideEmit",
	description: "För att TimeEdit suger",
};

export default async function Home() {
	return (
		<div className="mx-auto max-w-8xl pt-16 lg:pt-64">
			<div className="max-w-2xl mx-auto">
				<h1 className="mt-4 font-title font-bold center text-center text-6xl lg:text-9xl ">
					TideEmit
				</h1>
				<p className="text-lg font-sans text-neutral-600 text-center lg:text-2xl">
					För att TimeEdit suger...
				</p>
			</div>
			<form
				className="flex flex-col items-center justify-center max-w-md mx-auto my-4 gap-2 lg:mt-16"
				action={login}
			>
				<input
					aria-placeholder="User ID"
					placeholder="Släng in ditt genererade ID"
					type="text"
					name="userId"
					id="userId"
					className="w-full rounded shadow font-mono outline py-2 px-4"
				/>
				<SubmitButton className="w-full p-2 px-8 bg-green-600 text-neutral-100 rounded font-semibold cursor-pointer aria-disabled:opacity-50 aria-disabled:cursor-not-allowed">
					Logga in
				</SubmitButton>
			</form>
		</div>
	);
}
