"use client";

import { updateSchedule } from "@/actions";
import { useNotificationTimer } from "@/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, PencilIcon } from "lucide-react";
import { Fragment, useActionState, useEffect, useState } from "react";
import { CopyInput } from "./copy-input";
import { SubmitButton } from "./forms/submit-button";
import { Modal } from "./modal";
import { Portal } from "./portal";

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
				<h2 className="text-xl font-sans">Ditt användar-ID</h2>
				<CopyInput value={userId}>
					<CheckIcon className="inline text-4xl text-green-600" />
					<p className="ps-1 inline">Kopierade användar-ID!</p>
				</CopyInput>
				<p className="mt-2 text-neutral-700 font-sans">
					Typiskt viktigt att spara på nåt vänster!
				</p>
			</div>
			<div className="mt-6">
				<h2 className="text-xl font-sans">
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
					<CheckIcon className="size-4 inline text-4xl text-green-600" />
					<p className="ps-1 inline">Kopierade länken!</p>
				</CopyInput>
			</div>

			<div className="mt-6 flex flex-col">
				<label htmlFor="scheduleLink">
					<h2 className="text-xl font-sans">Din TimeEdit-länk</h2>
				</label>
				<div className="relative mt-2">
					<input
						type="text"
						name="scheduleLink"
						value={scheduleLink}
						className="p-4 pe-16 bg-neutral-50 w-full block font-mono border text-neutral-700 border-neutral-400 rounded"
						disabled
					/>
					<button
						className="absolute top-2 bottom-2 right-2 aspect-square text-center rounded cursor-pointer transition-colors hover:bg-green-500 hover:text-white active:bg-green-500 active:text-white focus:bg-green-500 focus:text-white"
						onClick={() => setOpen(true)}
					>
						<PencilIcon className="size-4 mx-auto" />
					</button>

					<Modal open={open} setOpen={setOpen}>
						<h2 className="text-xl font-sans">
							Uppdatera din TimeEdit-länk
						</h2>
						<p className="mt-2 text-neutral-700  font-sans">
							Här kan du uppdatera din länk från TimeEdit, till
							exempel vid terminsbyte eller liknande.
						</p>
						<h3 className="text-md font-sans mt-4">
							Din nuvarande TimeEdit-länk
						</h3>
						<input
							type="text"
							name="scheduleLink"
							value={scheduleLink}
							className="mt-2 p-4 bg-neutral-50 w-full block font-mono border border-neutral-400 text-neutral-600 rounded"
							disabled
						/>
						<form action={formAction}>
							<label htmlFor="scheduleLink">
								<h3 className="text-md font-sans mt-4">
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
									<PencilIcon className="size-4" />
									Uppdatera länk
								</SubmitButton>
							</div>
						</form>
					</Modal>

					<AnimatePresence>
						{notificationOpen && (
							<Portal>
								<div className="fixed bottom-0 right-0 overflow-x-hidden">
									<motion.div
										initial={{ x: "100%" }}
										animate={{ x: "0%" }}
										exit={{ x: "100%" }}
										transition={{
											duration: 0.5,
											type: "spring",
											bounce: 0.3,
										}}
									>
										<div className="m-4 p-4 border border-neutral-400 shadow rounded bg-white">
											<p aria-live="polite" role="status">
												<CheckIcon className="size-4 inline me-2 text-4xl text-green-600" />
												{state.message}
											</p>
										</div>
									</motion.div>
								</div>
							</Portal>
						)}
					</AnimatePresence>
				</div>
			</div>
		</Fragment>
	);
};
