import { getCloudflareContext } from "@opennextjs/cloudflare";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { cache } from "react";
import { v4 } from "uuid";
import * as schema from "./schema";
import { courseSchema, userSchema } from "./schema";

export const getDatabase = cache(async () => {
	const { env } = await getCloudflareContext({ async: true });
	return drizzle(env.DATABASE, { schema });
});

export const getCache = cache(async () => {
	const { env } = await getCloudflareContext({ async: true });
	return env.CACHE;
});

export const invalidateCache = async (userId: string) => {
	const c = await getCache();

	await c.delete(userId);
};

export const createUser = async (scheduleLink: string) => {
	const db = await getDatabase();

	const userIds = await db
		.insert(userSchema)
		.values({ userId: v4(), scheduleLink })
		.returning({ userId: userSchema.userId });

	return userIds[0];
};

export const getUser = async (userId: string) => {
	const db = await getDatabase();

	const users = await db
		.select()
		.from(userSchema)
		.where(eq(userSchema.userId, userId))
		.limit(1);

	return users[0];
};

export const updateUser = async (userId: string, scheduleLink: string) => {
	const db = await getDatabase();

	const users = await db
		.update(userSchema)
		.set({ scheduleLink })
		.where(eq(userSchema.userId, userId))
		.returning();

	return users[0];
};

export const createCourse = async (
	newCourse: typeof courseSchema.$inferInsert,
) => {
	const db = await getDatabase();

	return db
		.insert(courseSchema)
		.values(newCourse)
		.returning({ userId: userSchema.userId });
};

export const countCourses = async (userId: string) => {
	const db = await getDatabase();

	return db.$count(courseSchema, eq(courseSchema.userId, userId));
};

export const deleteCourse = async (userId: string, code: string) => {
	const db = await getDatabase();

	return db
		.delete(courseSchema)
		.where(
			and(eq(courseSchema.code, code), eq(courseSchema.userId, userId)),
		)
		.returning({ deletedId: courseSchema.code });
};

export const getCourses = async (userId: string) => {
	const db = await getDatabase();

	return db
		.select()
		.from(courseSchema)
		.where(eq(courseSchema.userId, userId))
		.orderBy(courseSchema.code);
};
