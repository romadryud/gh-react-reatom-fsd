import { Flex } from "@chakra-ui/react";
import { Search } from "features/search";
import { List } from "widgets/list";

export const MainPage = () => {
	return (
		<Flex p={[5, 20]} direction="column">
			<Search />
			<List />
		</Flex>
	);
};
