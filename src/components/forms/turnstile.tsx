import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

declare global {
	interface Window {
		turnstile: {
			execute: (widgetId: string, options?) => void;
			render: (
				container: string | HTMLElement | Element,
				options
			) => string;
			reset: (widgetId: string) => void;
			remove: (widgetId: string) => void;
		};
		onloadTurnstileCallback?: () => void;
	}
}

export const TurnStile = () => {
	const pathname = usePathname();

	useEffect(() => {
		// select all turnstiles
		const turnstileContainers = document.querySelectorAll(".cf-turnstile");

		turnstileContainers.forEach((turnstileContainer) => {
			turnstileContainer.innerHTML = "";
			if (
				window &&
				"turnstile" in window &&
				"render" in window.turnstile
			) {
				window.turnstile.render(turnstileContainer, {
					sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
					callback: "javascriptCallback",
				});
			}
		});
	}, [pathname]);

	return (
		<>
			<Script
				src="https://challenges.cloudflare.com/turnstile/v0/api.js"
				async
				defer
			></Script>
			<div
				className="cf-turnstile"
				data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
				data-callback="javascriptCallback"
			></div>
		</>
	);
};
