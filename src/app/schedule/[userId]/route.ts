// TODO: Cache the response if the TimeEdit schedule hasn't change or if the user hasn't changed any settings
// https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware#caching

import { getCoursesByUserId, getUser } from "@/actions";
import axios from "axios";
import ical from "ical-generator";
import { DateTime } from "luxon";
import { permanentRedirect } from "next/navigation";
import { z } from "zod";

export const GET = async (
	_: Request,
	{ params }: { params: Promise<{ userId: string }> },
) => {
	const { userId } = await params;

	if (!userId.endsWith(".ics")) {
		permanentRedirect(`/schedule/${userId}.ics`);
	}

	const user = await getUser(userId);

	if (!user.scheduleLink) {
		return new Response(null, { status: 404 });
	}

	const scheduleLink = new URL(user.scheduleLink);
	scheduleLink.pathname = scheduleLink.pathname.replace(/\.ics$/, ".json");
	const resp = await axios.get(scheduleLink.toString());

	const parsed = await z
		.object({
			columnheaders: z.string().array(),
			reservations: z
				.object({
					id: z.number(),
					starttime: z.iso.time(),
					endtime: z.iso.time(),
					startdate: z.iso.date(),
					enddate: z.iso.date(),
					columns: z.string().array(),
				})
				.array(),
		})
		.safeParse({
			columnheaders: resp.data.columnheaders,
			reservations: resp.data.reservations.map(
				({ id, startdate, starttime, enddate, endtime, columns }) => ({
					id: parseInt(id),
					starttime,
					endtime,
					startdate,
					enddate,
					columns,
				}),
			),
		});

	if (!parsed.success) {
		return Response.error();
	}

	const calendar = ical({
		name: "TideEmit",
		prodId: process.env.NEXT_PUBLIC_URL,
	});

	const { columnheaders, reservations } = parsed.data;

	const course_index = columnheaders.indexOf("Kurs");
	const activity_index = columnheaders.indexOf("Undervisningstyp");
	const location_index = columnheaders.indexOf("Lokal");
	const comment_index = columnheaders.indexOf("Information till student");
	const map_index = columnheaders.indexOf("Kartlänk");
	const free_group_index = columnheaders.indexOf("Fria grupper");

	const renamed_courses = await getCoursesByUserId(userId);

	const map_renamed = new Map(
		renamed_courses.map(({ code, name }) => [code, name]),
	);

	const createDate = (date, time) =>
		DateTime.fromSQL(`${date} ${time}`, {
			zone: process.env.TIMEZONE,
		})
			.toUTC()
			.toISO();

	const createSummary = (activity, course_name) => {
		const s = [activity];

		if (course_name.length > 0) {
			s.push(course_name);
		}

		return s.join(" - ");
	};

	const createDescription = (comment, free_group) => {
		const description = [];

		if (free_group?.length > 0) {
			description.push(free_group);
		}
		if (comment?.length > 0) {
			description.push(comment);
		}

		return description.join("\n");
	};

	for (const event of reservations) {
		const { columns, id, enddate, endtime, startdate, starttime } = event;

		const course_code = columns[course_index];
		const codes = new Set(course_code.split(", "));
		const overlap = codes.intersection(map_renamed);

		const course_name =
			overlap.size == 1
				? map_renamed.get(Array.from(overlap).pop())
				: course_code;

		calendar.createEvent({
			id,
			start: createDate(startdate, starttime),
			end: createDate(enddate, endtime),
			summary: createSummary(columns[activity_index], course_name),
			location: columns[location_index],
			description: createDescription(
				columns[comment_index],
				columns[free_group_index],
			),
			url: columns[map_index],
		});
	}

	return new Response(calendar.toString(), {
		headers: {
			"Content-Type": "text/calendar; charset=utf-8",
		},
	});
};
