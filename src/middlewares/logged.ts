import { prisma } from "../../server";
import { privateProcedure } from "./private";

// NOTE: Muss noch mit der Datenbank eingebunden werden.
export const loggedProcedure = privateProcedure.use(async (opts) => {
	const start = Date.now();

	const result = await opts.next();

	const durationMs = Date.now() - start;

	await prisma.apiRequests.create({
		data: {
			ip: opts.ctx.ip ?? "",
			method: opts.type,
			path: opts.path,
			responseSize: JSON.stringify(result).length,
			responseTime: durationMs,
			userAgent: opts.ctx.req?.headers["user-agent"] || "",
			status: result.ok ? 200 : 500,
			user_id: opts.ctx.user.id
		}
	})

	return result;
});
