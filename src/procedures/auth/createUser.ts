import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../server";
import { hashPassword } from "../../lib/Password";
import { publicProcedure } from "../../middlewares/public";

export const createUserProcedure = publicProcedure
	.input(
		z.object({
			email: z.string().email(),
			password: z.string().min(8).max(100),
			name: z.string().min(1).max(100),
			surname: z.string().min(1).max(100),
		})
	)
	.output(z.void())
	.mutation(async (opts) => {
		const hashedPassword = hashPassword(opts.input.password);

		// Vielleicht existiert der Benutzer ja schon?
		const existingUser = await prisma.user.findUnique({
			where: {
				email: opts.input.email,
			},
		});

		if (existingUser) {
			throw new TRPCError({
				code: "CONFLICT",
				message: "Der Benutzer existiert bereits.",
			});
		}

		const user = await prisma.user.create({
			data: {
				email: opts.input.email,
				password: hashedPassword,
				name: opts.input.name,
				surname: opts.input.surname
			},
			select: {
				id: true,
				uid: true,
			},
		});

		if (!user) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Der Benutzer konnte nicht erstellt werden.",
			});
		}
	});
