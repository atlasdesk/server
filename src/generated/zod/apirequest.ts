import * as z from "zod"
import * as imports from "../../../prisma/null"

export const ApiRequestSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  ipAddress: z.string(),
  userAgent: z.string().nullish(),
  endpoint: z.string(),
  method: z.string(),
  responseCode: z.number().int(),
})
