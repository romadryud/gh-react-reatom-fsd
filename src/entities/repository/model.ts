import {
	atom,
	onConnect,
	reatomAsync,
	withAbort,
	withDataAtom,
	withErrorAtom,
	withRetry,
} from "@reatom/framework";
import {
	Array,
	Null,
	Number,
	Record,
	Static,
	String,
	ValidationError,
} from "runtypes";
import { repositoryAPI } from "shared/api";
import { errorToast } from "shared/lib/toast";

const RepositoryResponse = Array(
	Record({
		name: String,
		description: String.Or(Null),
		stargazers_count: Number,
	})
);

const Repository = Record({
	name: String,
	description: String,
	stars: Number,
});

export type IRepository = Static<typeof Repository>;

export const reatomRepository = (name: string) => {
	const hasMoreAtom = atom(true, "hasMoreAtom");

	const fetchRepositories = reatomAsync(
		async (ctx, username: string, page: number) => {
			const itemsPerPage = page === 1 ? 5 : 30;

			const fetchedRepositories = await repositoryAPI.fetchRepositories(
				username,
				page,
				itemsPerPage,
				ctx.controller
			);

			const adaptedRepositories = RepositoryResponse.check(
				fetchedRepositories
			).map((repository) => ({
				name: repository.name,
				description: repository.description || "",
				stars: repository.stargazers_count,
			}));

			if (adaptedRepositories.length === 0) {
				hasMoreAtom(ctx, false);
			}

			return adaptedRepositories;
		},
		`fetchRepositories-${name}`
	).pipe(
		withDataAtom([], (_ctx, payload, state) => state.concat(payload)),
		withAbort({ strategy: "last-in-win" }),
		withErrorAtom((ctx, error) => {
			if (error instanceof ValidationError) {
				hasMoreAtom(ctx, false);
				errorToast(
					"repo-toast",
					"Seems like API was updated and no longer all fields are present"
				);
			}
		}),
		withRetry({
			onReject(_ctx, error: unknown, retries) {
				if (error instanceof Error) {
					return error.message.includes("rate limit")
						? 100 * Math.min(500, retries ** 2)
						: -1;
				}

				return -1;
			},
		})
	);

	onConnect(fetchRepositories.dataAtom, (ctx) =>
		fetchRepositories(ctx, name, 1)
	);

	return { fetchRepositories, hasMoreAtom };
};
