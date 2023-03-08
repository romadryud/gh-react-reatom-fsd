import { RepositoryList, UserList } from "features/list";

export const List = () => {
	return (
		<UserList repositories={(user: string) => <RepositoryList user={user} />} />
	);
};
