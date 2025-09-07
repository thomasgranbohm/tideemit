"use client";

import { Fragment, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useCycle } from "framer-motion";

export const Portal = ({ children }: { children: ReactNode }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	if (!mounted) return null;

	return createPortal(children, document.body);
};

export const Notification = () => {
    
}

export const TestPortal = () => {
	const [open, toggleOpen] = useCycle(false, true);

	return (
		<Fragment>
			<button onClick={() => toggleOpen()}>Click me</button>
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
									<h4>Created course</h4>
								</div>
							</motion.div>
						</div>
					</Portal>
				)}
			</AnimatePresence>
		</Fragment>
	);
};
