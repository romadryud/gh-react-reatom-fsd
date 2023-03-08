import "./styles/index.css";

import { Routing } from "pages";
import { ToastContainer } from "shared/lib/toast";

import { WithChakra, WithReatom } from "./providers";

export const App = () => {
	return (
		<WithChakra>
			<WithReatom>
				<Routing />
				<ToastContainer />
			</WithReatom>
		</WithChakra>
	);
};
