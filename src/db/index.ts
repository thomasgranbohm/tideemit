import { drizzle } from "drizzle-orm/libsql";
import { courseSchema, userSchema } from "./schema";
import { and, eq } from "drizzle-orm";
import { v4 } from "uuid";

const client = drizzle(process.env.DATABASE_URL!);

export const createUser = async (scheduleLink: string) => {
	const userIds = await client
		.insert(userSchema)
		.values({ userId: v4(), scheduleLink })
		.returning({ userId: userSchema.userId });

	return userIds[0];
};

export const getUser = async (userId: string) => {
	const users = await client
		.select()
		.from(userSchema)
		.where(eq(userSchema.userId, userId))
		.limit(1);

	return users[0];
};

export const updateUser = async (userId: string, scheduleLink: string) => {
	const users = await client
		.update(userSchema)
		.set({ scheduleLink })
		.where(eq(userSchema.userId, userId))
		.returning();

	return users[0];
};

export const createCourse = async (
	newCourse: typeof courseSchema.$inferInsert,
) => {
	return client
		.insert(courseSchema)
		.values(newCourse)
		.returning({ userId: userSchema.userId });
};

export const countCourses = async (userId: string) => {
	return client.$count(courseSchema, eq(courseSchema.userId, userId));
};

export const deleteCourse = async (userId: string, code: string) => {
	return client
		.delete(courseSchema)
		.where(
			and(eq(courseSchema.code, code), eq(courseSchema.userId, userId)),
		)
		.returning({ deletedId: courseSchema.code });
};

export const getCourses = async (userId: string) => {
	return client
		.select()
		.from(courseSchema)
		.where(eq(courseSchema.userId, userId))
		.orderBy(courseSchema.code);
};
