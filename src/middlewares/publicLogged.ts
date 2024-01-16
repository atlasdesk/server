import { prisma } from "../../server";
import { publicProcedure } from "./public";

export const loggedPublicProcedure = publicProcedure.use(async (opts) => {
	const result = await opts.next();

	await prisma.apiRequest.create({
		data: {
			ipAddress: opts.ctx.ip ?? "",
			method: opts.type,
			endpoint: opts.path,
			responseCode: result.ok ? 200 : 500,
			userAgent: opts.ctx.req?.headers["user-agent"] || "",
		}
	})

	return result;
});
