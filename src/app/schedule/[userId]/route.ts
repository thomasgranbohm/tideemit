// https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware#caching

import { getCoursesByUserId, getUser } from "@/lib/api";
import axios from "axios";
import ical from "ical-generator";
import { z } from "zod";

export const GET = async (
	_: Request,
	{ params }: { params: Promise<{ userId: string }> }
) => {
	const { userId } = await params;

	const user = await getUser(userId);

	if (!user.scheduleLink) {
		return Response.error();
	}

	const resp = await axios.get(user.scheduleLink.replace(".ics", ".json"));

	const makeDate = (date, time) =>
		new Date(Date.parse(`${date} ${time}`)).toISOString();

	const parsed = await z
		.object({
			columnheaders: z.string().array(),
			reservations: z
				.object({
					id: z.number(),
					startDate: z.iso.datetime(),
					endDate: z.iso.datetime(),
					columns: z.string().array(),
				})
				.array(),
		})
		.safeParse({
			columnheaders: resp.data.columnheaders,
			reservations: resp.data.reservations.map(
				({ id, startdate, starttime, enddate, endtime, columns }) => ({
					id: parseInt(id),
					startDate: makeDate(startdate, starttime),
					endDate: makeDate(enddate, endtime),
					columns,
				})
			),
		});

	if (!parsed.success) {
		console.log(parsed);
		return Response.error();
	}

	const calendar = ical({
		name: "Schedule",
		prodId: process.env.NEXT_PUBLIC_URL,
	});

	const { columnheaders, reservations } = parsed.data;

	const course_index = columnheaders.indexOf("Kurs");
	const activity_index = columnheaders.indexOf("Undervisningstyp");
	const location_index = columnheaders.indexOf("Lokal");

	const renamed_courses = await getCoursesByUserId(userId);

	const map_renamed = new Map(
		renamed_courses.map(({ code, name }) => [code, name])
	);

	for (const event of reservations) {
		const { columns, endDate, id, startDate } = event;

		const course_code = columns[course_index];
		const codes = new Set(course_code.split(", "));
		const overlap = codes.intersection(map_renamed);

		const course_name =
			overlap.size == 1
				? map_renamed.get(Array.from(overlap).pop())
				: course_code;

		calendar.createEvent({
			start: startDate,
			end: endDate,
			timezone: "Europe/Stockholm",
			summary: `${columns[activity_index]} - ${course_name}`,
			location: columns[location_index],
			id,
		});
	}

	return new Response(calendar.toString(), {
		headers: {
			"Content-Type": "text/calendar; charset=utf-8",
		},
	});
};
