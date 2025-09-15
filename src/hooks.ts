"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const useCopyToClipboard = (value: string): [boolean, () => void] => {
	const timerRef = useRef(0);
	const [open, setOpen] = useState(false);

	const callback = useCallback(() => {
		setOpen(true);
		if ("navigator" in window && "clipboard" in window.navigator) {
			window.navigator.clipboard.writeText(value);

			timerRef.current = window.setTimeout(() => setOpen(false), 3e3);
		} else {
			alert(value);
		}
	}, [value]);

	useEffect(() => {
		return () => clearTimeout(timerRef.current);
	}, []);

	return [open, callback];
};
