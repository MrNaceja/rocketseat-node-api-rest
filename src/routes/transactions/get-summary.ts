import type { FastifyInstanceWithZod, FastifySchema } from "fastify";
import { StatusCodes } from "http-status-codes";
import z4 from "zod/v4";
import { db } from "@/config/db.ts";
import { checkSessionIdMiddleware } from "@/middlewares/check-session-id.ts";

const schema = {
  response: {
    [StatusCodes.OK]: z4.object({
      summary: z4.number(),
    }),
    [StatusCodes.UNAUTHORIZED]: z4.object({
      message: z4.string(),
    }),
  },
} satisfies FastifySchema;

export const getSummaryRoute = async (server: FastifyInstanceWithZod) =>
  server.get(
    "/transactions/summary",
    {
      schema,
      preHandler: [checkSessionIdMiddleware],
    },
    async (req, rep) => {
      const { sessionId } = req.cookies;

      const [{ summary }] = await db("transactions")
        .where({ session_id: sessionId })
        .sum("amount", {
          as: "summary",
        });

      return rep.status(StatusCodes.OK).send({
        summary,
      });
    }
  );
