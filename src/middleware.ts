import { NextRequest } from "next/server";
import { updateSession } from "./session";

export const middleware = async (request: NextRequest) => {
	return await updateSession(request);
};
