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
		<div className="bg-background relative mt-2 rounded border border-neutral-400 dark:border-neutral-600">
			<p className="cursor-text truncate bg-gradient-to-r p-4 font-mono text-black select-all dark:text-neutral-50">
				{value}
			</p>
			<button
				title="Kopiera"
				className="after:gradient absolute top-0 right-0 bottom-0 z-10 my-2 me-2 flex aspect-square w-10 cursor-pointer items-center gap-2 rounded bg-neutral-50 px-3 text-black transition-all after:absolute after:top-0 after:right-full after:bottom-0 after:-z-10 after:block after:w-8 after:bg-gradient-to-l after:from-neutral-50 after:from-30% after:to-transparent hover:bg-blue-600 hover:text-white hover:shadow active:bg-blue-600 active:text-white motion-reduce:transition-none dark:bg-neutral-900 dark:text-neutral-50 dark:after:from-neutral-900"
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
