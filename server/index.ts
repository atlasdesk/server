import { PrismaClient } from "@prisma/client";

export * from "../client"
export const prisma = new PrismaClient({
	log: ["warn", "error"],
	errorFormat: "pretty",
	datasources: {
		db: {
			url: process.env.POSTGRES_DATABASE_URL_EXTERNAL,
		},
	},
});

