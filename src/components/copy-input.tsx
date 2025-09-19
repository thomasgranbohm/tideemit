"use client";

import { useNotificationTimer } from "@/hooks";
import { CopyIcon } from "lucide-react";
import { ReactNode } from "react";
import { Toast } from "./toast";

export const CopyInput = ({
	children,
	value,
}: {
	children: ReactNode;
	value: string;
}) => {
	const [open, copyLink] = useNotificationTimer(() => {
		if ("navigator" in window && "clipboard" in window.navigator) {
			window.navigator.clipboard.writeText(value);
		} else {
			// FIXME: handle could not copy
		}
	});

	return (
		<div className="mt-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-600 rounded relative">
			<p className="p-4 bg-gradient-to-r font-mono select-all cursor-text truncate text-black dark:text-neutral-50">
				{value}
			</p>
			<button
				title="Kopiera"
				className="absolute top-0 right-0 bottom-0 z-10 w-10 px-3 my-2 me-2 aspect-square rounded hover:shadow cursor-pointer flex items-center gap-2 transition-all motion-reduce:transition-none bg-neutral-50 text-black dark:bg-neutral-900 dark:text-neutral-50 hover:bg-blue-600 hover:text-white active:bg-blue-600 active:text-white after:block after:-z-10 after:absolute after:gradient after:right-full after:top-0 after:bottom-0 after:w-8 after:bg-gradient-to-l after:from-neutral-50 dark:after:from-neutral-900 after:from-30% after:to-transparent"
				onClick={copyLink}
			>
				<CopyIcon className="size-4" />
			</button>

			<Toast open={open} type="success">
				{children}
			</Toast>
		</div>
	);
};
