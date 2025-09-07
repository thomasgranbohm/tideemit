"use client";

import { CheckCircledIcon, CopyIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { Toast } from "radix-ui";
import { useCallback, useEffect, useRef, useState } from "react";

export const ScheduleLink = ({ userId }: { userId: string }) => {
	const [open, setOpen] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const timerRef = useRef(0);

	const copyLink = useCallback(() => {
		setOpen(false);
		if ("navigator" in window && "clipboard" in window.navigator) {
			window.navigator.clipboard.writeText(inputRef.current.innerText);

			timerRef.current = window.setTimeout(() => setOpen(true), 100);
		} else {
			alert(inputRef.current.innerText);
		}
	}, [inputRef]);

	useEffect(() => {
		return () => clearTimeout(timerRef.current);
	}, []);

	return (
		<div className="mt-2 bg-neutral-50 border border-neutral-400 shadow rounded relative">
			<p
				ref={inputRef}
				className="p-4 bg-gradient-to-r font-mono select-all cursor-text truncate"
			>
				{`${process.env.NEXT_PUBLIC_URL}/schedule/${userId}`}
			</p>
			<button
				title="Kopiera TideEmit-länk"
				className="absolute top-0 right-0 bottom-0 z-10 px-3 my-2 me-2 rounded hover:shadow cursor-pointer flex items-center gap-2 transition-all motion-reduce:transition-none bg-neutral-50 hover:bg-blue-600 hover:text-white after:block after:-z-10 after:absolute after:gradient after:right-full after:top-0 after:bottom-0 after:w-8 after:bg-gradient-to-l after:from-neutral-50 after:from-30% after:to-transparent"
				onClick={copyLink}
			>
				<CopyIcon />
			</button>
		</div>
	);
};
