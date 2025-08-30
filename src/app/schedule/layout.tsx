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
			<Toast.Viewport />
		</Toast.Provider>
	);
}
