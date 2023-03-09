import { Button, Flex, FormControl, Input } from "@chakra-ui/react";
import { useAtom } from "@reatom/npm-react";

import { searchAtom } from "./model";

interface ISearch {
	onSearch: (query: string) => void;
	isLoading: boolean;
}

export const Search = ({ onSearch, isLoading }: ISearch) => {
	const [search, setSearch] = useAtom(searchAtom);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSearch(search);
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
