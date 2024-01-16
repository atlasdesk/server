import { z } from "zod";
import { prisma } from "../../../server";
import { privateProcedure } from "../../middlewares/private";
import { TicketSchemaClient } from "../../types";

export const getTicketsProcedure = privateProcedure
	.input(
		z.object({
			cursor: z.number().optional(),
			limit: z.number().min(2).max(100).optional()
		})
	)
	.output(TicketSchemaClient.array())
	.query(async (opts) => {
		const tickets = await prisma.ticket.findMany({
			include: {
				priority: true,
				comments: true,
				status: true,
				tags: true
			},
			skip: opts.input.cursor,
			take: opts.input.limit
		})

		return tickets;
	});
