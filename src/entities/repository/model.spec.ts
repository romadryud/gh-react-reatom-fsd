import { createTestCtx } from "@reatom/testing";
import { repositoryAPI } from "shared/api";
import { expect, test, vi } from "vitest";

import { RepositoryModel } from ".";

const { reatomRepository } = RepositoryModel;

const username = "username";
const repositoriesResponseMock = [
	{
		name: "repository name",
		description: "repository description",
		stargazers_count: 100,
	},
];
// adaptedRepositories has 2 elements because we load 2 time, one on connect, second on call
const adaptedRepositories = [
	{
		name: "repository name",
		description: "repository description",
		stars: 100,
	},
	{
		name: "repository name",
		description: "repository description",
		stars: 100,
	},
];
const repositoriesIncorrectResponseMock = [
	{
		login: "login",
		avatarUrl: "avatarUrl",
	},
];

const fetchRepositoriesAPiMock = vi
	.spyOn(repositoryAPI, "fetchRepositories")
	.mockResolvedValueOnce(repositoriesResponseMock)
	.mockResolvedValueOnce(repositoriesResponseMock);

test("should fetch repositories for user", async () => {
	const { fetchRepositories } = reatomRepository("should-fetch-repositories");
	const ctx = createTestCtx();
	const dataTrack = ctx.subscribeTrack(fetchRepositories.dataAtom);

	await fetchRepositories(ctx, username, 2);

	expect(dataTrack.lastInput()).toEqual(adaptedRepositories);
});

fetchRepositoriesAPiMock.mockResolvedValueOnce(
	repositoriesIncorrectResponseMock
);

test("should throw validation error on fetched repositories", async () => {
	const { fetchRepositories } = reatomRepository("should-throw-validation");

	const ctx = createTestCtx();

	await expect(fetchRepositories(ctx, username, 1)).rejects.toThrow(
		"Validation failed"
	);
});

fetchRepositoriesAPiMock
	.mockResolvedValueOnce(repositoriesResponseMock)
	.mockRejectedValueOnce("API rate limit exceeded")
	.mockResolvedValueOnce(repositoriesResponseMock);

test("should retry to fetch repositories after API rate limit exceeded", async () => {
	const { fetchRepositories } = reatomRepository(
		"should-sretry-to-repositories"
	);
	const ctx = createTestCtx();
	const dataTrack = ctx.subscribeTrack(fetchRepositories.dataAtom);

	await expect(fetchRepositories(ctx, username, 2)).rejects.toThrow(
		"API rate limit exceeded"
	);
	await fetchRepositories(ctx, username, 3);

	expect(dataTrack.lastInput()).toEqual(adaptedRepositories);
});
