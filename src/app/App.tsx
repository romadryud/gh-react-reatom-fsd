import "./styles/index.css";

import { Routing } from "pages";

import { WithChakra, WithReatom } from "./providers";

export const App = () => {
	return (
		<WithChakra>
			<WithReatom>
				<Routing />
			</WithReatom>
		</WithChakra>
	);
};
