import type { FastifyInstanceWithZod, FastifySchema } from "fastify";
import { StatusCodes } from "http-status-codes";
import z4 from "zod/v4";
import { db } from "@/config/db.ts";
import { checkSessionIdMiddleware } from "@/middlewares/check-session-id.ts";

const schema = {
  params: z4.object({
    id: z4.uuidv4(),
  }),
  response: {
    [StatusCodes.OK]: z4.object({
      transaction: z4.object({
        id: z4.uuidv4(),
        title: z4.string(),
        amount: z4.number(),
        created_at: z4.string(),
        session_id: z4.uuidv4().optional(),
      }),
    }),
    [StatusCodes.NOT_FOUND]: z4.object({
      message: z4.string(),
    }),
    [StatusCodes.UNAUTHORIZED]: z4.object({
      message: z4.string(),
    }),
  },
} satisfies FastifySchema;

export const selectTransactionRoute = async (server: FastifyInstanceWithZod) =>
  server.get(
    "/transactions/:id",
    {
      schema,
      preHandler: [checkSessionIdMiddleware],
    },
    async (req, rep) => {
      const { id } = req.params;
      const { sessionId } = req.cookies;

      const existentTransactionById = await db("transactions").first().where({
        id,
        session_id: sessionId,
      });

      if (!existentTransactionById) {
        return rep.status(StatusCodes.NOT_FOUND).send({
          message: `Transaction with id (${id}) not found.`,
        });
      }

      return rep.status(StatusCodes.OK).send({
        transaction: existentTransactionById,
      });
    }
  );
