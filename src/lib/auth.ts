"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

import * as db from "./db";

export type SessionInfo = {
	userId: string;
	expires: Date;
};

const key = new TextEncoder().encode(process.env.SECRET);

export const encrypt = async (payload: SessionInfo) => {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("10 minutes from now")
		.sign(key);
};

export const login = async (formData: FormData) => {
	const parsed = z
		.object({
			userId: z.string("Not a valid userId"),
		})
		.safeParse({ userId: formData.get("userId") });

	const exists = await db.existsUser(parsed.data.userId);
	if (!exists) {
		return null;
	}

	const expires = new Date(Date.now() + 10 * 60 * 1000);
	const session = await encrypt({
		userId: parsed.data.userId,
		expires,
	});

	const cookieStore = await cookies();
	cookieStore.set("session", session, { expires, httpOnly: true });
};

export async function decrypt(input: string): Promise<SessionInfo> {
	const { payload } = await jwtVerify<SessionInfo>(input, key, {
		algorithms: ["HS256"],
	});
	return payload;
}

export async function logout() {
	const cookieStore = await cookies();
	cookieStore.set("session", "", { expires: new Date(0) });
}

export async function register() {
	const { userId } = await db.createUser();

	const expires = new Date(Date.now() + 10 * 1000);
	const session = await encrypt({
		userId,
		expires,
	});

	const cookieStore = await cookies();
	cookieStore.set("session", session, { expires, httpOnly: true });
}

export async function getSession() {
	const cookieStore = await cookies();
	const session = cookieStore.get("session")?.value;

	if (!session) return null;

	return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
	const session = request.cookies.get("session")?.value;
	if (!session) return;

	const parsed = await decrypt(session);
	// const exists = await db.existsUser(parsed.userId);
	// if (!exists) return await logout();

	parsed.expires = new Date(Date.now() + 10 * 60 * 1000);
	const res = NextResponse.next();
	res.cookies.set({
		name: "session",
		value: await encrypt(parsed),
		httpOnly: true,
		expires: parsed.expires,
	});
	return res;
}

export const createCourse = async (formData: FormData) => {
	const parsed = z
		.object({
			code: z.string().length(6),
			name: z.string().min(5).max(128),
		})
		.safeParse({ code: formData.get("code"), name: formData.get("name") });

	if (!parsed.success) {
		console.log(parsed.error);
		return null; // TODO: Implement errors
	}

	const session = await getSession();

	if (!session) {
		console.log("No session");
		return null;
	}

	return await db.createCourse(
		session.userId,
		parsed.data.code,
		parsed.data.name
	);
};

export const getCourses = async () => {
	const session = await getSession();

	if (!session) return null;

	console.log("Get courses no session");

	return await db.getCourses(session.userId);
};

export const deleteCourse = async (code: string) => {
	const session = await getSession();

	if (!session) return null;

	return await db.deleteCourse(session.userId, code);
};
