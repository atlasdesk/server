import { prisma } from "../../server";
import type { User as PrismaUser} from "@prisma/client"


export class User {
	/**
	 * Sucht einen Nutzer in der Datenbank anhand seiner Public/Unique id und gibt ihn zurück.
	 * @param uid Die unique/public id des gesuchten Benutzers.
	 * @returns {UserType | null} Die Daten des Nutzers oder null falls dieser nicht gefunden werden kann.
	 */
	public static async fromUID(uid: string): Promise<PrismaUser | null> {
		if (!uid || typeof uid !== "string") {
			return null;
		}

		const user = await prisma.user.findUnique({
			where: {
				uid
			}
		})

		if (!user) {
			return null;
		}

		return user;
	}

	public static async fromEmail(email: string): Promise<PrismaUser | null> {
		if (!email || typeof email !== "string") {
			return null;
		}

		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if (!user) {
			return null;
		}

		return user;
	}

	/**
	 * Sucht einen Nutzer in der Datenbank anhand seiner Private id und gibt ihn zurück.
	 * @param uid Die private id des gesuchten Benutzers.
	 * @returns {UserType | null} Die Daten des Nutzers oder null falls dieser nicht gefunden werden kann.
	 */
	public static async fromPrivateId(id: number): Promise<PrismaUser | null> {
		if (!id || typeof id !== "number") {
			return null;
		}

		const user = await prisma.user.findUnique({
			where: {
				id
			}
		})

		if (!user) {
			return null;
		}

		return user;
	}
}