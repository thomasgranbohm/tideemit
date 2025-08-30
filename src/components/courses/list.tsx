import { getCourses } from "@/lib/api";
import { InlineCourse } from "./item";
import { Table } from "@radix-ui/themes";

export const CourseList = async () => {
	const courses = await getCourses();

	return (
		<Table.Root className="border-collapse border" variant="surface">
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell className="p-2 border">
						Code
					</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell className="p-2 border" width="100%">
						Name
					</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell className="p-2 border">
						Actions
					</Table.ColumnHeaderCell>
				</Table.Row>
			</Table.Header>
			<tbody className="list-none">
				{courses.map((info, i) => (
					<InlineCourse key={i} {...info} />
				))}
			</tbody>
		</Table.Root>
	);
};
