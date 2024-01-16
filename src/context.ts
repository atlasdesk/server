import * as trpcExpress from '@trpc/server/adapters/express';
import { initTRPC } from "@trpc/server";

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {
		authorization: req.headers.authorization || null,
		ip: req.ip || req.socket.remoteAddress,
    req,
    res
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create();