import * as z from "zod"
import * as imports from "../../../prisma/null"

export const TicketSchema = z.object({
  id: z.number().int(),
  uid: z.string(),
  title: z.string(),
  description: z.string(),
  statusId: z.number().int().nullish(),
  priorityId: z.number().int().nullish(),
  createdAt: z.date(),
})
