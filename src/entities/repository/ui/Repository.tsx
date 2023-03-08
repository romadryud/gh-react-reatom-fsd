import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import { IRepository } from "../model";

export const Repository = ({ name, description, stars }: IRepository) => {
	return (
		<Flex
			border="1px"
			borderRadius={5}
			borderColor="gray.200"
			alignItems="center"
			justifyContent="space-between"
			mb={5}
			p={5}
		>
			<Box>
				<Heading size="sm">{name}</Heading>
				<Text>{description}</Text>
			</Box>

			<Flex alignItems="center">
				<Text>{stars}</Text>
				<StarIcon ml={2} />
			</Flex>
		</Flex>
	);
};
