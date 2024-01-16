import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../server";
import { validatePassword } from "../../lib/Password";
import { errorMessages } from "../../lib/errorMessages";
import { publicProcedure } from "../../middlewares/public";


export const deleteUserProcedure = publicProcedure
	.input(
		z.object({
			email: z.string().email(),
			password: z.string().min(8).max(100)
		})
	)
	.mutation(async (opts) => {
		// Vielleicht existiert der Benutzer ja schon?
		const user = await prisma.user.findUnique({
			where: {
				email: opts.input.email
			}
		})

		if (!user) {
			throw new TRPCError({ code: "BAD_REQUEST", message: errorMessages.USER_NOT_FOUND });
		}

		// Das Passwort muss natürlich auch stimmen.
		const passwordValid = validatePassword(user.password, opts.input.password);

		if (!passwordValid) {
			throw new TRPCError({ code: "BAD_REQUEST", message: errorMessages.USER_NOT_FOUND });
		}

		// Jetzt können wir den Benutzer löschen.
		await prisma.user.delete({
			where: {
				uid: user.uid
			}
		});
	});
