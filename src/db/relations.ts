import { relations } from "drizzle-orm/relations";
import { userSchema, courseSchema } from "./schema";

export const courseRelations = relations(courseSchema, ({ one }) => ({
	user: one(userSchema, {
		fields: [courseSchema.userId],
		references: [userSchema.userId],
	}),
}));

export const userRelations = relations(userSchema, ({ many }) => ({
	courses: many(courseSchema),
}));
