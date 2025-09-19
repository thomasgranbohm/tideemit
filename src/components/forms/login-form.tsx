"use client";

import { login } from "@/actions";
import { KeyRoundIcon } from "lucide-react";
import { useActionState } from "react";
import { SubmitButton } from "./submit-button";
import { TurnStile } from "./turnstile";

export const LoginForm = () => {
	const [state, formAction] = useActionState(login, {
		message: null,
		errored: false,
	});

	// TODO: Loading UI

	return (
		<form className="mt-8 lg:mt-16" action={formAction}>
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
			<SubmitButton className="w-full mt-2 p-2 px-8 flex justify-center gap-2 bg-green-600 text-neutral-100 hover:bg-green-700 hover:shadow transition-all rounded font-semibold cursor-pointer aria-disabled:opacity-50 aria-disabled:cursor-not-allowed">
				<KeyRoundIcon />
				Logga in
			</SubmitButton>
			<p aria-live="polite" role="status" className="text-red-500">
				{state.message}
			</p>
			<TurnStile />
		</form>
	);
};
