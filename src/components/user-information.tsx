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
				<h2 className="text-xl font-bold">Ditt användar-ID</h2>
				<CopyInput value={userId}>Kopierade användar-ID!</CopyInput>
				<p className="mt-2 text-neutral-700 font-sans">
					Typiskt viktigt att spara på nåt vänster!
				</p>
			</div>
			<div className="mt-6">
				<h2 className="text-xl font-bold">
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
					value={`${process.env.NEXT_PUBLIC_URL}/schedule/${userId}.ics`}
				>
					Kopierade länken!
				</CopyInput>
			</div>

			<button
				className="mx-auto flex justify-between items-center gap-2 mt-2 p-3 px-4 rounded cursor-pointer bg-blue-600 text-white hover:shadow hover:bg-blue-700 transition-all"
				onClick={() => setOpen(true)}
			>
				<CogIcon size={16} />
				Uppdatera inställningar
			</button>

			<Modal open={open} setOpen={setOpen}>
				<h2 className="text-xl font-bold">
					Uppdatera din TimeEdit-länk
				</h2>
				<p className="mt-2 text-neutral-700  font-sans">
					Här kan du uppdatera din länk från TimeEdit, till exempel
					vid terminsbyte eller liknande.
				</p>
				<h3 className="text-md font-bold mt-4">
					Din nuvarande TimeEdit-länk
				</h3>
				<div className="mt-2 overflow-x-hidden relative border border-neutral-400 rounded">
					<p className="p-4 bg-neutral-50 overflow-auto whitespace-nowrap text-nowrap select-all font-mono text-neutral-600 z-0 before:absolute before:top-3 before:bottom-3 before:left-0 before:w-4 before:bg-linear-to-r before:via-50% before:from-neutral-50 before:via-neutral-50 before:to-transparent after:absolute after:top-3 after:bottom-3 after:right-0 after:w-4 after:bg-linear-to-l after:via-50% after:from-neutral-50 after:via-neutral-50 after:to-transparent after:z-10 after:block">
						{scheduleLink}
					</p>
				</div>

				<form action={formAction}>
					<label htmlFor="scheduleLink">
						<h3 className="text-md font-bold mt-4">
							Din nya TimeEdit-länk
						</h3>
					</label>
					<input
						type="text"
						name="scheduleLink"
						required
						placeholder="https://cloud.timeedit.net/liu/web/schema/..."
						className="mt-2 p-4 bg-neutral-50 w-full block font-mono border border-neutral-400 rounded"
					/>
					<div className="flex flex-col mt-2 sm:flex-row sm:justify-between sm:items-center md:flex-col md:items-start lg:flex-row lg:justify-between lg:items-center">
						<p
							className="text-red-600"
							aria-live="polite"
							role="status"
						>
							{!state.success && state.message}
						</p>
						<SubmitButton className="p-3 px-4 mt-2 sm:mt-0 md:mt-2 lg:mt-0 w-full text-center font-sans rounded cursor-pointer flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 focus:bg-green-700 active:bg-green-700 aria-disabled:bg-neutral-200 aria-disabled:text-neutral-500 transition-colors sm:w-fit md:w-full lg:w-fit">
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
