import { env } from "shared/lib/env";

const { GH_API_URL, GH_API_TOKEN } = env;

export const BASE_URL = GH_API_URL;

export const headers = new Headers({
	"Content-Type": "application/json",
	"Authorization": `Bearer ${GH_API_TOKEN}`,
});
