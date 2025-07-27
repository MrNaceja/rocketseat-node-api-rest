import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createTransactionRoute } from "@/routes/transactions/create-transaction.ts";
import { getSummaryRoute } from "@/routes/transactions/get-summary.ts";
import { listAllTransactionsRoute } from "@/routes/transactions/list-all-transactions.ts";
import { selectTransactionRoute } from "@/routes/transactions/select-transaction.ts";

export const transactionsRoutes: FastifyPluginAsyncZod = async (server) => {
  await server.register(createTransactionRoute);
  await server.register(listAllTransactionsRoute);
  await server.register(selectTransactionRoute);
  await server.register(getSummaryRoute);
};
