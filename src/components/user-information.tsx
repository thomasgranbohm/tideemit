"use client";

import { CopyIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { SubmitButton } from "./forms/submit-button";
import { updateSchedule } from "@/actions";
import { Fragment, useActionState } from "react";
import { ScheduleLink } from "./schedule-link";

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
			<h2 className="font-bold text-xl font-sans">Ditt användar-ID</h2>
			<div className="mt-2 bg-neutral-50 border border-neutral-400 shadow rounded relative">
				<p className="p-4 bg-gradient-to-r font-mono select-all cursor-text truncate">
					{userId}
				</p>
				<button
					title="Kopiera användar-ID"
					className="absolute top-0 right-0 bottom-0 z-10 px-3 my-2 me-2 rounded hover:shadow cursor-pointer flex items-center gap-2 transition-all motion-reduce:transition-none bg-neutral-50 hover:bg-blue-600 hover:text-white after:block after:-z-10 after:absolute after:gradient after:right-full after:top-0 after:bottom-0 after:w-8 after:bg-gradient-to-l after:from-neutral-50 after:from-30% after:to-transparent"
				>
					<CopyIcon />
				</button>
			</div>
			<p className="mt-2 text-neutral-700  font-sans">
				Typiskt viktigt att spara på nåt vänster!
			</p>

			<div className="mt-6">
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
				<ScheduleLink userId={userId} />
			</div>

			<form className="mt-6 flex flex-col" action={formAction}>
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
