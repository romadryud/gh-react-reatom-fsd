import { createTestCtx } from "@reatom/testing";
import { userAPI } from "shared/api";
import { expect, test, vi } from "vitest";

import { UserModel } from ".";

const { fetchUsers } = UserModel;
const username = "username";
const usersResponseMock = [
	{
		login: "login",
		avatar_url: "avatarUrl",
	},
];
const usersIncorrectResponseMock = [
	{
		login: "login",
		avatarUrl: "avatarUrl",
	},
];
const adaptedUsers = [{ login: "login", avatarUrl: "avatarUrl" }];

const fetchUsersAPiMock = vi
	.spyOn(userAPI, "fetchUsers")
	.mockResolvedValueOnce({
		items: usersResponseMock,
	});

test("should fetch users", async () => {
	const ctx = createTestCtx();

	const track = ctx.subscribeTrack(fetchUsers);
	const dataTrack = ctx.subscribeTrack(fetchUsers.dataAtom);

	await fetchUsers(ctx, username);

	expect(track.lastInput()[0].params).toEqual([username]);
	expect(dataTrack.lastInput()).toEqual(adaptedUsers);
});

fetchUsersAPiMock.mockResolvedValueOnce({
	items: usersIncorrectResponseMock,
});

test("should throw validation error on fetched users", async () => {
	const ctx = createTestCtx();

	await expect(fetchUsers(ctx, username)).rejects.toThrow("Validation failed");
});

fetchUsersAPiMock
	.mockRejectedValueOnce("API rate limit exceeded")
	.mockResolvedValueOnce({
		items: usersResponseMock,
	});

test("should retry to fetch users after API rate limit exceeded", async () => {
	const ctx = createTestCtx();
	const dataTrack = ctx.subscribeTrack(fetchUsers.dataAtom);

	await expect(fetchUsers(ctx, username)).rejects.toThrow(
		"API rate limit exceeded"
	);
	await fetchUsers(ctx, username);

	expect(dataTrack.lastInput()).toEqual(adaptedUsers);
});
