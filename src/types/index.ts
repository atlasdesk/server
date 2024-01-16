import { z} from "zod"
import { CommentSchema, TicketPrioritySchema, TicketSchema, TicketStatusSchema, UserSchema } from "../generated/zod"

export const TicketSchemaClient = TicketSchema.omit({
	createdById: true,
	priorityId: true,
	statusId: true,
}).merge(z.object({
	status: TicketStatusSchema.omit({
		id: true,
	}).nullable(),
	priority: TicketPrioritySchema.omit({
		id: true
	}).nullable(),
	comments: CommentSchema.omit({
		createdById: true,
		ticketId: true,
		id: true,
	}).array()
}))

export type TicketClient = z.infer<typeof TicketSchemaClient>