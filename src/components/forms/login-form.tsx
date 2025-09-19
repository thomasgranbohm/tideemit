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
				className="w-full rounded border border-neutral-400 px-4 py-2 font-mono text-black shadow aria-[invalid=true]:border-red-500 dark:border-neutral-600 dark:text-neutral-50"
				aria-invalid={state.errored}
				required
			/>
			<SubmitButton className="mt-2 flex w-full cursor-pointer justify-center gap-2 rounded bg-emerald-600 p-2 px-8 font-sans font-semibold text-neutral-100 transition-all hover:bg-emerald-700 hover:shadow aria-disabled:cursor-not-allowed aria-disabled:opacity-50 dark:bg-emerald-500 dark:text-neutral-900 dark:hover:bg-emerald-600">
				<KeyRoundIcon />
				Logga in
			</SubmitButton>
			<p
				aria-live="polite"
				role="status"
				className="font-sans text-red-500"
			>
				{state.message}
			</p>
			<Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
		</form>
	);
};
