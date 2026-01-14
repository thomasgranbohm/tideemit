import { NextRequest } from "next/server";
import { updateSession } from "./session";

export const proxy = async (request: NextRequest) => {
	return await updateSession(request);
};
