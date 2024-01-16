import * as z from "zod"
import * as imports from "../../../prisma/null"

export const RefreshTokensSchema = z.object({
  id: z.number().int(),
  token: z.string(),
  userId: z.number().int(),
  ip: z.string(),
  expiry: z.date(),
})
