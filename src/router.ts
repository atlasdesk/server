import { t } from "./context";
import { createUserProcedure } from "./procedures/auth/createUser";
import { deleteUserProcedure } from "./procedures/auth/deleteUser";
import { getAccessTokenProcedure } from "./procedures/auth/getAccessToken";
import { getRefreshTokenProcedure } from "./procedures/auth/getRefreshToken";
import { validateAccessTokenProcedure } from "./procedures/auth/validateAccessToken";
import { createCommentProcedure } from "./procedures/comments/createComment";
import { getCommentProcedure } from "./procedures/comments/getComment";
import { createTicketProcedure } from "./procedures/tickets/createTicket";
import { getTicketProcedure } from "./procedures/tickets/getTicket";
import { getTicketCommentsProcedure } from "./procedures/tickets/getTicketComments";
import { getTicketsProcedure } from "./procedures/tickets/getTickets";

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
	tickets: router({
		createTicket: createTicketProcedure,
		getTicket: getTicketProcedure,
		getTickets: getTicketsProcedure,
		getTicketComments: getTicketCommentsProcedure
	}),
	comments: router({
		createComment: createCommentProcedure,
		getComment: getCommentProcedure
	})
});

export type AppRouter = typeof appRouter;
