"use client";

import { LazyMotion, domAnimation } from "motion/react";
import * as motion from "motion/react-m";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

export const Modal = ({
	children,
	open,
	setOpen,
}: {
	children: ReactNode;
	open: boolean;
	setOpen: (_: boolean) => void;
}) => {
	useEffect(() => {
		const getKeyboardInputs = (ev: KeyboardEvent) => {
			if (ev.key == "Escape") {
				setOpen(false);
			}
		};

		if (open) {
			document.body.addEventListener("keydown", getKeyboardInputs);
		}

		return () => {
			document.body.removeEventListener("keydown", getKeyboardInputs);
		};
	}, [open, setOpen]);

	useEffect(() => {
		// FIXME: Doesn't work on mobile, atleast iOS
		if (open) {
			document.body.classList.add("overflow-y-hidden");
		} else {
			document.body.classList.remove("overflow-y-hidden");
		}

		return () => {
			document.body.classList.remove("overflow-y-hidden");
		};
	}, [open]);

	if (!open) return null;

	return createPortal(
		<LazyMotion features={domAnimation}>
			<div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center p-4">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.5 }}
					className="absolute top-0 right-0 bottom-0 left-0 z-0 bg-gray-600 opacity-50"
					onClick={() => setOpen(false)}
				/>
				{/* TODO: Ser keeft ut med bakgrunden på mobilen inte alignat */}
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{
						duration: 0.5,
						type: "spring",
						bounce: 0.3,
					}}
					className="z-10 mx-auto overflow-x-hidden rounded border border-neutral-400 bg-neutral-50 p-4 shadow sm:max-w-2xl dark:border-neutral-600 dark:bg-neutral-900"
				>
					{children}
				</motion.div>
			</div>
		</LazyMotion>,
		document.body,
	);
};
