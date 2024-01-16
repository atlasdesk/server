import * as z from "zod"
import * as imports from "../../../prisma/null"

export const CommentSchema = z.object({
  id: z.number().int(),
  uid: z.string(),
  content: z.string(),
  createdAt: z.date(),
  createdById: z.number().int(),
  ticketId: z.number().int(),
})
