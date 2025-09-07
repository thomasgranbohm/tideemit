"use client";

import { CopyIcon } from "@radix-ui/react-icons";
import { AnimatePresence } from "framer-motion";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Portal } from "./portal";

import { motion } from "framer-motion";

export const CopyInput = ({
	children,
	value,
}: {
	children: ReactNode;
	value: string;
}) => {
	const [open, setOpen] = useState<boolean>(false);

	const timerRef = useRef(0);

	const copyLink = useCallback(() => {
		setOpen(true);
		if ("navigator" in window && "clipboard" in window.navigator) {
			window.navigator.clipboard.writeText(value);

			timerRef.current = window.setTimeout(() => setOpen(false), 3e3);
		} else {
			alert(value);
		}
	}, [value]);

	useEffect(() => {
		return () => clearTimeout(timerRef.current);
	}, []);

	return (
		<div className="mt-2 bg-neutral-50 border border-neutral-400 shadow rounded relative">
			<p className="p-4 bg-gradient-to-r font-mono select-all cursor-text truncate">
				{value}
			</p>
			<button
				title="Kopiera"
				className="absolute top-0 right-0 bottom-0 z-10 px-3 my-2 me-2 rounded hover:shadow cursor-pointer flex items-center gap-2 transition-all motion-reduce:transition-none bg-neutral-50 hover:bg-blue-600 hover:text-white active:bg-blue-600 active:text-white after:block after:-z-10 after:absolute after:gradient after:right-full after:top-0 after:bottom-0 after:w-8 after:bg-gradient-to-l after:from-neutral-50 after:from-30% after:to-transparent"
				onClick={copyLink}
			>
				<CopyIcon />
			</button>

			<AnimatePresence>
				{open && (
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
									{children}
								</div>
							</motion.div>
						</div>
					</Portal>
				)}
			</AnimatePresence>
		</div>
	);
};
