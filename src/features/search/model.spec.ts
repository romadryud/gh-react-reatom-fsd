import { createTestCtx } from "@reatom/testing";
import { expect, test } from "vitest";

import { SearchModel } from ".";

test("search should be updated", () => {
	const username = "username";
	const ctx = createTestCtx();
	const { searchAtom } = SearchModel;

	const track = ctx.subscribeTrack(searchAtom);

	searchAtom(ctx, username);
	expect(track.lastInput(), username);
});
