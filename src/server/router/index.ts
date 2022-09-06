// src/server/router/index.ts
import { createRouter } from "./context";
import { orderRouter } from "./order";
import superjson from "superjson";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("order.", orderRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
