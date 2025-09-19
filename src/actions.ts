"use server";

import { CourseInfo, FormStateResponse } from "@/types";
import { CodeValidation, CourseValidation } from "@/validators";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { setToken, verifySession } from "./session";
import { v4 } from "uuid";

const client = new PrismaClient();

export const getCourses = async () => {
	const session = await verifySession();

	if (!session) {
		console.log("Get courses no session");
		return null;
	}

	return await getCoursesByUserId(session.userId);
};

export const login = async (_, formData: FormData) => {
	const parsed = z
		.object({
			userId: z.string("Not a valid userId"),
		})
		.safeParse({ userId: formData.get("userId") });

	// FIXME: Needs validation error handling

	const user = await client.user.findFirst({
		where: { userId: parsed.data.userId },
	});

	if (user == null) {
		return { message: "Kunde inte hitta användaren", errored: true };
	}

	await setToken({
		userId: parsed.data.userId,
		scheduleLink: user.scheduleLink,
	});

	redirect("/schedule");
};

export const signup = async (_, formData: FormData) => {
	const cfTurnstileResponse = formData.get("cf-turnstile-response") as string;

	const reqHeaders = await headers();
	const ip = reqHeaders.get("x-real-ip");

	const verifyFormData = new FormData();
	verifyFormData.append("secret", process.env.TURNSTILE_SECRET_KEY);
	verifyFormData.append("response", String(cfTurnstileResponse));
	verifyFormData.append("remoteip", String(ip));

	const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

	try {
		const result = await fetch(url, {
			body: verifyFormData,
			method: "POST",
		});

		const outcome = await result.json();
		if (!outcome.success) {
			return {
				message: "CAPTCHA misslyckades.",
			};
		}
	} catch (err) {
		console.log(err);

		return {
			message: "Unable to verify CAPTCHA",
		};
	}

	const userId = v4();
	const parsed = z
		.object({
			scheduleLink: z.url({ hostname: /^cloud\.timeedit\.net$/ }),
		})
		.safeParse({ scheduleLink: formData.get("scheduleLink") });

	if (!parsed.success) {
		return {
			message: "Någonting är fel med länken.",
		};
	}

	await client.user.create({
		data: { scheduleLink: parsed.data.scheduleLink, userId },
	});

	await setToken({
		userId: userId,
		scheduleLink: parsed.data.scheduleLink,
	});

	redirect("/schedule");
};

export async function logout() {
	const cookieStore = await cookies();
	cookieStore.set("session", "", { expires: new Date(0) });
}

export const updateSchedule = async (_, formData: FormData) => {
	const session = await verifySession();

	const parsed = z
		.object({
			scheduleLink: z.url({ hostname: /^cloud\.timeedit\.net$/ }),
		})
		.safeParse({ scheduleLink: formData.get("scheduleLink") });

	if (!parsed.success) {
		return {
			message: "Någonting är fel med länken.",
		};
	}

	try {
		const updateUser = await client.user.update({
			data: { scheduleLink: parsed.data.scheduleLink },
			where: { userId: session.userId },
		});

		await setToken(updateUser);

		revalidatePath("/schedule");

		return { message: "Uppdaterade schemalänken!", success: true };
	} catch {
		return {
			message: "Kunde inte uppdatera schemalänken.",
			success: false,
		};
	}
};

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
		orderBy: { code: "asc" },
	});

	return courses;
};

export const deleteCourse = async (formData: FormData) => {
	// TODO: Does this need error handling?
	// TODO: Do i even need this?
	const session = await verifySession();
	if (!session) return null;

	const parsed = CodeValidation.safeParse(formData.get("code"));

	const course = await client.course.findFirst({
		where: { userId: session.userId, code: parsed.data },
	});

	if (course) {
		await client.course.delete({ where: { id: course.id } });
	}

	revalidatePath("/schedule");
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
