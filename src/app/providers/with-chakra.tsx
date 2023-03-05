import { ChakraProvider } from "@chakra-ui/react";

interface IWithChakra {
	children: React.ReactNode;
}

export const WithChakra = ({ children }: IWithChakra) => {
	return <ChakraProvider>{children}</ChakraProvider>;
};
