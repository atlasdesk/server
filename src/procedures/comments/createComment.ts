import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { TicketSchema, prisma, type Tags, CommentSchema } from "../../../server";
import { privateProcedure } from "../../middlewares/private";

export const createCommentProcedure = privateProcedure
	.input(
		CommentSchema.omit({
			createdById: true,
			createdAt: true,
			id: true,
			ticketId: true
		}).merge(z.object({
			ticket_uid: z.string().uuid()
		}))
	)
	.output(z.object({ uid: z.string().uuid() }))
	.mutation(async (opts) => {
		const ticket = await prisma.ticket.findUnique({
			where: {
				uid: opts.input.ticket_uid
			}
		});

		if (!ticket) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Ticket not found"
			})
		}

		const comment = await prisma.comment.create({
			data: {
				content: opts.input.content,
				createdBy: {
					connect: {
						id: opts.ctx.user.id
					}
				},
				ticket: {
					connect: {
						id: ticket.id
					}
				}
			},
			select: {
				uid: true
			}
		});

		return {
			uid: comment.uid
		}

	});
