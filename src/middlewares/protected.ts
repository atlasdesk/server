import { publicProcedure } from "./publicProcedure";
import { validateAuthorization } from "../lib/validateAuthorization";


/**
 * Eine Mischung aus publicProcedure und privateProcedure.
 * Falls ein Authorization Header mitgegeben wurde, wird der Benutzer authentifiziert und in den Kontext geschrieben.
 * Falls kein Authorization Header mitgegeben wurde, wird der Benutzer auf null gesetzt.
 * @date 1/15/2024 - 10:12:55 AM
 */
export const mixedProtectedProcedure = publicProcedure.use(async (opts) => {
	const { ctx } = opts;

	if (!ctx.authorization) {
		return opts.next({
			ctx: {
				user: null,
			},
		})
	}

	const user = await validateAuthorization(ctx.authorization);

	return opts.next({
		ctx: {
			user,
		},
	});
});
