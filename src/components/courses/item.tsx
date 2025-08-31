"use client";

import { deleteCourse } from "@/lib/api";
import { CourseInfo } from "@/types";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Flex, Spinner, Table } from "@radix-ui/themes";
import { useFormStatus } from "react-dom";

const DeleteButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" disabled={pending} color="red">
			<Spinner loading={pending}>
				<TrashIcon />
			</Spinner>
			Delete
		</Button>
	);
};

export const InlineCourse = ({ code, name }: CourseInfo) => {
	return (
		<Table.Row className="p-2 border rounded">
			<Table.RowHeaderCell className="p-2">
				<p className="font-mono font-bold">{code}</p>
			</Table.RowHeaderCell>
			<Table.Cell className="p-2">{name}</Table.Cell>
			<Table.Cell className="p-2">
				<Flex gap="2">
					<form>
						<input type="hidden" name="code" value={code} />
						<Button type="submit" color="green">
							<Spinner loading={false}>
								<Pencil1Icon />
							</Spinner>
							Rename
						</Button>
					</form>
					<form action={deleteCourse}>
						<input type="hidden" name="code" value={code} />
						<DeleteButton />
					</form>
				</Flex>
			</Table.Cell>
		</Table.Row>
	);
};
