import { BASE_URL, headers } from "./config";

export const repositoryAPI = {
	fetchRepositories: (
		username: string,
		page: number,
		itemsPerPage: number,
		controller: AbortController
	) =>
		fetch(
			`${BASE_URL}/users/${username}/repos?page=${page}&per_page=${itemsPerPage}}`,
			{
				headers,
				signal: controller.signal,
			}
		).then(async (r) => {
			if (r.status !== 200) throw new Error(await r.text());

			return r.json();
		}),
};
