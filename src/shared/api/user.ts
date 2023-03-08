import { BASE_URL } from "./config";

export const userAPI = {
	fetchUsers: (username: string, controller: AbortController) =>
		fetch(`${BASE_URL}/search/users?q=${username}&per_page=5`, controller).then(
			async (r) => {
				if (r.status !== 200) throw new Error(await r.text());

				return r.json();
			}
		),
};
