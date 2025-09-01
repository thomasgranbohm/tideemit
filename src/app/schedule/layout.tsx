import { Toast } from "radix-ui";
import "./../globals.css";

export default function ScheduleLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Toast.Provider swipeDirection="right">
			{children}
			<footer className="flex w-full items-center justify-center my-4">
				<div className="flex gap-1 flex-col items-center">
					<p>Har du hittat ett fel?</p>
					<p>
						Mejla mig på{" "}
						<a
							className="text-blue-600"
							href="mailto:thomas@granbohm.rocks"
						>
							thomas@granbohm.rocks
						</a>{" "}
						eller{" "}
						<a
							className="text-blue-600"
							href="https://github.com/thomasgranbohm/tideemit"
						>
							hjälp till
						</a>
						!
					</p>
				</div>
			</footer>
			<Toast.Viewport />
		</Toast.Provider>
	);
}
