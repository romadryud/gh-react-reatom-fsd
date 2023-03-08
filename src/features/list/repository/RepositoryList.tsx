import { Progress } from "@chakra-ui/react";
import { useAction, useAtom } from "@reatom/npm-react";
import { Repository, RepositoryModel } from "entities/repository";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroller";

const { reatomRepository } = RepositoryModel;

interface IRepositoryList {
	user: string;
}

export const RepositoryList = ({ user }: IRepositoryList) => {
	const { fetchRepositories, hasMoreAtom } = React.useMemo(
		() => reatomRepository(user),
		[user]
	);
	const [hasMore] = useAtom(hasMoreAtom);
	const [repositories] = useAtom(fetchRepositories.dataAtom);
	const handleFetchMore = useAction(fetchRepositories);

	return (
		<InfiniteScroll
			pageStart={1}
			loadMore={(page) => handleFetchMore(user, page)}
			hasMore={hasMore}
			// key there in necessary, look: https://github.com/danbovey/react-infinite-scroller/issues/151
			loader={<Progress key={0} width="100%" isIndeterminate />}
		>
			{repositories.map(({ name, description, stars }) => (
				<Repository
					key={name}
					name={name}
					description={description}
					stars={stars}
				/>
			))}
		</InfiniteScroll>
	);
};
