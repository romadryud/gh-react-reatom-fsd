import { connectLogger, createCtx } from "@reatom/framework";
import { reatomContext } from "@reatom/npm-react";

interface IWithReatom {
	children: React.ReactNode;
}

const ctx = createCtx();

if (process.env.NODE_ENV === "development") {
	connectLogger(ctx);
}

export const WithReatom = ({ children }: IWithReatom) => {
	return (
		<reatomContext.Provider value={ctx}>{children}</reatomContext.Provider>
	);
};
