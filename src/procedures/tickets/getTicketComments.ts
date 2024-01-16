import { z } from "zod";
import { prisma, CommentSchema } from "../../../server";
import { privateProcedure } from "../../middlewares/private";

export const getTicketCommentsProcedure = privateProcedure
	.input(
		z.object({
			ticket_uid: z.string().uuid()
		})
	)
	.output(CommentSchema.omit({
		createdById: true,
		ticketId: true,
		id: true
	}).array())
	.query(async (opts) => {
		const comments = await prisma.comment.findMany({
			where: {
				ticket: {
					uid: opts.input.ticket_uid
				}
			},
			include: {
				createdBy: {
					select: {
						uid: true
					}
				}
			}
		})

		return comments;
	});
