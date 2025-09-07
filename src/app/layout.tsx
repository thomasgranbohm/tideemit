import type { Metadata } from "next";
import { Ubuntu_Sans, Ubuntu_Sans_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Toast } from "radix-ui";

import { Footer } from "@/components/footer";

import "@radix-ui/themes/styles.css";
import "./globals.css";

const swedenSans = localFont({
	src: [
		{
			path: "../../public/fonts/SwedenSans/SwedenSansBold.otf",
			weight: "700",
		},
		{
			path: "../../public/fonts/SwedenSans/SwedenSansSemiBold.otf",
			weight: "600",
		},
		{
			path: "../../public/fonts/SwedenSans/SwedenSansRegular.otf",
			weight: "400",
		},
		{
			path: "../../public/fonts/SwedenSans/SwedenSansBook.otf",
			weight: "200",
		},
	],
	variable: "--font-sweden-sans",
	declarations: [{ prop: "line-height", value: "100%" }],
});

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
		<html>
			<body
				className={`${swedenSans.variable} ${ubuntuMono.variable} ${ubuntuSans.variable} antialiased`}
			>
				<Toast.Provider swipeDirection="right">
					<div className="relative min-h-screen grid grid-rows-[1fr_auto]">
						<main>{children}</main>
						<Footer />
					</div>
					<Toast.Viewport />
				</Toast.Provider>
			</body>
		</html>
	);
}
