import { z } from "zod";

export const CourseValidation = z.object({
	code: z
		.string("Code is not a string")
		.min(6, "Code too short")
		.max(6, "Code too long")
		.regex(/^[a-zA-Z0-9]{6}$/, "Code doesn't match pattern"),
	name: z
		.string("Name is not a string")
		.min(4, "Name too short")
		.max(128, "Name too long"),
});

export type CourseValidationType = z.infer<typeof CourseValidation>;
