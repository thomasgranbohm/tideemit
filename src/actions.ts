"use server";

import { CourseInfo, FormStateResponse } from "@/types";
import { CodeValidation, CourseValidation } from "@/validators";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import z from "zod";
import { encrypt, verifySession } from "./session";

const client = new PrismaClient();

export const getCourses = async () => {
	const session = await verifySession();

	if (!session) {
		console.log("Get courses no session");
		return null;
	}

	return await getCoursesByUserId(session.userId);
};

export const login = async (formData: FormData) => {
	const parsed = z
		.object({
			userId: z.string("Not a valid userId"),
		})
		.safeParse({ userId: formData.get("userId") });

	const user = await client.user.findFirst({
		where: { userId: parsed.data.userId },
	});

	if (user == null) {
		return null;
	}

	const expires = new Date(Date.now() + 10 * 60 * 1000);
	const session = await encrypt({
		userId: parsed.data.userId,
		expires,
	});

	const cookieStore = await cookies();
	cookieStore.set("session", session, { expires, httpOnly: true });

	redirect("/schedule");
};
export async function logout() {
	const cookieStore = await cookies();
	cookieStore.set("session", "", { expires: new Date(0) });
}

export async function register() {
	const userId = uuidv4();

	await client.user.create({ data: { userId } });

	const expires = new Date(Date.now() + 10 * 1000);
	const session = await encrypt({
		userId,
		expires,
	});

	const cookieStore = await cookies();
	cookieStore.set("session", session, { expires, httpOnly: true });
}

export const createCourse = async (
	prevState,
	formData: FormData
): Promise<FormStateResponse<CourseInfo>> => {
	const session = await verifySession();

	if (!session) {
		return redirect("/");
	}

	const parsed = CourseValidation.safeParse({
		code: formData.get("code"),
		name: formData.get("name"),
	});

	if (!parsed.success) {
		return {
			success: false,
			message: "Validation error",
			errors: z.flattenError(parsed.error).fieldErrors,
		};
	}

	const coursesCount = await client.course.count({
		where: { userId: session.userId },
	});
	if (coursesCount >= 10) {
		return {
			success: false,
			message: "User has reached max courses",
		};
	}

	await client.course.create({
		data: {
			code: parsed.data.code,
			name: parsed.data.name,
			userId: session.userId,
		},
	});

	return { success: true, message: "Course created successfully!" };
};

export const getCoursesByUserId = async (userId: string) => {
	const courses = await client.course.findMany({
		where: { userId },
		select: { name: true, code: true },
	});

	return courses;
};

export const deleteCourse = async (formData: FormData) => {
	// TODO: Does this need error handling?
	const session = await verifySession();
	if (!session) return null;

	const parsed = CodeValidation.safeParse(formData.get("code"));

	const course = await client.course.findFirst({
		where: { userId: session.userId, code: parsed.data },
	});

	if (course) {
		await client.course.delete({ where: { id: course.id } });
	}
};

export const getUser = async (userId: string) => {
	const user = await client.user.findFirst({
		where: { userId },
	});

	if (user == null) {
		return null;
	}

	return user;
};
