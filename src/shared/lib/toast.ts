import { createStandaloneToast } from "@chakra-ui/react";

export const { ToastContainer, toast: chakraToast } = createStandaloneToast();

const isMobile = window.matchMedia("(max-width: 30em)").matches;

const defaultSettings = {
	position: isMobile ? "bottom" : "top-right",
	isClosable: true,
	duration: 3000,
} as const;

export const errorToast = (id: string, message: string) => {
	const isActive = chakraToast.isActive(id);

	if (!isActive) {
		chakraToast({
			id,
			title: "Error",
			description: message,
			status: "error",
			...defaultSettings,
		});
	}
};
