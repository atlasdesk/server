import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./router";
import cors from "cors"
import { createContext } from "./context";

async function main() {
	// express implementation
	const app = express();

	app.use(cors({
		allowedHeaders: "*",
		methods: "*",
		origin: "*"
	}))

	app.use(
		"/rpc",
		trpcExpress.createExpressMiddleware({
			router: appRouter,
			createContext,
		})
	);
	app.listen(3000, () => {
		console.log("listening on port 3000");
	});
}

void main();
