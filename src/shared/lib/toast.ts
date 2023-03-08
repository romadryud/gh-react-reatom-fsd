import { createStandaloneToast } from "@chakra-ui/react";

export const { ToastContainer, toast: chakraToast } = createStandaloneToast();

const defaultSettings = {
	position: "top-right",
	isClosable: true,
	duration: 3000,
} as const;

export const errorToast = (id: string, message: string) => {
	const isActive = chakraToast.isActive(id);

	if (isActive) {
		chakraToast({
			title: "Error",
			description: message,
			status: "error",
			...defaultSettings,
		});
	} else {
		console.error(message);
	}
};
