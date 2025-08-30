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
			window.navigator.clipboard.writeText(inputRef.current.value);

			timerRef.current = window.setTimeout(() => setOpen(true), 100);
		} else {
			alert(inputRef.current.value);
		}
	}, [inputRef]);

	useEffect(() => {
		return () => clearTimeout(timerRef.current);
	}, []);

	return (
		<div className="relative">
			<input
				ref={inputRef}
				className="block p-4 outline box-border rounded font-mono font-co w-full "
				type="text"
				value={`${process.env.NEXT_PUBLIC_URL}/schedule/${userId}`}
				disabled
			/>
			<div className="absolute right-0 top-0 p-3">
				<Button onClick={copyLink}>
					<CopyIcon />
					Copy
				</Button>
			</div>
			<Toast.Root
				open={open}
				onOpenChange={setOpen}
				className="fixed right-4 bottom-4 shadow p-4 outline outline-gray-400 rounded font-medium"
			>
				<Toast.Title className="flex items-center">
					<CheckCircledIcon
						color="green"
						fill="green"
						className="mr-2"
					/>
					Copied to clipboard
				</Toast.Title>
			</Toast.Root>
		</div>
	);
};
