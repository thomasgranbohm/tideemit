import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/footer";

import "./globals.css";

const ubuntuSans = localFont({
	src: [
		{
			path: "../../public/fonts/Ubuntu/Ubuntu-B.ttf",
			weight: "700",
		},
		{
			path: "../../public/fonts/Ubuntu/Ubuntu-M.ttf",
			weight: "600",
		},
		{
			path: "../../public/fonts/Ubuntu/Ubuntu-R.ttf",
			weight: "400",
		},
		{
			path: "../../public/fonts/Ubuntu/Ubuntu-Th.ttf",
			weight: "200",
		},
	],
	variable: "--font-ubuntu-sans",
	display: "swap",
	fallback: ["American Typewriter", "monospace"],
});

const ubuntuMono = localFont({
	src: [
		{
			path: "../../public/fonts/Ubuntu/UbuntuMono-B.ttf",
			weight: "700",
		},
		{
			path: "../../public/fonts/Ubuntu/UbuntuMono-R.ttf",
			weight: "400",
		},
	],
	variable: "--font-ubuntu-mono",
});

export const metadata: Metadata = {
	title: { default: "TideEmit", template: "%s - TideEmit" },
	description: "För att TimeEdit suger",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="sv">
			<body
				className={`${ubuntuMono.variable} ${ubuntuSans.variable} bg-neutral-50 antialiased dark:bg-neutral-900`}
			>
				<div className="relative grid min-h-dvh grid-rows-[1fr_auto]">
					<main>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
