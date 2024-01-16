import { TRPCError } from "@trpc/server";
import moment from "moment";
import { z } from "zod";
import { prisma } from "../../../server";
import { encodeToken, TokenType } from "../../lib/JsonWebToken";
import { validatePassword } from "../../lib/Password";
import { errorMessages } from "../../lib/errorMessages";
import { publicProcedure } from "../../middlewares/public";


export const getRefreshTokenProcedure = publicProcedure
	.input(
		z.object({
			email: z.string().email(),
			password: z.string().min(8).max(100),
		})
	)
	.output(
		z.object({
			uid: z.string().uuid(),
			accessToken: z.string(),
			refreshToken: z.string(),
			exp: z.number(),
		})
	)
	.query(async (opts) => {
		// Falls der Nutzer nicht existiert, wird eine Fehlermeldung zurückgegeben.
		const user = await prisma.user.findUnique({
			where: {
				email: opts.input.email
			}
		})

		if (!user) {
			throw new TRPCError({ code: "BAD_REQUEST", message: errorMessages.USER_NOT_FOUND });
		}

		// Falls das Passwort nicht stimmt, wird eine Fehlermeldung zurückgegeben.
		if (!validatePassword(user.password, opts.input.password)) {
			throw new TRPCError({ code: "BAD_REQUEST", message: errorMessages.USER_NOT_FOUND });
		}

		const refreshTokenExpiry = moment().add(30, "days");
		const accessToken = encodeToken({ uid: user.uid, typ: TokenType.Access, exp: moment().add(30, "minutes").valueOf() })
		const refreshToken = encodeToken({ uid: user.uid, typ: TokenType.Refresh, exp: refreshTokenExpiry.valueOf() })

		await prisma.refreshTokens.create({
			data: {
				token: refreshToken,
				ip: opts.ctx.ip ?? "",
				expiry: refreshTokenExpiry.toDate(),
				userId: user.id
			},
		})
		
		return {
			uid: user.uid,
			accessToken,
			refreshToken,
			exp: refreshTokenExpiry.valueOf()
		}
	});
