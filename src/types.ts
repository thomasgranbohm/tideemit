export type CourseInfo = { code: string; name: string };

export type SessionInfo = {
	userId: string;
	scheduleLink: string;
	expires: Date;
};

export type FormStateResponse<T> =
	| {
			success: true;
			message: string;
	  }
	| {
			success: false;
			message: string;
			errors?: { [P in keyof T]?: string[] };
	  };
