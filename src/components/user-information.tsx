"use client";

import { updateSchedule } from "@/actions";
import { CheckIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Fragment, useActionState } from "react";
import { CopyInput } from "./copy-input";
import { SubmitButton } from "./forms/submit-button";

export const UserInformation = ({
	scheduleLink,
	userId,
}: {
	scheduleLink: string;
	userId: string;
}) => {
	const [state, formAction] = useActionState(updateSchedule, { message: "" });

	return (
		<Fragment>
			<div>
				<h2 className="font-bold text-xl font-sans">
					Ditt användar-ID
				</h2>
				<CopyInput value={userId}>
					<CheckIcon className="size-5 inline text-4xl text-green-600" />
					<p className="ps-1 inline">Kopierade användar-ID!</p>
				</CopyInput>
				<p className="mt-2 text-neutral-700  font-sans">
					Typiskt viktigt att spara på nåt vänster!
				</p>
			</div>
			<div className="my-8">
				<h2 className="font-bold text-xl font-sans">
					Din{" "}
					<span className="relative">
						<span
							className="absolute -inset-1 block -skew-y-6 rotate-6 bg-[#FF9DBF] -z-10"
							aria-hidden="true"
						></span>
						<span className="relative text-[#760032]">
							TideEmit-länk
						</span>
					</span>
				</h2>
				<CopyInput
					value={`${process.env.NEXT_PUBLIC_URL}/schedule/${userId}`}
				>
					<CheckIcon className="size-5 inline text-4xl text-green-600" />
					<p className="ps-1 inline">Kopierade länken!</p>
				</CopyInput>
			</div>

			<form className="my-8 flex flex-col" action={formAction}>
				<label htmlFor="scheduleLink">
					<h2 className="font-bold text-xl font-sans">
						Din TimeEdit-länk
					</h2>
				</label>
				<input
					type="text"
					name="scheduleLink"
					defaultValue={scheduleLink}
					className="mt-2 p-4 bg-neutral-50 w-full block font-mono border border-neutral-400 rounded"
				/>
				<SubmitButton className="mt-2 shadow font-sans rounded bg-green-600 text-white px-3 py-2 flex items-center justify-center gap-1 sm:self-end cursor-pointer">
					<Pencil1Icon />
					Uppdatera länk
				</SubmitButton>
				<p aria-live="polite" role="status">
					{state.message}
				</p>
			</form>
		</Fragment>
	);
};
