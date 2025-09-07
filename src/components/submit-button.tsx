"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({
	children,
	...props
}: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) => {
	const { pending } = useFormStatus();

	return (
		<button {...props} type="submit" aria-disabled={pending}>
			{children}
		</button>
	);
};
