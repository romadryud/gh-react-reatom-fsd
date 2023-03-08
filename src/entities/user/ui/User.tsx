import { Avatar, Box, Flex, Heading } from "@chakra-ui/react";

import { IUser } from "../model";

export const User = ({ login, avatarUrl }: IUser) => {
	return (
		<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
			<Avatar name={login} src={avatarUrl} />
			<Box>
				<Heading size="sm">{login}</Heading>
			</Box>
		</Flex>
	);
};
