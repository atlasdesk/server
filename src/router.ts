import { t } from "./context";
import { createUserProcedure } from "./procedures/auth/createUser";
import { deleteUserProcedure } from "./procedures/auth/deleteUser";
import { getAccessTokenProcedure } from "./procedures/auth/getAccessToken";
import { getRefreshTokenProcedure } from "./procedures/auth/getRefreshToken";
import { validateAccessTokenProcedure } from "./procedures/auth/validateAccessToken";
import { createTicketProcedure } from "./procedures/tickets/create";

const router = t.router;


// root router to call
export const appRouter = router({
	auth: router({
		createUser: createUserProcedure,
		deleteUser: deleteUserProcedure,
		getAccessToken: getAccessTokenProcedure,
		getRefreshToken: getRefreshTokenProcedure,
		validateAccessToken: validateAccessTokenProcedure
	}),
	ticket: router({
		createTicket: createTicketProcedure
	})
});

export type AppRouter = typeof appRouter;
