import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { TicketSchema, prisma, type Tags, CommentSchema } from "../../../server";
import { privateProcedure } from "../../middlewares/private";
import { TicketSchemaClient } from "../../types";

export const getCommentProcedure = privateProcedure
	.input(
		z.object({
			uid: z.string().uuid()
		})
	)
	.output(CommentSchema.omit({
		createdById: true,
		ticketId: true,
		id: true
	}))
	.query(async (opts) => {
		const comment = await prisma.comment.findUnique({
			where: {
				uid: opts.input.uid
			},
			include: {
				createdBy: {
					select: {
						uid: true
					}
				},
				ticket: {
					select: {
						uid: true
					}
				}
			}
		})

		if (!comment) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Comment not found"
			})
		}

		return comment;
	});
