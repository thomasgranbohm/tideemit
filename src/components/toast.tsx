import { AnimatePresence } from "framer-motion";
import { Portal } from "./portal";
import { CheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const Toast = ({
	children,
	open,
}: {
	children: ReactNode;
	open: boolean;
	type: "success";
}) => {
	return (
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
								<p aria-live="polite" role="status">
									<CheckIcon
										size={16}
										className="inline me-2 text-4xl text-green-600"
									/>
									{children}
								</p>
							</div>
						</motion.div>
					</div>
				</Portal>
			)}
		</AnimatePresence>
	);
};
