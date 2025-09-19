import { CheckIcon } from "lucide-react";
import { LazyMotion, domAnimation } from "motion/react";
import * as motion from "motion/react-m";
import { ReactNode } from "react";
import { Portal } from "./portal";

export const Toast = ({
	children,
	open,
}: {
	children: ReactNode;
	open: boolean;
	type: "success";
}) => {
	return (
		<LazyMotion features={domAnimation}>
			{open && (
				<Portal>
					<div className="fixed right-0 bottom-0 overflow-x-hidden">
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
							<div className="bg-background text-foreground m-4 rounded border border-neutral-400 p-4 shadow dark:border-neutral-600">
								<p aria-live="polite" role="status">
									<CheckIcon
										size={16}
										className="me-2 inline text-4xl text-emerald-600"
									/>
									{children}
								</p>
							</div>
						</motion.div>
					</div>
				</Portal>
			)}
		</LazyMotion>
	);
};
