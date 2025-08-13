import { NextRequest } from "next/server";
import { updateSession } from "./lib/auth";

export const middleware = async (request: NextRequest) => {
	return await updateSession(request);
};
