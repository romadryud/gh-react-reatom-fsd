import { Record, String } from "runtypes";

const envRecord = Record({
	GH_API_URL: String,
	GH_API_TOKEN: String,
});

export const env = envRecord.check(import.meta.env);
