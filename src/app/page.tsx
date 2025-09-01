import { getSession, login } from "@/lib/api";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "TideEmit",
	description: "För att TimeEdit suger",
};

export default async function Home() {
	const session = await getSession();

	return (
		<div className="my-2 w-xl m-auto">
			<h1 className="font-bold text-2xl my-4">TideEmit</h1>
			{session == null && (
				<div className="forms">
					<form
						action={async (formData) => {
							"use server";
							await login(formData);
							redirect("/schedule");
						}}
					>
						<label htmlFor="userId">User ID:</label>
						<input type="text" name="userId" id="userId" />
						<button type="submit">Login</button>
					</form>
					{/* <form
						action={async () => {
							"use server";
							await register();
							redirect("/schedule");
						}}
					>
						<button type="submit">Register</button>
					</form> */}
				</div>
			)}
		</div>
	);
}
