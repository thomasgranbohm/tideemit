"use client";

import { login } from "@/actions";
import { useActionState } from "react";
import { SubmitButton } from "./submit-button";

export const LoginForm = () => {
	const [state, formAction] = useActionState(login, {
		message: null,
		errored: false,
	});

	return (
		<form
			className="flex flex-col items-center justify-center max-w-md mx-auto mt-8 gap-2 lg:mt-16"
			action={formAction}
		>
			<input
				aria-placeholder="User ID"
				placeholder="Släng in ditt genererade ID"
				type="text"
				name="userId"
				id="userId"
				className="w-full rounded shadow font-mono outline py-2 px-4 aria-[invalid=true]:outline-red-500"
				aria-invalid={state.errored}
				required
			/>
			<SubmitButton className="w-full p-2 px-8 bg-green-600 text-neutral-100 rounded font-semibold cursor-pointer aria-disabled:opacity-50 aria-disabled:cursor-not-allowed">
				Logga in
			</SubmitButton>
			<p aria-live="polite" role="status" className="text-red-500">
				{state.message}
			</p>
		</form>
	);
};
