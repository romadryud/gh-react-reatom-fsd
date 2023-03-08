import { Button, Flex, FormControl, Input } from "@chakra-ui/react";
import { useAction, useAtom } from "@reatom/npm-react";
import { UserModel } from "entities/user";

import { searchAtom } from "./model";

const { fetchUsers } = UserModel;

export const Search = () => {
	const [search, setSearch] = useAtom(searchAtom);
	const onFetchUser = useAction(fetchUsers);
	const [isLoading] = useAtom(
		(ctx) =>
			ctx.spy(fetchUsers.pendingAtom) + ctx.spy(fetchUsers.retriesAtom) > 0
	);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onFetchUser(search);
	};

	return (
		<form onSubmit={onSubmit}>
			<FormControl>
				<Flex direction={["column", "row"]} alignContent="center" width="100%">
					<Input
						mr={[0, 10]}
						mb={[5, 0]}
						type="search"
						placeholder="Enter username"
						aria-label="enter username"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button
						colorScheme="teal"
						type="submit"
						isLoading={isLoading}
						isDisabled={search.length === 0}
					>
						Search
					</Button>
				</Flex>
			</FormControl>
		</form>
	);
};
