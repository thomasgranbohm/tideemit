"use server";

import { SessionInfo } from "@/types";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { cache } from "react";

const key = new TextEncoder().encode(process.env.SECRET);

export const encrypt = async (payload: SessionInfo) => {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("10 minutes from now")
		.sign(key);
};

export async function decrypt(input: string): Promise<SessionInfo> {
	const { payload } = await jwtVerify<SessionInfo>(input, key, {
		algorithms: ["HS256"],
	});
	return payload;
}

export const verifySession = cache(async () => {
	const cookieStore = await cookies();
	const cookie = cookieStore.get("session")?.value;

	if (!cookie) {
		redirect("/");
	}

	const session = await decrypt(cookie);

	if (!session?.userId) {
		redirect("/");
	}

	return {
		isAuth: true,
		userId: session.userId,
		scheduleLink: session.scheduleLink,
	};
});

export const setToken = async ({
	userId,
	scheduleLink,
}: {
	userId: string;
	scheduleLink: string;
}) => {
	const expires = new Date(Date.now() + 10 * 60 * 1000);
	const session = await encrypt({
		userId,
		scheduleLink,
		expires,
	});

	const cookieStore = await cookies();
	cookieStore.set("session", session, { expires, httpOnly: true });
};
