"use client";

import { updateSchedule } from "@/actions";
import { useNotificationTimer } from "@/hooks";
import { CogIcon, PencilIcon } from "lucide-react";
import { Fragment, useActionState, useEffect, useState } from "react";
import { CopyInput } from "./copy-input";
import { SubmitButton } from "./forms/submit-button";
import { Modal } from "./modal";
import { Toast } from "./toast";

export const UserInformation = ({
	scheduleLink,
	userId,
}: {
	scheduleLink?: string;
	userId: string;
}) => {
	const [state, formAction] = useActionState(updateSchedule, {
		message: "",
		success: null,
	});
	const [open, setOpen] = useState<boolean>(false);

	const [notificationOpen, startTimer] = useNotificationTimer(() => {
		setOpen(false);
		state.success = null;
	});

	useEffect(() => {
		if (state.success && open) {
			startTimer();
		}
	}, [open, startTimer, state.success]);

	return (
		<Fragment>
			<div>
				<h2 className="font-sans text-xl font-bold text-black dark:text-neutral-50">
					Ditt användar-ID
				</h2>
				<CopyInput value={userId}>Kopierade användar-ID!</CopyInput>
				<p className="mt-2 font-sans text-neutral-700 dark:text-neutral-300">
					Typiskt viktigt att spara på nåt vänster!
				</p>
			</div>
			<div className="mt-6">
				<h2 className="font-sans text-xl font-bold text-black dark:text-neutral-50">
					Din{" "}
					<span className="relative">
						<span
							className="absolute -inset-1 -z-10 block rotate-6 -skew-y-6 bg-[#FF9DBF] dark:bg-[#e2709a]"
							aria-hidden="true"
						></span>
						<span className="relative text-[#760032] dark:text-[#30101c]">
							TideEmit-länk
						</span>
					</span>
				</h2>
				<CopyInput
					value={`${process.env.NEXT_PUBLIC_URL}/schedule/${userId}.ics`}
				>
					Kopierade länken!
				</CopyInput>
			</div>

			<button
				className="mx-auto mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-blue-600 p-3 px-4 font-sans text-white transition-all hover:bg-blue-700 hover:shadow sm:w-fit md:w-full lg:w-fit"
				onClick={() => setOpen(true)}
			>
				<CogIcon size={16} />
				Uppdatera inställningar
			</button>

			<Modal open={open} setOpen={setOpen}>
				<h2 className="font-sans text-xl font-bold text-black dark:text-neutral-50">
					Uppdatera din TimeEdit-länk
				</h2>
				<p className="mt-2 font-sans text-neutral-700 dark:text-neutral-300">
					Här kan du uppdatera din länk från TimeEdit, till exempel
					vid terminsbyte eller liknande.
				</p>
				<h3 className="mt-4 font-sans text-base font-bold text-black dark:text-neutral-50">
					Din nuvarande TimeEdit-länk
				</h3>
				<div className="relative mt-2 overflow-x-hidden rounded border border-neutral-400 dark:border-neutral-600">
					<p className="bg-background z-0 overflow-auto p-4 font-mono text-nowrap whitespace-nowrap text-neutral-600 select-all before:absolute before:top-3 before:bottom-3 before:left-0 before:w-4 before:bg-linear-to-r before:from-neutral-50 before:via-neutral-50 before:via-50% before:to-transparent after:absolute after:top-3 after:right-0 after:bottom-3 after:z-10 after:block after:w-4 after:bg-linear-to-l after:from-neutral-50 after:via-neutral-50 after:via-50% after:to-transparent dark:text-neutral-200 dark:before:from-neutral-900 dark:before:via-neutral-900 dark:after:from-neutral-900 dark:after:via-neutral-900">
						{scheduleLink}
					</p>
				</div>

				<form action={formAction}>
					<label htmlFor="scheduleLink">
						<h3 className="mt-4 font-sans text-base font-bold text-black dark:text-neutral-50">
							Din nya TimeEdit-länk
						</h3>
					</label>
					<input
						type="text"
						name="scheduleLink"
						required
						placeholder="https://cloud.timeedit.net/liu/web/schema/..."
						className="bg-background mt-2 block w-full rounded border border-neutral-400 p-4 font-mono text-black dark:border-neutral-600 dark:text-neutral-50"
					/>
					<div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between md:flex-col md:items-start lg:flex-row lg:items-center lg:justify-between">
						<p
							className="font-sans text-red-600"
							aria-live="polite"
							role="status"
						>
							{!state.success && state.message}
						</p>
						<SubmitButton className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-emerald-600 p-3 px-4 text-center font-sans text-white transition-colors hover:bg-emerald-700 focus:bg-emerald-700 active:bg-emerald-700 aria-disabled:bg-neutral-200 aria-disabled:text-neutral-500 sm:mt-0 sm:w-fit md:mt-2 md:w-full lg:mt-0 lg:w-fit">
							<PencilIcon size={16} />
							Uppdatera länk
						</SubmitButton>
					</div>
				</form>
			</Modal>
			<Toast open={notificationOpen} type="success">
				{state.message}
			</Toast>
		</Fragment>
	);
};
