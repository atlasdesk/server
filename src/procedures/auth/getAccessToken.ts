import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../server";
import { encodeToken, TokenType } from "../../lib/JsonWebToken";
import { publicProcedure } from "../../middlewares/public";
import moment from "moment";

export const getAccessTokenProcedure = publicProcedure
	.input(
		z.object({
			refreshToken: z.string()
		})
	)
	.output(
		z.object({
			accessToken: z.string(),
			exp: z.number(),
		})
	)
	.query(async (opts) => {
		const response = await prisma.refreshTokens.findUnique({
			where: {
				token: opts.input.refreshToken
			}
		})

		if (!response) {
			throw new TRPCError({ code: "BAD_REQUEST", message: "Der gegebene refresh token ist nicht mehr gültig." });
		}

		if (response.expiry < new Date()) {
			// Falls der Token abgelaufen ist, müssen wir ihn löschen.
			await prisma.refreshTokens.delete({
				where: {
					id: response.id
				}
			})
			throw new TRPCError({ code: "BAD_REQUEST", message: "Der gegebene refresh token ist nicht mehr gültig." });
		}

		if (response.ip !== opts.ctx.ip) {
			// Falls der Token nicht von der selben IP Adresse kommt, müssen wir ihn löschen.
			await prisma.refreshTokens.delete({
				where: {
					id: response.id
				}
			})
			throw new TRPCError({ code: "BAD_REQUEST", message: "Der gegebene refresh token wurde von einer anderen IP-Adresse ausgestellt, aus Sicherheitsgründen haben wir uns entschieden diesen zu invalidieren." });
		}

		const user = await prisma.user.findUnique({
			where: {
				id: response.userId
			}
		})

		if (!user) {
			// Falls der Nutzer nicht mehr existiert müssen wir den Refresh Token invalidieren.
			await prisma.refreshTokens.delete({
				where: {
					id: response.id
				}
			})
			throw new TRPCError({ code: "BAD_REQUEST", message: "Der gegebene refresh token ist nicht mehr gültig." });
		}

		const expiry =  moment().add(2, "days").unix()
		const accessToken = encodeToken({ uid: user.uid, typ: TokenType.Access, exp: expiry })
		
		return {
			accessToken,
			exp: expiry
		}
	});
