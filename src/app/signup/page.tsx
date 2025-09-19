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
			<div className="mx-auto max-w-8xl px-4 pt-16 md:pt-48 lg:pt-64">
				<div className="max-w-2xl mx-auto">
					<h1 className="mt-4 font-sans font-bold center text-center text-6xl sm:text-8xl lg:text-9xl ">
						TideEmit
					</h1>
					<p className="text-lg font-sans text-neutral-600 text-center lg:text-2xl italic">
						För att TimeEdit suger...
					</p>
				</div>

				<form
					className="max-w-md mx-auto mt-8 lg:mt-16"
					action={formAction}
				>
					<input
						aria-placeholder="TimeEdit-länk"
						placeholder="Släng in din TimeEdit-länk"
						type="text"
						name="scheduleLink"
						id="scheduleLink"
						className="w-full rounded shadow font-mono border py-2 px-4 aria-[invalid=true]:border-red-500 "
						aria-invalid={state.errored}
						required
					/>
					<SubmitButton className="w-full mt-2 p-2 flex justify-center items-center bg-emerald-600 text-neutral-100 hover:bg-emerald-700 hover:shadow transition-all rounded font-semibold cursor-pointer aria-disabled:opacity-50 aria-disabled:cursor-not-allowed">
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
