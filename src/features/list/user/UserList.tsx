import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
} from "@chakra-ui/react";
import { useAtom } from "@reatom/npm-react";
import { User, UserModel } from "entities/user";

interface IUserList {
	repositories: (user: string) => React.ReactNode;
}

export const UserList = ({ repositories }: IUserList) => {
	const [users] = useAtom(UserModel.fetchUsers.dataAtom);

	return (
		// hack with key for this issue: https://github.com/chakra-ui/chakra-ui/issues/7425
		<Accordion key={users.length} mt={5} allowMultiple>
			{users.map(({ login, avatarUrl }) => (
				<AccordionItem key={login} id={login}>
					<h2>
						<AccordionButton>
							<User login={login} avatarUrl={avatarUrl} />
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel p={0}>{repositories(login)}</AccordionPanel>
				</AccordionItem>
			))}
		</Accordion>
	);
};
