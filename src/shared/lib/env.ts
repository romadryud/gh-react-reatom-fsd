import { Record, String } from "runtypes";

const envRecord = Record({
	LD_API_URL: String,
});

export const env = envRecord.check(import.meta.env);

const test = env.LD_API_URL;

console.log(test);
