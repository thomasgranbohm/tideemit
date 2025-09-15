"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const useNotificationTimer = (
	callback?: () => void
): [boolean, () => void] => {
	const timerRef = useRef(0);
	const [open, setOpen] = useState(false);

	const startTimer = useCallback(() => {
		setOpen(true);

		if (callback) {
			callback();
		}

		timerRef.current = window.setTimeout(() => setOpen(false), 3e3);
	}, [callback]);

	useEffect(() => {
		return () => clearTimeout(timerRef.current);
	}, []);

	return [open, startTimer];
};
