"use client";

import { signup } from "@/actions";
import { SubmitButton } from "@/components/forms/submit-button";
import { UserRoundIcon } from "lucide-react";
import { Turnstile } from "next-turnstile";
import { useActionState } from "react";

const SignupPage = () => {
	const [state, formAction] = useActionState(signup, {
		message: null,
		errored: false,
	});

	return (
		<>
			<div className="max-w-8xl mx-auto px-4 pt-32 md:pt-48 lg:pt-64 xl:pt-72">
				<div className="mx-auto max-w-2xl">
					<h1 className="center mt-4 text-center font-sans text-6xl font-bold sm:text-8xl lg:text-9xl">
						TideEmit
					</h1>
					<p className="text-center font-sans text-lg text-neutral-600 italic lg:text-2xl">
						För att TimeEdit suger...
					</p>
				</div>

				<form className="mx-auto mt-4 max-w-md" action={formAction}>
					<input
						aria-placeholder="TimeEdit-länk"
						placeholder="Släng in din TimeEdit-länk"
						type="text"
						name="scheduleLink"
						id="scheduleLink"
						className="w-full rounded border px-4 py-2 font-mono shadow aria-[invalid=true]:border-red-500"
						aria-invalid={state.errored}
						required
					/>
					<SubmitButton className="mt-2 flex w-full cursor-pointer items-center justify-center rounded bg-emerald-600 p-2 font-semibold text-neutral-100 transition-all hover:bg-emerald-700 hover:shadow aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
						<UserRoundIcon className="me-2" />
						Skapa ett konto
					</SubmitButton>
					<p
						aria-live="polite"
						role="status"
						className="mt-2 text-center text-red-500"
					>
						{state.message}
					</p>
					<Turnstile
						siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
					/>
				</form>
			</div>
		</>
	);
};

export default SignupPage;
