"use client";

import { FormStateResponse } from "@/types";
import { CourseValidation, CourseValidationType } from "@/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Spinner } from "@radix-ui/themes";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { createCourse } from "@/actions";

const CourseCreator = () => {
	const [state, action, pending] = useActionState<
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
			className="py-2 space-y-2"
		>
			<h2 className="font-bold text-xl">Create new course</h2>
			<label className="block font-bold" htmlFor="code">
				Code:
			</label>
			<input
				className="block p-2 border rounded font-mono font-co"
				{...register("code")}
				required
				type="text"
				name="code"
				placeholder="TATB01"
			/>
			{errors.code && (
				<p className="text-red-500">{errors.code.message}</p>
			)}
			{state.success == false && state.errors?.code && (
				<ul>
					{state.errors.code.map((message, i) => (
						<li key={i} className="text-red-500">
							{message}
						</li>
					))}
				</ul>
			)}
			<label className="block font-bold" htmlFor="name">
				Name:
			</label>
			<input
				className="block p-2 border rounded"
				type="text"
				name="name"
				id="name"
				placeholder="Grunken"
				{...register("name")}
			/>
			{errors?.name && (
				<p className="text-red-500">{errors.name.message}</p>
			)}
			{state.success == false && state.errors?.name && (
				<ul>
					{state.errors.name.map((message, i) => (
						<li key={i} className="text-red-500">
							{message}
						</li>
					))}
				</ul>
			)}
			{state.success == false && state.message && (
				<Callout.Root color="red">
					<Callout.Icon>
						<ExclamationTriangleIcon />
					</Callout.Icon>

					<Callout.Text>{state.message}</Callout.Text>
				</Callout.Root>
			)}
			<Button type="submit" disabled={!isValid || pending} color="green">
				<Spinner loading={pending} />
				Create course
			</Button>
		</form>
	);
};

export default CourseCreator;
