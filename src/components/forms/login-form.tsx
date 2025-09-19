"use client";

import { login } from "@/actions";
import { KeyRoundIcon } from "lucide-react";
import { Turnstile } from "next-turnstile";
import { useActionState } from "react";
import { SubmitButton } from "./submit-button";

export const LoginForm = () => {
	const [state, formAction] = useActionState(login, {
		message: null,
		errored: false,
	});

	// TODO: Loading UI

	return (
		<form action={formAction}>
			<input
				aria-placeholder="User ID"
				placeholder="Släng in ditt genererade ID"
				type="text"
				name="userId"
				id="userId"
				className="w-full rounded shadow font-mono border border-neutral-400 dark:border-neutral-600 text-black dark:text-neutral-50 py-2 px-4 aria-[invalid=true]:border-red-500"
				aria-invalid={state.errored}
				required
			/>
			<SubmitButton className="w-full mt-2 p-2 px-8 flex justify-center gap-2 bg-emerald-600 dark:bg-emerald-500 text-neutral-100 dark:text-neutral-900 hover:bg-emerald-700 dark:hover:bg-emerald-600 hover:shadow transition-all rounded font-semibold cursor-pointer aria-disabled:opacity-50 aria-disabled:cursor-not-allowed">
				<KeyRoundIcon />
				Logga in
			</SubmitButton>
			<p aria-live="polite" role="status" className="text-red-500">
				{state.message}
			</p>
			<Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
		</form>
	);
};
