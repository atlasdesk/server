import * as z from "zod"
import * as imports from "../../../prisma/null"

export const UserSchema = z.object({
  id: z.number().int(),
  uid: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.date(),
  name: z.string().nullish(),
  surname: z.string().nullish(),
  avatar_url: z.string().nullish(),
  bio: z.string().nullish(),
  website: z.string().nullish(),
  location: z.string().nullish(),
})
