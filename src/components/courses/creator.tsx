"use client";

import { createCourse } from "@/actions";
import { FormStateResponse } from "@/types";
import { CourseValidation, CourseValidationType } from "@/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const CourseCreator = () => {
	const [state, action] = useActionState<
		FormStateResponse<CourseValidationType>,
		FormData
	>(createCourse, { success: false, errors: {}, message: "" });

	const formRef = useRef<HTMLFormElement>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful, isValid },
	} = useForm<CourseValidationType>({
		resolver: zodResolver(CourseValidation),
		defaultValues: {
			code: "",
			name: "",
		},
		mode: "onTouched",
	});

	useEffect(() => {
		if (isSubmitSuccessful && state.success) {
			reset();
		}
	}, [isSubmitSuccessful, reset, state]);

	return (
		<form
			ref={formRef}
			action={action}
			onSubmit={(evt) => {
				evt.preventDefault();
				handleSubmit(() => {
					startTransition(() =>
						action(new FormData(evt.target as HTMLFormElement)),
					);
				})(evt);
			}}
			className="mt-2"
		>
			<div className="bg-background relative rounded border border-neutral-400 pt-4 dark:border-neutral-600">
				<label
					htmlFor="code"
					className="text-bold ms-4 mt-4 font-sans text-black dark:text-neutral-50"
				>
					Kurskod
				</label>
				<input
					className="block w-full p-4 font-mono text-black dark:text-neutral-50"
					{...register("code")}
					required
					type="text"
					name="code"
					placeholder="TATB01"
				/>
				<label
					htmlFor="name"
					className="text-bold ms-4 mt-4 font-sans text-black dark:text-neutral-50"
				>
					Kursnamn
				</label>
				<input
					className="block w-full p-4 text-black dark:text-neutral-50"
					type="text"
					name="name"
					id="name"
					placeholder="Grunken"
					{...register("name")}
				/>
			</div>
			<div className="flex flex-col sm:flex-row-reverse sm:items-center sm:justify-between md:flex-col md:items-start lg:flex-row-reverse lg:items-center lg:justify-between">
				<button
					title="Ta bort kurs"
					className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-emerald-600 p-3 px-4 text-center font-sans text-white transition-colors hover:bg-emerald-700 focus:bg-emerald-700 active:bg-emerald-700 aria-disabled:bg-neutral-200 aria-disabled:text-neutral-500 sm:w-fit md:w-full lg:w-fit dark:aria-disabled:bg-neutral-500 dark:aria-disabled:text-neutral-300"
					type="submit"
					aria-disabled={!isValid}
				>
					<PlusIcon size={16} />
					Lägg till kurs
				</button>

				{errors?.name && (
					<p className="mt-2 text-red-500 sm:mt-0 md:mt-2">
						{errors.name.message}
					</p>
				)}
				{state.success == false && state.errors?.name && (
					<ul className="mt-2 sm:mt-0 md:mt-2">
						{state.errors.name.map((message, i) => (
							<li key={i} className="text-red-500">
								{message}
							</li>
						))}
					</ul>
				)}
			</div>
		</form>
	);
};

export default CourseCreator;
