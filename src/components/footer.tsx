export const Footer = () => (
	<footer className="mx-auto h-min max-w-xl px-2 py-4">
		<p className="text-center text-sm text-black dark:text-neutral-50">
			Är det något som strular? <br />
			Mejla mig på{" "}
			<span className="inline-block">
				thomas [snabel-a] granbohm [punkt] rocks
			</span>{" "}
			eller{" "}
			<a
				className="inline-block text-blue-600 hover:underline dark:text-blue-400"
				href="https://github.com/thomasgranbohm/tideemit"
			>
				hjälp till
			</a>
			!
		</p>
	</footer>
);
