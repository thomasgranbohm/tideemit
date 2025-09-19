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
						action(new FormData(evt.target as HTMLFormElement))
					);
				})(evt);
			}}
			className="mt-2"
		>
			<div className="pt-4 relative bg-neutral-50 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-600 rounded">
				<label
					htmlFor="code"
					className="ms-4 mt-4 font-sans text-bold text-black dark:text-neutral-50"
				>
					Kurskod
				</label>
				<input
					className="block p-4 font-mono w-full  text-black dark:text-neutral-50"
					{...register("code")}
					required
					type="text"
					name="code"
					placeholder="TATB01"
				/>
				<label
					htmlFor="name"
					className="ms-4 mt-4 font-sans text-bold text-black dark:text-neutral-50"
				>
					Kursnamn
				</label>
				<input
					className="block p-4 w-full text-black dark:text-neutral-50"
					type="text"
					name="name"
					id="name"
					placeholder="Grunken"
					{...register("name")}
				/>
			</div>
			<div className="flex flex-col sm:flex-row-reverse sm:justify-between sm:items-center md:flex-col md:items-start lg:flex-row-reverse lg:justify-between lg:items-center ">
				<button
					title="Ta bort kurs"
					className="p-3 px-4 w-full text-center mt-2 font-sans rounded cursor-pointer flex items-center justify-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 focus:bg-emerald-700 active:bg-emerald-700 aria-disabled:bg-neutral-200 dark:aria-disabled:bg-neutral-500 aria-disabled:text-neutral-500 dark:aria-disabled:text-neutral-300 transition-colors sm:w-fit md:w-full lg:w-fit"
					type="submit"
					aria-disabled={!isValid}
				>
					<PlusIcon size={16} />
					Lägg till kurs
				</button>

				{errors?.name && (
					<p className="text-red-500 mt-2 sm:mt-0 md:mt-2">
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
