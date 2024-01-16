import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { TicketSchema, prisma, type Tags } from "../../../server";
import { loggedPublicProcedure } from "../../middlewares/publicLogged";

export const createTicketProcedure = loggedPublicProcedure
	.input(
		TicketSchema.omit({
			createdAt: true,
			createdById: true,
			id: true,
			priorityId: true,
			statusId: true,
			uid: true,
		}).merge(z.object({
			priority: z.string().optional(),
			tags: z.array(z.string()).optional(),
			status: z.string().optional()
		}))
	)
	.output(z.object({ uid: z.string().uuid() }))
	.mutation(async (opts) => {
		// We need to resolve the priority and status IDs from the strings
		let priorityId: number | undefined = undefined;
		if (opts.input.priority) {
			const priority = await prisma.ticketPriority.findUnique({
				where: {
					name: opts.input.priority
				}
			});
	
			if (!priority) {
				// Priority does not exist
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Priority does not exist."
				});
			}

			priorityId = priority.id;
		}

		let statusId: number | undefined = undefined;
		if (opts.input.status) {
			const status = await prisma.ticketStatus.findUnique({
				where: {
					name: opts.input.status
				}
			});
	
			if (!status) {
				// Status does not exist
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Status does not exist."
				});
			}

			statusId = status.id;
		}

		let tags: Tags[] = []

		// We need to resolve the tag IDs from the strings
		if (opts.input.tags) {
			tags = await prisma.tags.findMany({
				where: {
					name: {
						in: opts.input.tags
					}
				}
			});
	
			if (tags.length !== opts.input.tags.length) {
				// Not all tags could be resolved
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Not all tags could be resolved."
				});
			}
		}

		const ticket = await prisma.ticket.create({
			data: {
				description: opts.input.description,
				title: opts.input.title,
				statusId,
				priorityId,
				tags: {
					connect: tags.map(tag => ({ id: tag.id }))
				}
			},
			select: {
				uid: true
			}
		});

		return {
			uid: ticket.uid
		}

	});
