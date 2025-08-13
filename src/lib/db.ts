import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const client = new PrismaClient();

export const createUser = async () => {
	const userId = uuidv4();

	return await client.user.create({ data: { userId } });
};

export const getUser = async (userId: string) => {
	return await client.user.findFirst({ where: { userId } });
};

export const existsUser = async (userId: string) => {
	const user = await getUser(userId);

	return !!user;
};

export const getCourses = async (userId: string) => {
	const courses = await client.course.findMany({
		where: { userId },
		select: { name: true, code: true },
	});

	console.log("Courses", courses);

	return courses;
};

export const createCourse = async (
	userId: string,
	code: string,
	name: string
) => {
	return await client.course.create({ data: { code, name, userId } });
};

export const deleteCourse = async (userId: string, code: string) => {
	const course = await client.course.findFirst({ where: { userId, code } });

	if (course) {
		await client.course.delete({ where: { id: course.id } });
	}
};
