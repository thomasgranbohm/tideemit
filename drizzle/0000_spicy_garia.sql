CREATE TABLE `Course` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON UPDATE cascade ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `User` (
	`userId` text PRIMARY KEY NOT NULL,
	`scheduleLink` text
);
