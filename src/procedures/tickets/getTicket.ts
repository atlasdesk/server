import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { TicketSchema, prisma, type Tags } from "../../../server";
import { privateProcedure } from "../../middlewares/private";
import { TicketSchemaClient } from "../../types";

export const getTicketProcedure = privateProcedure
	.input(
		z.object({
			uid: z.string().uuid()
		})
	)
	.output(TicketSchemaClient)
	.query(async (opts) => {
		const ticket = await prisma.ticket.findUnique({
			where: {
				uid: opts.input.uid
			},
			include: {
				priority: true,
				comments: true,
				status: true,
				tags: true
			}
		})

		if (!ticket) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Ticket not found"
			})
		}

		return ticket;
	});
