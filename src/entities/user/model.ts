import {
	onUpdate,
	reatomAsync,
	withAbort,
	withDataAtom,
	withRetry,
} from "@reatom/framework";
import { Array, Record, Static, String, ValidationError } from "runtypes";
import { userAPI } from "shared/api/user";
import { errorToast } from "shared/lib/toast";

const UserResponse = Record({
	login: String,
	avatar_url: String,
});

const User = Record({
	login: String,
	avatarUrl: String,
});

const UsersResponse = Array(UserResponse);

export type IUser = Static<typeof User>;

export const fetchUsers = reatomAsync(
	async (ctx, username: string) => {
		const { items: fetchedUsers } = await userAPI.fetchUsers(
			username,
			ctx.controller
		);

		const adaptedUsers = UsersResponse.check(fetchedUsers).map((user) => ({
			login: user.login,
			avatarUrl: user.avatar_url,
		}));

		return adaptedUsers;
	},
	{
		name: "fetchUsers",
		onReject: (_ctx, error) => {
			if (error instanceof ValidationError) {
				errorToast(
					"user-toast",
					"Seems like API was updated and no longer all fields are present"
				);
			}
		},
	}
).pipe(
	withDataAtom([]),
	withAbort({ strategy: "last-in-win" }),
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

onUpdate(fetchUsers, fetchUsers.dataAtom.reset);
