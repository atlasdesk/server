import { publicProcedure } from "./public";
import { validateAuthorization } from "../lib/validateAuthorization";

export const privateProcedure = publicProcedure.use(async (opts) => {
	const { ctx } = opts;

	const user = await validateAuthorization(ctx.authorization);

	return opts.next({
		ctx: {
			user,
		},
	});
});
