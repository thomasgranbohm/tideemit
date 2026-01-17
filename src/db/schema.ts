import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userSchema = sqliteTable("User", {
	userId: text().primaryKey().notNull(),
	scheduleLink: text(),
});

export const courseSchema = sqliteTable("Course", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	code: text().notNull(),
	name: text().notNull(),
	userId: text()
		.notNull()
		.references(() => userSchema.userId, {
			onDelete: "restrict",
			onUpdate: "cascade",
		}),
});
