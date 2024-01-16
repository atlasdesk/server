import * as z from "zod"
import * as imports from "../../../prisma/null"

export const TicketPrioritySchema = z.object({
  id: z.number().int(),
  uid: z.string(),
  name: z.string(),
  color: z.string(),
})
