import { z } from "zod";
import { prisma } from "../../../server";
import { decodeToken } from "../../lib/JsonWebToken";
import { publicProcedure } from "../../middlewares/public";

export const validateAccessTokenProcedure = publicProcedure
	.input(
		z.object({
			token: z.string(),
		})
	)
	.output(
		z.object({
			uid: z.string().uuid(),
			valid: z.boolean(),
			exp: z.number()
		})
	)
	.query(async (opts) => {
		const decodedToken = decodeToken(opts.input.token);

		if (!decodedToken || !decodedToken.uid || !decodedToken.exp) {
			return {
				uid: "",
				valid: false,
				exp: 0,
			};
		}

		const user = await prisma.user.findUnique({
			where: {
				uid: decodedToken.uid,
			},
		});

		if (!user) {
			return {
				uid: "",
				valid: false,
				exp: 0,
			};
		}

		return {
			uid: decodedToken.uid,
			valid: true,
			exp: decodedToken.exp
		};
	});
