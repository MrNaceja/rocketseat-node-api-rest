import type { FastifyInstanceWithZod, FastifySchema } from "fastify";
import { StatusCodes } from "http-status-codes";
import z4 from "zod/v4";
import { db } from "@/config/db.ts";
import { checkSessionIdMiddleware } from "@/middlewares/check-session-id.ts";

const schema = {
  response: {
    [StatusCodes.OK]: z4.object({
      transactions: z4.array(
        z4.object({
          id: z4.uuidv4(),
          title: z4.string(),
          amount: z4.number(),
          created_at: z4.string(),
          session_id: z4.uuidv4().optional(),
        })
      ),
    }),
    [StatusCodes.UNAUTHORIZED]: z4.object({
      message: z4.string(),
    }),
  },
} satisfies FastifySchema;

export const listAllTransactionsRoute = async (
  server: FastifyInstanceWithZod
) =>
  server.get(
    "/transactions",
    {
      schema,
      preHandler: [checkSessionIdMiddleware],
    },
    async (req, rep) => {
      const { sessionId } = req.cookies;

      const transactions = await db("transactions")
        .where({ session_id: sessionId })
        .select();

      return rep.status(StatusCodes.OK).send({
        transactions,
      });
    }
  );
