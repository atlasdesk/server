import { TRPCError } from "@trpc/server";
import { decodeToken } from "./JsonWebToken";
import { User } from "./User";

export async function validateAuthorization(authorization: string | null){
	if (!authorization) {
		throw new TRPCError({ code: "UNAUTHORIZED", message: "Für diese Action ist ein Bearer Token verpflichtend." });
	}

	const [authorizationType, value] = authorization.split(" ");


	if (authorizationType != "Bearer" || !value) {
		// Wir unterstützen nur Bearer Tokens
		throw new TRPCError({ code: "UNAUTHORIZED", message: "Für diese Action ist ein Bearer Token verpflichtend." });
	}

	const stringToken = Buffer.from(value, "base64").toString();

	if (!stringToken) {
		throw new TRPCError({ code: "UNAUTHORIZED", message: "Für diese Action ist ein Bearer Token verpflichtend." });
	}

	try {
		// Wenn der Token von uns erstellt wurde (und returnnicht manipuliert wurde), dann ist er valide und wir können ihn decodieren.
		// Andernfalls wird eine Exception geworfen.
		const token = decodeToken(
			stringToken
		);
		const uid = token.uid;

		if (!uid) {
			throw new TRPCError({ code: "UNAUTHORIZED", message: "Der gegebene Token ist fehlerhaft." });
		}

		const user = await User.fromUID(uid);

		if (!user) {
			throw new TRPCError({ code: "UNAUTHORIZED", message: "Der gegebene Token ist fehlerhaft." });
		}

		return user
	} catch (e) {
		throw new TRPCError({ code: "UNAUTHORIZED", message: "Der gegebene Token ist fehlerhaft." });
	}
}