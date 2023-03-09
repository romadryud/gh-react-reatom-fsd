import { Flex } from "@chakra-ui/react";
import { useAction, useAtom } from "@reatom/npm-react";
import { UserModel } from "entities/user";
import { RepositoryList, UserList } from "features/list";
import { Search } from "features/search";

const { fetchUsers } = UserModel;

export const MainPage = () => {
	const [isLoading] = useAtom(
		(ctx) =>
			ctx.spy(fetchUsers.pendingAtom) + ctx.spy(fetchUsers.retriesAtom) > 0
	);
	const onFetchUsers = useAction(fetchUsers);

	return (
		<Flex p={[5, 20]} direction="column">
			<Search onSearch={onFetchUsers} isLoading={isLoading} />
			<UserList
				repositories={(user: string) => <RepositoryList user={user} />}
			/>
		</Flex>
	);
};
