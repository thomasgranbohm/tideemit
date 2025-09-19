import { z } from "zod";

export const TimeEditLinkValidation = z.url({
	pattern: /^https:\/\/cloud\.timeedit\.net\/liu\/web\/schema\//,
});

export const CodeValidation = z
	.string("Kurskoden måste vara text")
	.min(6, "Kurskoden är för kort")
	.max(6, "Kurskoden är för lång")
	.regex(/^[a-zA-Z0-9]{6}$/, "Kurskoden innehåller ogiltiga tecken");

export type CodeValidationType = z.infer<typeof CodeValidation>;

export const CourseValidation = z.object({
	code: CodeValidation,
	name: z
		.string("Kursnamnet måste vara text")
		.min(4, "Kursnamnet är för kort")
		.max(128, "Kursnamnet är för långt"),
});

export type CourseValidationType = z.infer<typeof CourseValidation>;
