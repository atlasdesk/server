import { z } from "zod";
import { CommentSchema, TicketSchema } from "../../generated/zod";
import { publicProcedure } from "../../middlewares/public";
import { prisma } from "../../../server";
import { TRPCError } from "@trpc/server";

export const createCommentProcedure = publicProcedure
	.input(
		CommentSchema.omit({
			createdAt: true,
			ticketId: true,
			createdById: true,
			uid: true,
		}).merge(
			z.object({
				ticket_uid: TicketSchema.shape.uid,
			})
		)
	)
	.output(z.object({ uid: CommentSchema.shape.uid }))
	.mutation(async (opts) => {

		const ticket = prisma.ticket.findUnique({
			where: {
				uid: opts.input.ticket_uid
			}
		})

		if (!ticket) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Ticket not found"
			})
		}

		const result = await prisma.comment.create({
			data: {
				content: opts.input.content,
				createdBy: {
					connect: {
						uid: opts.ctx.user.uid
					},
				},
				ticket: {
					connect: {
						uid: opts.input.ticket_uid
					},
				},
			},
		})

		return { uid: "" }
	});
